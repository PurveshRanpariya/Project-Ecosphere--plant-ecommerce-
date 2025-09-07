require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174", 
    "http://localhost:5175",
    process.env.FRONTEND_URL
  ].filter(Boolean),
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Request body:', req.body);
  next();
});

const shopRoute = require("./routes/shop");
const authRoute = require("./routes/auth");
const AdminshopRoute = require("./routes/admin");


app.use("/", shopRoute);
app.use("/auth", authRoute);
app.use("/admin", AdminshopRoute);

/* Express Error handling middleware */
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const data = error.data;
  res.status(statusCode).json({
    message: error.message,
    status: statusCode,
    data: data,
  });
});

/* Mongodb options */
const options = {
  minPoolSize: 1,
  maxPoolSize: 10,
  socketTimeoutMS: 45000, // 45 seconds timeout for inactivity
  serverSelectionTimeoutMS: 5000, // 5 seconds server selection timeout
};

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_SERVER_KEY, options)
  .then((result) => {
    console.log("mongodb connected");
    app.listen(PORT, () => {
      console.log(`Backend Server started on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
