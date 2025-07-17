import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { PrismaClient } from "@prisma/client";
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

    // Create Apollo Server
    const server = new ApolloServer({
        schema,
        introspection: true, // Enable introspection for GraphQL Playground
        includeStacktraceInErrorResponses: true,
    });

    // Start the server
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({ req }) => {
            return createContext(req, prisma);
        },
    });

    console.log(`🚀 GraphQL Server ready at ${url}`);
    console.log(`🔍 GraphQL Playground available at ${url}`);
    console.log(`📊 Health check: ${url}health`);
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
