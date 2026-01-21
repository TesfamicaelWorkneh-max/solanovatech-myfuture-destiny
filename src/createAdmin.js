import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

import dotenv from "dotenv";
dotenv.config();
async function createAdminUser() {
  try {
    console.log("Mongo URI:", process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Check if admin already exists
    const existingAdmin = await User.findOne({
      email: "micael707@gmail.com",
    });
    if (existingAdmin) {
      console.log("Admin user already exists.");
      mongoose.connection.close();
      return;
    }

    // Create the admin user
    const adminUser = new User({
      name: "Admin",
      email: "micael707@gmail.com",
      password: "admin123",
      role: "admin",
      phone: "0964623413",
    });

    await adminUser.save();
    console.log("Admin user created successfully.");

    // Close the database connection
    mongoose.connection.close();
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
}

createAdminUser();
