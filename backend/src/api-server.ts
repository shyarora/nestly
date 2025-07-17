import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

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

// Properties API
app.get("/api/properties", async (req, res) => {
    try {
        const { search, location, minPrice, maxPrice, propertyType, roomType, guests, bedrooms, bathrooms } = req.query;

        let whereClause: any = {};

        // Search filters
        if (search) {
            whereClause.OR = [
                { title: { contains: search as string } },
                { description: { contains: search as string } },
                { city: { contains: search as string } },
                { state: { contains: search as string } },
                { country: { contains: search as string } },
            ];
        }

        if (location) {
            whereClause.OR = [
                { city: { contains: location as string } },
                { state: { contains: location as string } },
                { country: { contains: location as string } },
                { address: { contains: location as string } },
            ];
        }

        if (minPrice) {
            whereClause.pricePerNight = { gte: parseFloat(minPrice as string) };
        }

        if (maxPrice) {
            whereClause.pricePerNight = {
                ...whereClause.pricePerNight,
                lte: parseFloat(maxPrice as string),
            };
        }

        if (propertyType) {
            whereClause.propertyType = propertyType;
        }

        if (roomType) {
            whereClause.roomType = roomType;
        }

        if (guests) {
            whereClause.maxGuests = { gte: parseInt(guests as string) };
        }

        if (bedrooms) {
            whereClause.bedrooms = { gte: parseInt(bedrooms as string) };
        }

        if (bathrooms) {
            whereClause.bathrooms = { gte: parseFloat(bathrooms as string) };
        }

        const properties = await prisma.property.findMany({
            where: whereClause,
            include: {
                host: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                        isVerified: true,
                    },
                },
                images: {
                    orderBy: { order: "asc" },
                },
                amenities: {
                    include: {
                        amenity: true,
                    },
                },
            },
            take: 50,
            orderBy: { createdAt: "desc" },
        });

        // Transform the data to match frontend expectations
        const transformedProperties = properties.map(property => ({
            id: property.id,
            title: property.title,
            description: property.description,
            propertyType: property.propertyType,
            roomType: property.roomType,
            maxGuests: property.maxGuests,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            pricePerNight: property.pricePerNight,
            cleaningFee: property.cleaningFee || 0,
            serviceFee: property.serviceFee || 0,
            location: {
                address: property.address,
                city: property.city,
                state: property.state,
                country: property.country,
                latitude: property.latitude,
                longitude: property.longitude,
            },
            host: {
                id: property.host.id,
                name: `${property.host.firstName} ${property.host.lastName}`,
                avatar: property.host.avatar,
                isVerified: property.host.isVerified,
            },
            images: property.images.map(img => ({
                id: img.id,
                url: img.url,
                caption: img.caption,
            })),
            amenities: property.amenities.map(pa => ({
                id: pa.amenity.id,
                name: pa.amenity.name,
                icon: pa.amenity.icon,
                category: pa.amenity.category,
            })),
            rating: 4.5, // Mock rating for now
            reviewCount: 12, // Mock review count for now
            isAvailable: true,
            createdAt: property.createdAt,
            updatedAt: property.updatedAt,
        }));

        res.json(transformedProperties);
    } catch (error) {
        console.error("Error fetching properties:", error);
        res.status(500).json({ error: "Failed to fetch properties" });
    }
});

// Get single property
app.get("/api/properties/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const property = await prisma.property.findUnique({
            where: { id },
            include: {
                host: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                        isHost: true,
                        isVerified: true,
                        createdAt: true,
                    },
                },
                images: {
                    orderBy: { order: "asc" },
                },
                amenities: {
                    include: {
                        amenity: true,
                    },
                },
            },
        });

        if (!property) {
            return res.status(404).json({ error: "Property not found" });
        }

        // Transform the data
        const transformedProperty = {
            id: property.id,
            title: property.title,
            description: property.description,
            propertyType: property.propertyType,
            roomType: property.roomType,
            maxGuests: property.maxGuests,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            pricePerNight: property.pricePerNight,
            cleaningFee: property.cleaningFee || 0,
            serviceFee: property.serviceFee || 0,
            minimumStay: property.minimumStay,
            maximumStay: property.maximumStay,
            location: {
                address: property.address,
                city: property.city,
                state: property.state,
                country: property.country,
                latitude: property.latitude,
                longitude: property.longitude,
            },
            host: {
                id: property.host.id,
                name: `${property.host.firstName} ${property.host.lastName}`,
                avatar: property.host.avatar,
                isHost: property.host.isHost,
                isVerified: property.host.isVerified,
                joinedDate: property.host.createdAt,
            },
            images: property.images.map(img => ({
                id: img.id,
                url: img.url,
                caption: img.caption,
            })),
            amenities: property.amenities.map(pa => ({
                id: pa.amenity.id,
                name: pa.amenity.name,
                icon: pa.amenity.icon,
                category: pa.amenity.category,
            })),
            rating: 4.5, // Mock rating for now
            reviewCount: 12, // Mock review count for now
            isAvailable: true,
            createdAt: property.createdAt,
            updatedAt: property.updatedAt,
        };

        res.json(transformedProperty);
    } catch (error) {
        console.error("Error fetching property:", error);
        res.status(500).json({ error: "Failed to fetch property" });
    }
});

