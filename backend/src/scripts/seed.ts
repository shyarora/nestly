import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Starting database seeding...");

    // Clear existing data in correct order (reverse of creation)
    await prisma.review.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.propertyAmenity.deleteMany();
    await prisma.propertyImage.deleteMany();
    await prisma.property.deleteMany();
    await prisma.amenity.deleteMany();
    await prisma.user.deleteMany();

    console.log("🗑️  Cleared existing data");

    // Create Amenities
    const amenities = await Promise.all([
        // Basic amenities
        prisma.amenity.create({ data: { name: "WiFi", icon: "📶", category: "INTERNET" } }),
        prisma.amenity.create({ data: { name: "Kitchen", icon: "🍳", category: "COOKING" } }),
        prisma.amenity.create({ data: { name: "Washing machine", icon: "🧺", category: "CLEANING" } }),
        prisma.amenity.create({ data: { name: "Air conditioning", icon: "❄️", category: "CLIMATE" } }),
        prisma.amenity.create({ data: { name: "Heating", icon: "🔥", category: "CLIMATE" } }),
        prisma.amenity.create({ data: { name: "TV", icon: "📺", category: "ENTERTAINMENT" } }),
        prisma.amenity.create({ data: { name: "Hot tub", icon: "🛁", category: "WELLNESS" } }),
        prisma.amenity.create({ data: { name: "Pool", icon: "🏊", category: "WELLNESS" } }),
        prisma.amenity.create({ data: { name: "Free parking", icon: "🚗", category: "PARKING" } }),
        prisma.amenity.create({ data: { name: "Gym", icon: "🏋️", category: "FITNESS" } }),
        prisma.amenity.create({ data: { name: "Balcony", icon: "🏠", category: "OUTDOOR" } }),
        prisma.amenity.create({ data: { name: "Garden", icon: "🌱", category: "OUTDOOR" } }),
        prisma.amenity.create({ data: { name: "BBQ grill", icon: "🔥", category: "OUTDOOR" } }),
        prisma.amenity.create({ data: { name: "Beach access", icon: "🏖️", category: "LOCATION" } }),
        prisma.amenity.create({ data: { name: "Mountain view", icon: "⛰️", category: "VIEW" } }),
        prisma.amenity.create({ data: { name: "Ocean view", icon: "🌊", category: "VIEW" } }),
        prisma.amenity.create({ data: { name: "City view", icon: "🏙️", category: "VIEW" } }),
        prisma.amenity.create({ data: { name: "Fireplace", icon: "🔥", category: "COMFORT" } }),
        prisma.amenity.create({ data: { name: "Piano", icon: "🎹", category: "ENTERTAINMENT" } }),
        prisma.amenity.create({ data: { name: "Pets allowed", icon: "🐕", category: "POLICY" } }),
        prisma.amenity.create({ data: { name: "Smoking allowed", icon: "🚬", category: "POLICY" } }),
        prisma.amenity.create({ data: { name: "Iron", icon: "👔", category: "CONVENIENCE" } }),
        prisma.amenity.create({ data: { name: "Hair dryer", icon: "💨", category: "BATHROOM" } }),
        prisma.amenity.create({ data: { name: "Breakfast", icon: "🥐", category: "FOOD" } }),
        prisma.amenity.create({ data: { name: "Coffee maker", icon: "☕", category: "COOKING" } }),
    ]);

    console.log(`✅ Created ${amenities.length} amenities`);

    // Create Users (mix of hosts and guests)
    const users = [];
    const userNames = [
        { firstName: "John", lastName: "Smith", email: "john.smith@example.com" },
        { firstName: "Sarah", lastName: "Johnson", email: "sarah.johnson@example.com" },
        { firstName: "Michael", lastName: "Brown", email: "michael.brown@example.com" },
        { firstName: "Emily", lastName: "Davis", email: "emily.davis@example.com" },
        { firstName: "David", lastName: "Wilson", email: "david.wilson@example.com" },
        { firstName: "Lisa", lastName: "Miller", email: "lisa.miller@example.com" },
        { firstName: "Robert", lastName: "Garcia", email: "robert.garcia@example.com" },
        { firstName: "Jennifer", lastName: "Martinez", email: "jennifer.martinez@example.com" },
        { firstName: "William", lastName: "Anderson", email: "william.anderson@example.com" },
        { firstName: "Jessica", lastName: "Taylor", email: "jessica.taylor@example.com" },
        { firstName: "James", lastName: "Thomas", email: "james.thomas@example.com" },
        { firstName: "Ashley", lastName: "Jackson", email: "ashley.jackson@example.com" },
        { firstName: "Christopher", lastName: "White", email: "christopher.white@example.com" },
        { firstName: "Amanda", lastName: "Harris", email: "amanda.harris@example.com" },
        { firstName: "Daniel", lastName: "Clark", email: "daniel.clark@example.com" },
        { firstName: "Stephanie", lastName: "Lewis", email: "stephanie.lewis@example.com" },
        { firstName: "Matthew", lastName: "Lee", email: "matthew.lee@example.com" },
        { firstName: "Nicole", lastName: "Walker", email: "nicole.walker@example.com" },
        { firstName: "Anthony", lastName: "Hall", email: "anthony.hall@example.com" },
        { firstName: "Michelle", lastName: "Allen", email: "michelle.allen@example.com" },
        { firstName: "Mark", lastName: "Young", email: "mark.young@example.com" },
        { firstName: "Kimberly", lastName: "King", email: "kimberly.king@example.com" },
        { firstName: "Steven", lastName: "Wright", email: "steven.wright@example.com" },
        { firstName: "Donna", lastName: "Lopez", email: "donna.lopez@example.com" },
        { firstName: "Kenneth", lastName: "Hill", email: "kenneth.hill@example.com" },
    ];

    for (let i = 0; i < userNames.length; i++) {
        const userData = userNames[i];
        const user = await prisma.user.create({
            data: {
                email: userData.email,
                password: "password123", // In real app, this would be hashed
                firstName: userData.firstName,
                lastName: userData.lastName,
                isHost: i < 15, // First 15 users are hosts
                isVerified: Math.random() > 0.3, // 70% verified
                bio: i < 15 ? `Experienced host with ${Math.floor(Math.random() * 10) + 1} years of hospitality experience.` : null,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.firstName}${userData.lastName}`,
                phoneNumber: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
            },
        });
        users.push(user);
    }

    console.log(`✅ Created ${users.length} users`);

    // Create Properties
    const propertyData = [
        {
            title: "Stunning Ocean View Villa",
            description: "Wake up to breathtaking ocean views in this luxurious villa. Perfect for a romantic getaway or family vacation.",
            city: "Malibu",
            state: "California",
            country: "USA",
            pricePerNight: 450,
            propertyType: "VILLA",
            roomType: "ENTIRE_PLACE",
            maxGuests: 8,
            bedrooms: 4,
            bathrooms: 3,
        },
        {
            title: "Cozy Mountain Cabin",
            description: "Escape to the mountains in this charming log cabin. Perfect for hiking enthusiasts and nature lovers.",
            city: "Aspen",
            state: "Colorado",
            country: "USA",
            pricePerNight: 275,
            propertyType: "CABIN",
            roomType: "ENTIRE_PLACE",
            maxGuests: 6,
            bedrooms: 3,
            bathrooms: 2,
        },
        {
            title: "Modern Downtown Loft",
            description: "Stylish loft in the heart of the city. Walking distance to restaurants, bars, and attractions.",
            city: "New York",
            state: "New York",
            country: "USA",
            pricePerNight: 320,
            propertyType: "APARTMENT",
            roomType: "ENTIRE_PLACE",
            maxGuests: 4,
            bedrooms: 2,
            bathrooms: 2,
        },
        {
            title: "Historic Brownstone",
            description: "Beautiful historic brownstone with original architectural details and modern amenities.",
            city: "Boston",
            state: "Massachusetts",
            country: "USA",
            pricePerNight: 280,
            propertyType: "HOUSE",
            roomType: "ENTIRE_PLACE",
            maxGuests: 6,
            bedrooms: 3,
            bathrooms: 2,
        },
        {
            title: "Beachfront Bungalow",
            description: "Wake up to the sound of waves in this charming beachfront bungalow. Perfect for beach lovers.",
            city: "Key West",
            state: "Florida",
            country: "USA",
            pricePerNight: 350,
            propertyType: "BUNGALOW",
            roomType: "ENTIRE_PLACE",
            maxGuests: 4,
            bedrooms: 2,
            bathrooms: 1,
        },
        {
            title: "Luxury Penthouse Suite",
            description: "Spectacular penthouse with panoramic city views. Ultimate luxury and comfort.",
            city: "Miami",
            state: "Florida",
            country: "USA",
            pricePerNight: 600,
            propertyType: "APARTMENT",
            roomType: "ENTIRE_PLACE",
            maxGuests: 6,
            bedrooms: 3,
            bathrooms: 3,
        },
        {
            title: "Desert Oasis Resort",
            description: "Stunning desert retreat with pool and spa. Perfect for relaxation and rejuvenation.",
            city: "Scottsdale",
            state: "Arizona",
            country: "USA",
            pricePerNight: 400,
            propertyType: "VILLA",
            roomType: "ENTIRE_PLACE",
            maxGuests: 10,
            bedrooms: 5,
            bathrooms: 4,
        },
        {
            title: "Charming Cottage",
            description: "Quaint cottage surrounded by gardens. Perfect for a peaceful getaway.",
            city: "Napa",
            state: "California",
            country: "USA",
            pricePerNight: 225,
            propertyType: "COTTAGE",
            roomType: "ENTIRE_PLACE",
            maxGuests: 4,
            bedrooms: 2,
            bathrooms: 1,
        },
        {
            title: "Ski Lodge Chalet",
            description: "Cozy chalet near the slopes. Perfect for winter sports enthusiasts.",
            city: "Park City",
            state: "Utah",
            country: "USA",
            pricePerNight: 375,
            propertyType: "CHALET",
            roomType: "ENTIRE_PLACE",
            maxGuests: 8,
            bedrooms: 4,
            bathrooms: 3,
        },
        {
            title: "Urban Studio",
            description: "Modern studio in trendy neighborhood. Perfect for solo travelers or couples.",
            city: "Portland",
            state: "Oregon",
            country: "USA",
            pricePerNight: 125,
            propertyType: "APARTMENT",
            roomType: "ENTIRE_PLACE",
            maxGuests: 2,
            bedrooms: 1,
            bathrooms: 1,
        },
        {
            title: "Lakefront Lodge",
            description: "Beautiful lodge on pristine lake. Perfect for fishing and water sports.",
            city: "Lake Tahoe",
            state: "California",
            country: "USA",
            pricePerNight: 450,
            propertyType: "LODGE",
            roomType: "ENTIRE_PLACE",
            maxGuests: 12,
            bedrooms: 6,
            bathrooms: 4,
        },
        {
            title: "Vineyard Estate",
            description: "Elegant estate in wine country. Perfect for wine lovers and groups.",
            city: "Sonoma",
            state: "California",
            country: "USA",
            pricePerNight: 550,
            propertyType: "ESTATE",
            roomType: "ENTIRE_PLACE",
            maxGuests: 14,
            bedrooms: 7,
            bathrooms: 5,
        },
        {
            title: "Artistic Loft",
            description: "Creative loft space in arts district. Perfect for artists and creative types.",
            city: "Austin",
            state: "Texas",
            country: "USA",
            pricePerNight: 185,
            propertyType: "LOFT",
            roomType: "ENTIRE_PLACE",
            maxGuests: 4,
            bedrooms: 2,
            bathrooms: 1,
        },
        {
            title: "Romantic B&B Room",
            description: "Charming room in historic bed and breakfast. Perfect for romantic getaways.",
            city: "Savannah",
            state: "Georgia",
            country: "USA",
            pricePerNight: 165,
            propertyType: "BED_AND_BREAKFAST",
            roomType: "PRIVATE_ROOM",
            maxGuests: 2,
            bedrooms: 1,
            bathrooms: 1,
        },
        {
            title: "Family Farmhouse",
            description: "Spacious farmhouse perfect for large families and groups. Farm-to-table dining available.",
            city: "Lancaster",
            state: "Pennsylvania",
            country: "USA",
            pricePerNight: 300,
            propertyType: "FARMHOUSE",
            roomType: "ENTIRE_PLACE",
            maxGuests: 10,
            bedrooms: 5,
            bathrooms: 3,
        },
        {
            title: "Treehouse Retreat",
            description: "Unique treehouse experience surrounded by nature. Perfect for adventure seekers.",
            city: "Olympic Peninsula",
            state: "Washington",
            country: "USA",
            pricePerNight: 195,
            propertyType: "TREEHOUSE",
            roomType: "ENTIRE_PLACE",
            maxGuests: 4,
            bedrooms: 2,
            bathrooms: 1,
        },
        {
            title: "City Center Hotel Room",
            description: "Comfortable hotel room in prime downtown location. All amenities included.",
            city: "Chicago",
            state: "Illinois",
            country: "USA",
            pricePerNight: 220,
            propertyType: "HOTEL",
            roomType: "PRIVATE_ROOM",
            maxGuests: 2,
            bedrooms: 1,
            bathrooms: 1,
        },
        {
            title: "Bohemian Guesthouse",
            description: "Eclectic guesthouse with artistic flair. Perfect for creative souls.",
            city: "Santa Fe",
            state: "New Mexico",
            country: "USA",
            pricePerNight: 155,
            propertyType: "GUESTHOUSE",
            roomType: "ENTIRE_PLACE",
            maxGuests: 6,
            bedrooms: 3,
            bathrooms: 2,
        },
        {
            title: "Waterfront Condo",
            description: "Modern condo with stunning water views. Perfect for relaxation.",
            city: "San Diego",
            state: "California",
            country: "USA",
            pricePerNight: 385,
            propertyType: "CONDO",
            roomType: "ENTIRE_PLACE",
            maxGuests: 6,
            bedrooms: 3,
            bathrooms: 2,
        },
        {
            title: "Historic Inn Suite",
            description: "Elegant suite in restored historic inn. Perfect for special occasions.",
            city: "Charleston",
            state: "South Carolina",
            country: "USA",
            pricePerNight: 275,
            propertyType: "INN",
            roomType: "PRIVATE_ROOM",
            maxGuests: 4,
            bedrooms: 2,
            bathrooms: 1,
        },
        {
            title: "Mountain View Cabin",
            description: "Rustic cabin with breathtaking mountain views. Perfect for nature lovers.",
            city: "Gatlinburg",
            state: "Tennessee",
            country: "USA",
            pricePerNight: 210,
            propertyType: "CABIN",
            roomType: "ENTIRE_PLACE",
            maxGuests: 8,
            bedrooms: 4,
            bathrooms: 2,
        },
        {
            title: "Riverside Cottage",
            description: "Peaceful cottage by the river. Perfect for fishing and relaxation.",
            city: "Branson",
            state: "Missouri",
            country: "USA",
            pricePerNight: 140,
            propertyType: "COTTAGE",
            roomType: "ENTIRE_PLACE",
            maxGuests: 4,
            bedrooms: 2,
            bathrooms: 1,
        },
        {
            title: "Luxury Resort Villa",
            description: "Ultimate luxury villa in exclusive resort. All amenities and services included.",
            city: "Big Sur",
            state: "California",
            country: "USA",
            pricePerNight: 750,
            propertyType: "RESORT",
            roomType: "ENTIRE_PLACE",
            maxGuests: 8,
            bedrooms: 4,
            bathrooms: 4,
        },
        {
            title: "Shared Hostel Bed",
            description: "Budget-friendly bed in clean, safe hostel. Perfect for backpackers.",
            city: "San Francisco",
            state: "California",
            country: "USA",
            pricePerNight: 45,
            propertyType: "HOSTEL",
            roomType: "SHARED_ROOM",
            maxGuests: 1,
            bedrooms: 1,
            bathrooms: 1,
        },
        {
            title: "Glamping Tent",
            description: "Luxury camping experience with all the comforts. Perfect for outdoor enthusiasts.",
            city: "Moab",
            state: "Utah",
            country: "USA",
            pricePerNight: 165,
            propertyType: "TENT",
            roomType: "ENTIRE_PLACE",
            maxGuests: 4,
            bedrooms: 1,
            bathrooms: 1,
        },
    ];

    const properties = [];
    const hosts = users.filter(user => user.isHost);

    for (let i = 0; i < propertyData.length; i++) {
        const data = propertyData[i];
        const host = hosts[i % hosts.length];

        try {
            const property = await prisma.property.create({
                data: {
                    ...data,
                    address: `${Math.floor(Math.random() * 9999) + 1} ${["Main St", "Oak Ave", "Pine Dr", "Elm Way", "Cedar Ln"][Math.floor(Math.random() * 5)]}`,
                    latitude: 25 + Math.random() * 25, // Rough US latitude range
                    longitude: -125 + Math.random() * 50, // Rough US longitude range
                    hostId: host.id,
                },
            });

            // Add property images
            const imageCount = Math.floor(Math.random() * 5) + 3; // 3-7 images per property
            for (let j = 0; j < imageCount; j++) {
                await prisma.propertyImage.create({
                    data: {
                        propertyId: property.id,
                        url: `https://picsum.photos/800/600?random=${i * 10 + j}`,
                        caption: `${property.title} - Image ${j + 1}`,
                        order: j,
                    },
                });
            }

            // Add random amenities to properties
            const selectedAmenities = amenities.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 10) + 5);
            for (const amenity of selectedAmenities) {
                await prisma.propertyAmenity.create({
                    data: {
                        propertyId: property.id,
                        amenityId: amenity.id,
                    },
                });
            }

            properties.push(property);
        } catch (error) {
            console.error(`Failed to create property ${i}: ${data.title}`, error);
        }
    }

    console.log(`✅ Created ${properties.length} properties with images and amenities`);

    // Create Bookings
    const guests = users.filter(user => !user.isHost);
    const bookings = [];

    for (let i = 0; i < 30; i++) {
        const property = properties[Math.floor(Math.random() * properties.length)];
        const guest = guests[Math.floor(Math.random() * guests.length)];

        const checkIn = new Date();
        checkIn.setDate(checkIn.getDate() + Math.floor(Math.random() * 90) - 30); // Random date ±30 days

        const checkOut = new Date(checkIn);
        checkOut.setDate(checkOut.getDate() + Math.floor(Math.random() * 14) + 1); // 1-14 night stays

        const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
        const totalPrice = nights * property.pricePerNight;

        const booking = await prisma.booking.create({
            data: {
                propertyId: property.id,
                guestId: guest.id,
                checkIn,
                checkOut,
                guests: Math.floor(Math.random() * property.maxGuests) + 1,
                totalPrice,
                status: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"][Math.floor(Math.random() * 4)],
            },
        });

        bookings.push(booking);
    }

    console.log(`✅ Created ${bookings.length} bookings`);

    // Create Reviews (only for completed bookings)
    const completedBookings = bookings.filter(booking => booking.status === "COMPLETED");
    const reviews = [];

    const reviewTexts = [
        "Amazing place! Highly recommend.",
        "Perfect location and great amenities.",
        "Beautiful property with stunning views.",
        "Host was very accommodating and friendly.",
        "Clean, comfortable, and exactly as described.",
        "Would definitely stay here again!",
        "Great value for money.",
        "Peaceful and relaxing environment.",
        "Easy check-in process and great communication.",
        "Exceeded our expectations in every way.",
        "Perfect for our family vacation.",
        "The photos don't do it justice - even better in person!",
        "Highly responsive host and immaculate property.",
        "Great location, walking distance to everything.",
        "Cozy and comfortable with all the amenities we needed.",
    ];

    for (const booking of completedBookings) {
        if (Math.random() > 0.3) {
            // 70% chance of review
            const review = await prisma.review.create({
                data: {
                    propertyId: booking.propertyId,
                    reviewerId: booking.guestId,
                    hostId: properties.find(p => p.id === booking.propertyId)?.hostId || "",
                    bookingId: booking.id,
                    rating: Math.floor(Math.random() * 2) + 4, // 4-5 star ratings
                    comment: reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
                },
            });
            reviews.push(review);
        }
    }

    console.log(`✅ Created ${reviews.length} reviews`);

    console.log("🎉 Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   • ${amenities.length} amenities`);
    console.log(`   • ${users.length} users (${hosts.length} hosts, ${guests.length} guests)`);
    console.log(`   • ${properties.length} properties`);
    console.log(`   • ${bookings.length} bookings`);
    console.log(`   • ${reviews.length} reviews`);
}

main()
    .catch(e => {
        console.error("❌ Error seeding database:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
