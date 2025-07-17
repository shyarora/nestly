import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

export interface Context {
    prisma: PrismaClient;
    user?: {
        id: string;
        email: string;
        isHost: boolean;
        isVerified?: boolean;
    } | null;
}

export async function createContext(req: any, prisma: PrismaClient): Promise<Context> {
    let user: { id: string; email: string; isHost: boolean } | null = null;

    // Extract token from Authorization header
    const authHeader = req?.headers?.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7);

        try {
            // For development, accept a mock token
            if (token === "mock-token") {
                // Create a mock user if it doesn't exist
                let mockUser = await prisma.user.findUnique({
                    where: { email: "test@example.com" },
                });

                if (!mockUser) {
                    mockUser = await prisma.user.create({
                        data: {
                            email: "test@example.com",
                            firstName: "Test",
                            lastName: "User",
                            isHost: true,
                        },
                    });
                }

                user = {
                    id: mockUser.id,
                    email: mockUser.email,
                    isHost: mockUser.isHost,
                };
            } else if (process.env.JWT_SECRET) {
                // Verify JWT token in production
                const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
                if (decoded.userId) {
                    const dbUser = await prisma.user.findUnique({
                        where: { id: decoded.userId },
                    });

                    if (dbUser) {
                        user = {
                            id: dbUser.id,
                            email: dbUser.email,
                            isHost: dbUser.isHost,
                        };
                    }
                }
            }
        } catch (error) {
            // Invalid token, user remains null
            console.warn("Invalid token provided:", error);
        }
    }

    return {
        prisma,
        user,
    };
}
