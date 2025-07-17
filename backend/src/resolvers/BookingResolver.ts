import { Resolver, Query, Mutation, Arg, Ctx, Authorized, InputType, Field, Int, Float } from "type-graphql";
import { Booking, BookingStatus } from "../types";
import { Context } from "../lib/context";

@InputType()
class BookingInput {
    @Field(() => String)
    propertyId!: string;

    @Field(() => Date)
    checkIn!: Date;

    @Field(() => Date)
    checkOut!: Date;

    @Field(() => Int)
    guests!: number;

    @Field(() => Float)
    totalPrice!: number;
}

@InputType()
class UpdateBookingStatusInput {
    @Field(() => BookingStatus)
    status!: BookingStatus;
}

@Resolver(Booking)
export class BookingResolver {
    @Query(() => [Booking])
    @Authorized()
    async myBookings(@Ctx() { user, prisma }: Context): Promise<Booking[]> {
        if (!user) {
            throw new Error("Not authenticated");
        }

        const bookings = await prisma.booking.findMany({
            where: { guestId: user.id },
            include: {
                property: {
                    include: {
                        host: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                avatar: true,
                            },
                        },
                        images: {
                            take: 1,
                            orderBy: { order: "asc" },
                        },
                    },
                },
                guest: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return bookings as unknown as Booking[];
    }

    @Query(() => [Booking])
    @Authorized()
    async hostBookings(@Ctx() { user, prisma }: Context): Promise<Booking[]> {
        if (!user) {
            throw new Error("Not authenticated");
        }

        if (!user.isHost) {
            throw new Error("Only hosts can view host bookings");
        }

        const bookings = await prisma.booking.findMany({
            where: {
                property: {
                    hostId: user.id,
                },
            },
            include: {
                property: {
                    include: {
                        images: {
                            take: 1,
                            orderBy: { order: "asc" },
                        },
                    },
                },
                guest: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return bookings as unknown as Booking[];
    }

    @Query(() => Booking, { nullable: true })
    @Authorized()
    async booking(@Arg("id", () => String) id: string, @Ctx() { user, prisma }: Context): Promise<Booking | null> {
        if (!user) {
            throw new Error("Not authenticated");
        }

        const booking = await prisma.booking.findUnique({
            where: { id },
            include: {
                property: {
                    include: {
                        host: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                avatar: true,
                            },
                        },
                        images: {
                            orderBy: { order: "asc" },
                        },
                    },
                },
                guest: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                    },
                },
            },
        });

        if (!booking) {
            return null;
        }

        // Get property to check host authorization
        const property = await prisma.property.findUnique({
            where: { id: booking.propertyId },
        });

        // Check if user is authorized to view this booking
        if (booking.guestId !== user.id && property?.hostId !== user.id) {
            throw new Error("Not authorized to view this booking");
        }

        return booking as unknown as Booking;
    }

    @Mutation(() => Booking)
    @Authorized()
    async createBooking(@Arg("input") input: BookingInput, @Ctx() { user, prisma }: Context): Promise<Booking> {
        if (!user) {
            throw new Error("Not authenticated");
        }

        // Check if property exists and is available
        const property = await prisma.property.findUnique({
            where: { id: input.propertyId },
            include: {
                host: true,
            },
        });

        if (!property) {
            throw new Error("Property not found");
        }

        if (property.hostId === user.id) {
            throw new Error("You cannot book your own property");
        }

        // Check for conflicts with existing bookings
        const conflictingBooking = await prisma.booking.findFirst({
            where: {
                propertyId: input.propertyId,
                status: { in: ["CONFIRMED", "PENDING"] },
                OR: [
                    {
                        checkIn: { lte: input.checkOut },
                        checkOut: { gte: input.checkIn },
                    },
                ],
            },
        });

        if (conflictingBooking) {
            throw new Error("Property is not available for the selected dates");
        }

        const booking = await prisma.booking.create({
            data: {
                ...input,
                guestId: user.id,
                status: "PENDING",
            },
            include: {
                property: {
                    include: {
                        host: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                avatar: true,
                            },
                        },
                        images: {
                            take: 1,
                            orderBy: { order: "asc" },
                        },
                    },
                },
                guest: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                    },
                },
            },
        });

        return booking as unknown as Booking;
    }

    @Mutation(() => Booking)
    @Authorized()
    async updateBookingStatus(@Arg("id") id: string, @Arg("input") input: UpdateBookingStatusInput, @Ctx() { user, prisma }: Context): Promise<Booking> {
        if (!user) {
            throw new Error("Not authenticated");
        }

        const booking = await prisma.booking.findUnique({
            where: { id },
            include: {
                property: {
                    include: {
                        host: true,
                    },
                },
            },
        });

        if (!booking) {
            throw new Error("Booking not found");
        }

        // Only the host can update booking status (except cancellation by guest)
        if (input.status === "CANCELLED") {
            // Guest can cancel their own booking, host can cancel any booking on their property
            if (booking.guestId !== user.id && booking.property.hostId !== user.id) {
                throw new Error("Not authorized to cancel this booking");
            }
        } else {
            // Only host can confirm, reject, or complete bookings
            if (booking.property.hostId !== user.id) {
                throw new Error("Only the host can update booking status");
            }
        }

        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: { status: input.status },
            include: {
                property: {
                    include: {
                        host: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                avatar: true,
                            },
                        },
                        images: {
                            take: 1,
                            orderBy: { order: "asc" },
                        },
                    },
                },
                guest: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                    },
                },
            },
        });

        return updatedBooking as unknown as Booking;
    }

    @Mutation(() => Boolean)
    @Authorized()
    async deleteBooking(@Arg("id") id: string, @Ctx() { user, prisma }: Context): Promise<boolean> {
        if (!user) {
            throw new Error("Not authenticated");
        }

        const booking = await prisma.booking.findUnique({
            where: { id },
            include: {
                property: true,
            },
        });

        if (!booking) {
            throw new Error("Booking not found");
        }

        // Only guest or host can delete booking
        if (booking.guestId !== user.id && booking.property.hostId !== user.id) {
            throw new Error("Not authorized to delete this booking");
        }

        await prisma.booking.delete({
            where: { id },
        });

        return true;
    }
}
