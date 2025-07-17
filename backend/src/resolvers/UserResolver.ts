import { Resolver, Query, Mutation, Arg, Ctx, Authorized, InputType, Field } from "type-graphql";
import { IsEmail, MinLength } from "class-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../types";
import { Context } from "../lib/context";

@InputType()
class RegisterInput {
    @Field(() => String)
    @IsEmail()
    email!: string;

    @Field(() => String)
    @MinLength(6)
    password!: string;

    @Field(() => String)
    firstName!: string;

    @Field(() => String)
    lastName!: string;

    @Field(() => String, { nullable: true })
    phoneNumber?: string;

    @Field(() => Boolean, { defaultValue: false })
    isHost!: boolean;
}

@InputType()
class LoginInput {
    @Field(() => String)
    @IsEmail()
    email!: string;

    @Field(() => String)
    password!: string;
}

@InputType()
class UpdateProfileInput {
    @Field(() => String, { nullable: true })
    firstName?: string;

    @Field(() => String, { nullable: true })
    lastName?: string;

    @Field(() => String, { nullable: true })
    bio?: string;

    @Field(() => String, { nullable: true })
    phoneNumber?: string;

    @Field(() => String, { nullable: true })
    avatar?: string;
}

@Resolver(User)
export class UserResolver {
    @Query(() => User, { nullable: true })
    @Authorized()
    async me(@Ctx() { user, prisma }: Context): Promise<User | null> {
        if (!user) return null;

        return prisma.user.findUnique({
            where: { id: user.id },
            include: {
                hostedProperties: true,
                bookings: true,
                reviews: true,
            },
        }) as unknown as User | null;
    }

    @Query(() => [User])
    async users(@Ctx() { prisma }: Context): Promise<User[]> {
        return prisma.user.findMany({
            orderBy: { createdAt: "desc" },
        });
    }

    @Query(() => User, { nullable: true })
    async user(@Arg("id", () => String) id: string, @Ctx() { prisma }: Context): Promise<User | null> {
        return prisma.user.findUnique({
            where: { id },
            include: {
                hostedProperties: true,
                reviews: true,
            },
        }) as unknown as User | null;
    }

    @Mutation(() => String)
    async register(@Arg("input", () => RegisterInput) input: RegisterInput, @Ctx() { prisma }: Context): Promise<string> {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: input.email },
        });

        if (existingUser) {
            throw new Error("User with this email already exists");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(input.password, 12);

        // Create user
        const user = await prisma.user.create({
            data: {
                email: input.email,
                password: hashedPassword,
                firstName: input.firstName,
                lastName: input.lastName,
                phoneNumber: input.phoneNumber,
                isHost: input.isHost,
            },
        });

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
            expiresIn: "7d",
        });

        return token;
    }

    @Mutation(() => String)
    async login(@Arg("input", () => LoginInput) input: LoginInput, @Ctx() { prisma }: Context): Promise<string> {
        // Find user
        const user = await prisma.user.findUnique({
            where: { email: input.email },
        });

        if (!user) {
            throw new Error("Invalid email or password");
        }

        // Check password
        const isValid = await bcrypt.compare(input.password, user.password);
        if (!isValid) {
            throw new Error("Invalid email or password");
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
            expiresIn: "7d",
        });

        return token;
    }

    @Mutation(() => User)
    @Authorized()
    async updateProfile(@Arg("input", () => UpdateProfileInput) input: UpdateProfileInput, @Ctx() { user, prisma }: Context): Promise<User> {
        if (!user) {
            throw new Error("Not authenticated");
        }

        return prisma.user.update({
            where: { id: user.id },
            data: input,
        });
    }

    @Mutation(() => User)
    @Authorized()
    async becomeHost(@Ctx() { user, prisma }: Context): Promise<User> {
        if (!user) {
            throw new Error("Not authenticated");
        }

        return prisma.user.update({
            where: { id: user.id },
            data: { isHost: true },
        });
    }

    @Mutation(() => Boolean)
    @Authorized()
    async deleteAccount(@Ctx() { user, prisma }: Context): Promise<boolean> {
        if (!user) {
            throw new Error("Not authenticated");
        }

        await prisma.user.delete({
            where: { id: user.id },
        });

        return true;
    }
}
