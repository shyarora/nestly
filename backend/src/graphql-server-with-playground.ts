import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSchema } from "type-graphql";
import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import { json } from "body-parser";
import * as playgroundMiddleware from "graphql-playground-middleware-express";
import { UserResolver } from "./resolvers/UserResolver";
import { PropertyResolver } from "./resolvers/PropertyResolver";
import { BookingResolver } from "./resolvers/BookingResolver";
import { AmenityResolver } from "./resolvers/AmenityResolver";
import { createContext } from "./lib/context";

const prisma = new PrismaClient();

async function bootstrap() {
    // Build the TypeGraphQL schema
    const schema = await buildSchema({
        resolvers: [UserResolver, PropertyResolver, BookingResolver, AmenityResolver],
        emitSchemaFile: true,
        validate: false, // Disable validation for simpler development
    });

    // Create Express app
    const app = express();

    // Create Apollo Server
    const server = new ApolloServer({
        schema,
        introspection: true, // Enable introspection for GraphQL Playground
        includeStacktraceInErrorResponses: true,
    });

    await server.start();

    // Apply CORS and JSON middleware
    app.use(
        "/graphql",
        cors<cors.CorsRequest>({
            origin: true,
            credentials: true,
        }),
        json(),
        expressMiddleware(server, {
            context: async ({ req }) => {
                return createContext(req, prisma);
            },
        }),
    );

    // Add GraphQL Playground
    app.get(
        "/playground",
        playgroundMiddleware.default({
            endpoint: "/graphql",
            settings: {
                "request.credentials": "include",
            },
        }),
    );

    // Health check endpoint
    app.get("/health", (req, res) => {
        res.json({ status: "OK", timestamp: new Date().toISOString() });
    });

    // Start the server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 GraphQL Server ready at http://localhost:${PORT}/graphql`);
        console.log(`🎮 GraphQL Playground available at http://localhost:${PORT}/playground`);
        console.log(`📊 Health check: http://localhost:${PORT}/health`);
    });
}

// Handle graceful shutdown
process.on("SIGINT", async () => {
    console.log("\n🛑 Shutting down GraphQL server...");
    await prisma.$disconnect();
    process.exit(0);
});

bootstrap().catch(error => {
    console.error("❌ Error starting server:", error);
    process.exit(1);
});
