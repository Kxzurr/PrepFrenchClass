import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import * as readline from "readline";

const prisma = new PrismaClient();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function question(prompt: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            resolve(answer);
        });
    });
}

async function createAdmin() {
    console.log("\n📝 Create Admin User\n");

    try {
        const email = await question("Email address: ");

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.error("❌ Invalid email address");
            process.exit(1);
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            console.error("❌ User with this email already exists");
            process.exit(1);
        }

        const name = await question("Full name: ");
        const password = await question("Password: ");
        const confirmPassword = await question("Confirm password: ");

        if (password !== confirmPassword) {
            console.error("❌ Passwords do not match");
            process.exit(1);
        }

        if (password.length < 8) {
            console.error("❌ Password must be at least 8 characters long");
            process.exit(1);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role: "ADMIN",
            },
        });

        console.log("\n✅ Admin user created successfully!");
        console.log("   Email:", user.email);
        console.log("   Name:", user.name);
        console.log("   Role:", user.role);
        console.log("\n🔗 Access the admin panel at: http://localhost:3000/admin\n");
    } catch (error) {
        console.error("❌ Error creating admin user:", error);
        process.exit(1);
    } finally {
        rl.close();
        await prisma.$disconnect();
    }
}

createAdmin();
