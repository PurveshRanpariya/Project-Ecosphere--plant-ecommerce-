require("dotenv").config();
const Razorpay = require("razorpay");

// Use placeholder values if environment variables are not set
const razorpayinstance = new Razorpay({
	key_id: process.env.RAZORPAY_API_KEY || "rzp_test_placeholder_key",
	key_secret: process.env.RAZORPAY_SECRET_KEY || "placeholder_secret_key",
});

module.exports = razorpayinstance;
