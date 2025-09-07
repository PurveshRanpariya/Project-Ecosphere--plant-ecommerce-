require("dotenv").config();
const mongoose = require("mongoose");
const AdminAccount = require("./models/adminuser");

async function checkAdminAccount() {
  try {
    await mongoose.connect(process.env.MONGODB_SERVER_KEY);
    console.log("Connected to MongoDB");
    
    const adminAccount = await AdminAccount.findOne({ email: "admin@pureplantparadise.com" });
    
    if (adminAccount) {
      console.log("✅ Admin account found:");
      console.log("Email:", adminAccount.email);
      console.log("Is Admin:", adminAccount.isAdmin);
      console.log("Account ID:", adminAccount._id);
    } else {
      console.log("❌ Admin account not found!");
    }
    
    // List all admin accounts
    const allAdmins = await AdminAccount.find({});
    console.log("\n📋 All admin accounts in database:", allAdmins.length);
    allAdmins.forEach((admin, index) => {
      console.log(`${index + 1}. Email: ${admin.email}, IsAdmin: ${admin.isAdmin}`);
    });
    
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

checkAdminAccount();