// Users API
app.get("/api/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            take: 10,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                avatar: true,
                isHost: true,
                isVerified: true,
                createdAt: true,
            },
        });

        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// Auth endpoints (simplified)
app.post("/api/auth/register", async (req, res) => {
    try {
        const { email, firstName, lastName, password } = req.body;

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Create user (in real app, hash the password)
        const user = await prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                isHost: false,
                isVerified: false,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                isHost: true,
                isVerified: true,
            },
        });

        res.status(201).json({
            user,
            token: "mock-jwt-token", // In real app, generate JWT
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Failed to register user" });
    }
});

app.post("/api/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                avatar: true,
                isHost: true,
                isVerified: true,
            },
        });

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // In real app, verify password hash
        res.json({
            user,
            token: "mock-jwt-token", // In real app, generate JWT
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Failed to log in" });
    }
});

// Seed database with sample data
app.post("/api/seed", async (req, res) => {
    try {
        // Create sample users
        const sampleUsers = await Promise.all([
            prisma.user.upsert({
                where: { email: "host1@example.com" },
                update: {},
                create: {
                    email: "host1@example.com",
                    firstName: "Sarah",
                    lastName: "Johnson",
                    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150",
                    isHost: true,
                    isVerified: true,
                },
            }),
            prisma.user.upsert({
                where: { email: "host2@example.com" },
                update: {},
                create: {
                    email: "host2@example.com",
                    firstName: "Michael",
                    lastName: "Chen",
                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
                    isHost: true,
                    isVerified: true,
                },
            }),
        ]);

        // Create sample amenities
        const sampleAmenities = await Promise.all([
            prisma.amenity.upsert({
                where: { name: "WiFi" },
                update: {},
                create: { name: "WiFi", icon: "📶", category: "BASICS" },
            }),
            prisma.amenity.upsert({
                where: { name: "Kitchen" },
                update: {},
                create: { name: "Kitchen", icon: "🍳", category: "FEATURES" },
            }),
            prisma.amenity.upsert({
                where: { name: "Parking" },
                update: {},
                create: { name: "Parking", icon: "🚗", category: "LOCATION" },
            }),
            prisma.amenity.upsert({
                where: { name: "Air Conditioning" },
                update: {},
                create: { name: "Air Conditioning", icon: "❄️", category: "FEATURES" },
            }),
        ]);

        // Create sample properties
        const sampleProperties = await Promise.all([
            prisma.property.create({
                data: {
                    title: "Beautiful Beach House",
                    description: "A stunning beachfront property with amazing ocean views.",
                    hostId: sampleUsers[0].id,
                    propertyType: "HOUSE",
                    roomType: "ENTIRE_PLACE",
                    maxGuests: 6,
                    bedrooms: 3,
                    bathrooms: 2,
                    pricePerNight: 250.0,
                    cleaningFee: 50.0,
                    serviceFee: 25.0,
                    city: "Malibu",
                    state: "California",
                    country: "United States",
                    address: "123 Ocean Drive",
                    latitude: 34.0259,
                    longitude: -118.7798,
                    minimumStay: 2,
                    maximumStay: 14,
                },
            }),
            prisma.property.create({
                data: {
                    title: "Cozy Mountain Cabin",
                    description: "Perfect retreat in the mountains with hiking trails nearby.",
                    hostId: sampleUsers[1].id,
                    propertyType: "CABIN",
                    roomType: "ENTIRE_PLACE",
                    maxGuests: 4,
                    bedrooms: 2,
                    bathrooms: 1,
                    pricePerNight: 180.0,
                    cleaningFee: 40.0,
                    serviceFee: 20.0,
                    city: "Aspen",
                    state: "Colorado",
                    country: "United States",
                    address: "456 Mountain View Lane",
                    latitude: 39.1911,
                    longitude: -106.8175,
                    minimumStay: 1,
                    maximumStay: 7,
                },
            }),
        ]);

        // Add images
        await Promise.all([
            prisma.propertyImage.create({
                data: {
                    propertyId: sampleProperties[0].id,
                    url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
                    caption: "Beautiful beach house exterior",
                    order: 1,
                },
            }),
            prisma.propertyImage.create({
                data: {
                    propertyId: sampleProperties[1].id,
                    url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
                    caption: "Cozy mountain cabin",
                    order: 1,
                },
            }),
        ]);

        // Add amenities to properties
        await Promise.all([
            prisma.propertyAmenity.create({
                data: {
                    propertyId: sampleProperties[0].id,
                    amenityId: sampleAmenities[0].id,
                },
            }),
            prisma.propertyAmenity.create({
                data: {
                    propertyId: sampleProperties[0].id,
                    amenityId: sampleAmenities[1].id,
                },
            }),
        ]);

        res.json({
            message: "Database seeded successfully",
            users: sampleUsers.length,
            properties: sampleProperties.length,
            amenities: sampleAmenities.length,
        });
    } catch (error) {
        console.error("Error seeding database:", error);
        res.status(500).json({ error: "Failed to seed database" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🏠 Properties API: http://localhost:${PORT}/api/properties`);
    console.log(`👥 Users API: http://localhost:${PORT}/api/users`);
    console.log(`🌱 Seed database: POST http://localhost:${PORT}/api/seed`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
    console.log("\n🛑 Shutting down server...");
    await prisma.$disconnect();
    process.exit(0);
});
