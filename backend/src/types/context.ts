import { PrismaClient } from "@prisma/client";

export interface Context {
    prisma: PrismaClient;
    userId?: string;
    user?: any;
}

export interface AuthenticatedContext extends Context {
    userId: string;
    user: any;
}
