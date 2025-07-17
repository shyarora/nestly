import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { PrismaClient } from "@prisma/client";
import { Context } from "./types/context";

// Import simplified resolvers that work
import { SimplePropertyResolver } from "./resolvers/SimplePropertyResolver";
import { SimpleUserResolver } from "./resolvers/SimpleUserResolver";
import { SimpleAmenityResolver } from "./resolvers/SimpleAmenityResolver";

const prisma = new PrismaClient();

async function bootstrap() {
    try {
        // Test database connection
        await prisma.$connect();
        console.log("✅ Connected to database");
    } catch (error) {
        console.error("❌ Failed to connect to database:", error);
        process.exit(1);
    }

    // Build the TypeGraphQL schema
    const schema = await buildSchema({
        resolvers: [SimplePropertyResolver, SimpleUserResolver, SimpleAmenityResolver],
        emitSchemaFile: true,
        validate: false,
    });

    // Create Apollo Server
    const server = new ApolloServer({
        schema,
        introspection: true,
        includeStacktraceInErrorResponses: true,
    });

    // Start the server
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({ req }): Promise<Context> => {
            // Simple context without authentication for now
            return {
                prisma,
                userId: "mock-user-id", // Mock for development
            };
        },
    });

    console.log(`🚀 GraphQL Server ready at ${url}`);
    console.log(`🔍 GraphQL Playground available at ${url}`);
    console.log(`📊 Try this query:`);
    console.log(`
  query {
    properties {
      id
      title
      pricePerNight
      city
      state
      host {
        firstName
        lastName
      }
      images {
        url
      }
    }
  }
  `);
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
