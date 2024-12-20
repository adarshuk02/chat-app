import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

 const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

const PORT = process.env.PORT || 5002;
console.log(PORT);


// Enable CORS for your frontend URL
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://chat-app-drab-six-66.vercel.app",  // Correct frontend URL
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);



// Handle preflight OPTIONS requests
app.options("*", cors());  // Allow preflight requests

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
