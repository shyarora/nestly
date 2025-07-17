import { Resolver, Query, Mutation, Arg, Ctx, Authorized, InputType, Field } from "type-graphql";
import { Amenity, AmenityCategory } from "../types";
import { Context } from "../lib/context";

@InputType()
class AmenityInput {
    @Field()
    name!: string;

    @Field({ nullable: true })
    icon?: string;

    @Field(() => AmenityCategory)
    category!: AmenityCategory;
}

@InputType()
class UpdateAmenityInput {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    icon?: string;

    @Field(() => AmenityCategory, { nullable: true })
    category?: AmenityCategory;
}

@Resolver(Amenity)
export class AmenityResolver {
    @Query(() => [Amenity])
    async amenities(
        @Ctx() { prisma }: Context,
        @Arg("category", () => AmenityCategory, { nullable: true })
        category?: AmenityCategory,
    ): Promise<Amenity[]> {
        const where = category ? { category } : {};

        const amenities = await prisma.amenity.findMany({
            where,
            include: {
                properties: {
                    include: {
                        property: true,
                        amenity: true,
                    },
                },
            },
            orderBy: { name: "asc" },
        });

        return amenities as unknown as Amenity[];
    }

    @Query(() => Amenity, { nullable: true })
    async amenity(@Arg("id") id: string, @Ctx() { prisma }: Context): Promise<Amenity | null> {
        const amenity = await prisma.amenity.findUnique({
            where: { id },
            include: {
                properties: {
                    include: {
                        property: true,
                        amenity: true,
                    },
                },
            },
        });

        return amenity as unknown as Amenity | null;
    }

    @Mutation(() => Amenity)
    @Authorized()
    async createAmenity(@Arg("input") input: AmenityInput, @Ctx() { user, prisma }: Context): Promise<Amenity> {
        if (!user) {
            throw new Error("Not authenticated");
        }

        // Only allow admins to create amenities (this could be enhanced with role-based access)
        // For now, any authenticated user can create amenities

        const amenity = await prisma.amenity.create({
            data: input,
            include: {
                properties: {
                    include: {
                        property: true,
                        amenity: true,
                    },
                },
            },
        });

        return amenity as unknown as Amenity;
    }

    @Mutation(() => Amenity)
    @Authorized()
    async updateAmenity(@Arg("id") id: string, @Arg("input") input: UpdateAmenityInput, @Ctx() { user, prisma }: Context): Promise<Amenity> {
        if (!user) {
            throw new Error("Not authenticated");
        }

        const amenity = await prisma.amenity.findUnique({
            where: { id },
        });

        if (!amenity) {
            throw new Error("Amenity not found");
        }

        const updatedAmenity = await prisma.amenity.update({
            where: { id },
            data: input,
            include: {
                properties: {
                    include: {
                        property: true,
                        amenity: true,
                    },
                },
            },
        });

        return updatedAmenity as unknown as Amenity;
    }

    @Mutation(() => Boolean)
    @Authorized()
    async deleteAmenity(@Arg("id") id: string, @Ctx() { user, prisma }: Context): Promise<boolean> {
        if (!user) {
            throw new Error("Not authenticated");
        }

        const amenity = await prisma.amenity.findUnique({
            where: { id },
        });

        if (!amenity) {
            throw new Error("Amenity not found");
        }

        await prisma.amenity.delete({
            where: { id },
        });

        return true;
    }
}
