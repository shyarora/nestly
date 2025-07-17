import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Backend server is running",
        timestamp: new Date().toISOString(),
    });
});

// Simple REST endpoints for testing
app.get("/api/properties", async (req, res) => {
    try {
        const properties = await prisma.property.findMany({
            include: {
                host: true,
                amenities: true,
                images: true,
            },
            take: 10,
        });
        res.json(properties);
    } catch (error) {
        console.error("Error fetching properties:", error);
        res.status(500).json({ error: "Failed to fetch properties" });
    }
});

app.get("/api/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            take: 5,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                isHost: true,
            },
        });
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🏠 Properties API: http://localhost:${PORT}/api/properties`);
    console.log(`👥 Users API: http://localhost:${PORT}/api/users`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
    console.log("\n🛑 Shutting down server...");
    await prisma.$disconnect();
    process.exit(0);
});
