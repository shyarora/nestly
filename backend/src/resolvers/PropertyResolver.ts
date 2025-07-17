import { Resolver, Query, Mutation, Arg, Ctx, InputType, Field, Int, Float } from "type-graphql";
import { Property } from "../types";
import { Context } from "../lib/context";

@InputType()
class PropertyInput {
    @Field(() => String)
    title!: string;

    @Field(() => String)
    description!: string;

    @Field(() => String)
    propertyType!: string;

    @Field(() => String)
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

    @Field(() => String)
    city!: string;

    @Field(() => String)
    state!: string;

    @Field(() => String)
    country!: string;

    @Field(() => String, { nullable: true })
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
class UpdatePropertyInput {
    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => String, { nullable: true })
    propertyType?: string;

    @Field(() => String, { nullable: true })
    roomType?: string;

    @Field(() => Int, { nullable: true })
    maxGuests?: number;

    @Field(() => Int, { nullable: true })
    bedrooms?: number;

    @Field(() => Float, { nullable: true })
    bathrooms?: number;

    @Field(() => Float, { nullable: true })
    pricePerNight?: number;

    @Field(() => Float, { nullable: true })
    cleaningFee?: number;

    @Field(() => Float, { nullable: true })
    serviceFee?: number;

    @Field(() => String, { nullable: true })
    city?: string;

    @Field(() => String, { nullable: true })
    state?: string;

    @Field(() => String, { nullable: true })
    country?: string;

    @Field(() => String, { nullable: true })
    address?: string;

    @Field(() => Float, { nullable: true })
    latitude?: number;

    @Field(() => Float, { nullable: true })
    longitude?: number;

    @Field(() => Int, { nullable: true })
    minimumStay?: number;

    @Field(() => Int, { nullable: true })
    maximumStay?: number;
}

@InputType()
class PropertyFilters {
    @Field(() => String, { nullable: true })
    search?: string;

    @Field(() => String, { nullable: true })
    location?: string;

    @Field(() => Float, { nullable: true })
    minPrice?: number;

    @Field(() => Float, { nullable: true })
    maxPrice?: number;

    @Field(() => String, { nullable: true })
    propertyType?: string;

    @Field(() => String, { nullable: true })
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

@Resolver(() => Property)
export class PropertyResolver {
    @Query(() => [Property])
    async properties(
        @Ctx() { prisma }: Context,
        @Arg("filters", () => PropertyFilters, { nullable: true })
        filters?: PropertyFilters,
    ): Promise<Property[]> {
        let whereClause: any = {};

        if (filters) {
            // Search filters
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

        return properties as unknown as Property[];
    }

    @Query(() => Property, { nullable: true })
    async property(@Arg("id", () => String) id: string, @Ctx() { prisma }: Context): Promise<Property | null> {
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
                bookings: {
                    include: {
                        guest: true,
                    },
                },
            },
        });

        return property as unknown as Property | null;
    }

    @Mutation(() => Property)
    async createProperty(@Arg("input", () => PropertyInput) input: PropertyInput, @Ctx() { prisma, user }: Context): Promise<Property> {
        if (!user) {
            throw new Error("Not authenticated");
        }

        const property = await prisma.property.create({
            data: {
                ...input,
                hostId: user.id,
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

        return property as unknown as Property;
    }

    @Mutation(() => Property)
    async updateProperty(
        @Arg("id", () => String) id: string,
        @Arg("input", () => UpdatePropertyInput) input: UpdatePropertyInput,
        @Ctx() { prisma, user }: Context,
    ): Promise<Property> {
        if (!user) {
            throw new Error("Not authenticated");
        }

        // Check if user owns this property
        const existingProperty = await prisma.property.findUnique({
            where: { id },
        });

        if (!existingProperty || existingProperty.hostId !== user.id) {
            throw new Error("Property not found or access denied");
        }

        const property = await prisma.property.update({
            where: { id },
            data: input,
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

        return property as unknown as Property;
    }

    @Mutation(() => Boolean)
    async deleteProperty(@Arg("id", () => String) id: string, @Ctx() { prisma, user }: Context): Promise<boolean> {
        if (!user) {
            throw new Error("Not authenticated");
        }

        // Check if user owns this property
        const existingProperty = await prisma.property.findUnique({
            where: { id },
        });

        if (!existingProperty || existingProperty.hostId !== user.id) {
            throw new Error("Property not found or access denied");
        }

        await prisma.property.delete({
            where: { id },
        });

        return true;
    }
}
