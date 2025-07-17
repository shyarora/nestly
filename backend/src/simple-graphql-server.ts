import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { PrismaClient } from "@prisma/client";
import { Resolver, Query, Mutation, Arg, Ctx, ObjectType, Field, ID, Int, Float, InputType } from "type-graphql";

const prisma = new PrismaClient();

// Simple GraphQL Types
@ObjectType()
class User {
    @Field(() => ID)
    id!: string;

    @Field()
    email!: string;

    @Field()
    firstName!: string;

    @Field()
    lastName!: string;

    @Field({ nullable: true })
    avatar?: string;

    @Field()
    isHost!: boolean;

    @Field()
    isVerified!: boolean;

    @Field()
    createdAt!: Date;

    @Field()
    updatedAt!: Date;
}

@ObjectType()
class PropertyImage {
    @Field(() => ID)
    id!: string;

    @Field()
    url!: string;

    @Field({ nullable: true })
    caption?: string;

    @Field(() => Int)
    order!: number;
}

@ObjectType()
class Amenity {
    @Field(() => ID)
    id!: string;

    @Field()
    name!: string;

    @Field({ nullable: true })
    icon?: string;

    @Field()
    category!: string;
}

@ObjectType()
class Property {
    @Field(() => ID)
    id!: string;

    @Field()
    title!: string;

    @Field()
    description!: string;

    @Field()
    propertyType!: string;

    @Field()
    roomType!: string;

    @Field(() => Int)
    maxGuests!: number;

    @Field(() => Int)
    bedrooms!: number;

    @Field(() => Float)
    bathrooms!: number;

    @Field(() => Float)
    pricePerNight!: number;

    @Field(() => Float, { nullable: true })
    cleaningFee?: number;

    @Field(() => Float, { nullable: true })
    serviceFee?: number;

    @Field()
    city!: string;

    @Field()
    state!: string;

    @Field()
    country!: string;

    @Field({ nullable: true })
    address?: string;

    @Field(() => Float, { nullable: true })
    latitude?: number;

    @Field(() => Float, { nullable: true })
    longitude?: number;

    @Field(() => Int)
    minimumStay!: number;

    @Field(() => Int, { nullable: true })
    maximumStay?: number;

    @Field()
    createdAt!: Date;

    @Field()
    updatedAt!: Date;

    @Field(() => User)
    host!: User;

    @Field(() => [PropertyImage])
    images!: PropertyImage[];

    @Field(() => [Amenity])
    amenities!: Amenity[];
}

// Input Types
@InputType()
class PropertyFilters {
    @Field({ nullable: true })
    search?: string;

    @Field({ nullable: true })
    location?: string;

    @Field(() => Float, { nullable: true })
    minPrice?: number;

    @Field(() => Float, { nullable: true })
    maxPrice?: number;

    @Field({ nullable: true })
    propertyType?: string;

    @Field({ nullable: true })
    roomType?: string;

    @Field(() => Int, { nullable: true })
    guests?: number;

    @Field(() => Int, { nullable: true })
    bedrooms?: number;

    @Field(() => Float, { nullable: true })
    bathrooms?: number;

    @Field(() => Int, { defaultValue: 20 })
    limit?: number;

    @Field(() => Int, { defaultValue: 0 })
    offset?: number;
}

@InputType()
class CreatePropertyInput {
    @Field()
    title!: string;

    @Field()
    description!: string;

    @Field()
    propertyType!: string;

    @Field()
    roomType!: string;

    @Field(() => Int)
    maxGuests!: number;

    @Field(() => Int)
    bedrooms!: number;

    @Field(() => Float)
    bathrooms!: number;

    @Field(() => Float)
    pricePerNight!: number;

    @Field(() => Float, { nullable: true })
    cleaningFee?: number;

    @Field(() => Float, { nullable: true })
    serviceFee?: number;

    @Field()
    city!: string;

    @Field()
    state!: string;

    @Field()
    country!: string;

    @Field({ nullable: true })
    address?: string;

    @Field(() => Float, { nullable: true })
    latitude?: number;

    @Field(() => Float, { nullable: true })
    longitude?: number;

    @Field(() => Int, { defaultValue: 1 })
    minimumStay?: number;

    @Field(() => Int, { nullable: true })
    maximumStay?: number;
}

@InputType()
class UserInput {
    @Field()
    email!: string;

    @Field()
    firstName!: string;

