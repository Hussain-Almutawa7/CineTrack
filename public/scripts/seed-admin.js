const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../../models/user");

require("dotenv").config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const username = process.env.ADMIN_USERNAME.trim();
        const email = process.env.ADMIN_EMAIL.trim().toLowerCase();
        const password = process.env.ADMIN_PASSWORD;

        const existingAdmin = await User.findOne({
            $or: [
                { username },
                { email },
            ],
        });

        if (existingAdmin) return console.log("Admin account already exists");


        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            password: hashedPassword,
            role: "admin",
        });

        console.log("Admin account created successfully");
    } catch (error) {
        console.log("Error seeding admin:", error.message);
    } finally {
        await mongoose.connection.close();
    }
};

seedAdmin();