    @Field()
    lastName!: string;

    @Field()
    password!: string;
}

// Context interface
interface Context {
    prisma: PrismaClient;
    userId?: string;
}

// Resolvers
@Resolver(() => Property)
class PropertyResolver {
    @Query(() => [Property])
    async properties(@Arg("filters", { nullable: true }) filters?: PropertyFilters): Promise<Property[]> {
        let whereClause: any = {};

        if (filters) {
            if (filters.search) {
                whereClause.OR = [
                    { title: { contains: filters.search } },
                    { description: { contains: filters.search } },
                    { city: { contains: filters.search } },
                    { state: { contains: filters.search } },
                    { country: { contains: filters.search } },
                ];
            }

            if (filters.location) {
                whereClause.OR = [
                    { city: { contains: filters.location } },
                    { state: { contains: filters.location } },
                    { country: { contains: filters.location } },
                    { address: { contains: filters.location } },
                ];
            }

            if (filters.minPrice) {
                whereClause.pricePerNight = { gte: filters.minPrice };
            }

            if (filters.maxPrice) {
                whereClause.pricePerNight = {
                    ...whereClause.pricePerNight,
                    lte: filters.maxPrice,
                };
            }

            if (filters.propertyType) {
                whereClause.propertyType = filters.propertyType;
            }

            if (filters.roomType) {
                whereClause.roomType = filters.roomType;
            }

            if (filters.guests) {
                whereClause.maxGuests = { gte: filters.guests };
            }

            if (filters.bedrooms) {
                whereClause.bedrooms = { gte: filters.bedrooms };
            }

            if (filters.bathrooms) {
                whereClause.bathrooms = { gte: filters.bathrooms };
            }
        }

        const properties = await prisma.property.findMany({
            where: whereClause,
            include: {
                host: true,
                images: {
                    orderBy: { order: "asc" },
                },
                amenities: {
                    include: {
                        amenity: true,
                    },
                },
            },
            take: filters?.limit || 20,
            skip: filters?.offset || 0,
            orderBy: { createdAt: "desc" },
        });

        // Transform to match GraphQL schema
        return properties.map(property => ({
            ...property,
            amenities: property.amenities.map(pa => pa.amenity),
        })) as any;
    }

    @Query(() => Property, { nullable: true })
    async property(@Arg("id") id: string): Promise<Property | null> {
        const property = await prisma.property.findUnique({
            where: { id },
            include: {
                host: true,
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

        if (!property) return null;

        return {
            ...property,
            amenities: property.amenities.map(pa => pa.amenity),
        } as any;
    }

    @Mutation(() => Property)
    async createProperty(@Arg("input") input: CreatePropertyInput, @Ctx() { userId }: Context): Promise<Property> {
        if (!userId) {
            throw new Error("Authentication required");
        }

        const property = await prisma.property.create({
            data: {
                ...input,
                hostId: userId,
            },
            include: {
                host: true,
                images: true,
                amenities: {
                    include: {
                        amenity: true,
                    },
                },
            },
        });

        return {
            ...property,
            amenities: property.amenities.map(pa => pa.amenity),
        } as any;
    }
}

@Resolver(() => User)
class UserResolver {
    @Query(() => [User])
    async users(): Promise<User[]> {
        return (await prisma.user.findMany({
            take: 10,
        })) as any;
    }

    @Query(() => User, { nullable: true })
    async user(@Arg("id") id: string): Promise<User | null> {
        return (await prisma.user.findUnique({
            where: { id },
        })) as any;
    }

    @Mutation(() => User)
    async createUser(@Arg("input") input: UserInput): Promise<User> {
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email: input.email },
        });

        if (existingUser) {
            throw new Error("User already exists");
        }

        // Create user (in real app, hash password)
        const user = await prisma.user.create({
            data: {
                email: input.email,
                password: "mock-password", // Add required password field
                firstName: input.firstName,
                lastName: input.lastName,
                isHost: false,
                isVerified: false,
            },
        });

        return user as any;
    }
}

@Resolver(() => Amenity)
class AmenityResolver {
    @Query(() => [Amenity])
    async amenities(): Promise<Amenity[]> {
        return (await prisma.amenity.findMany()) as any;
    }
}

async function bootstrap() {
    // Build the TypeGraphQL schema
    const schema = await buildSchema({
        resolvers: [PropertyResolver, UserResolver, AmenityResolver],
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
        context: async ({ req }) => {
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
