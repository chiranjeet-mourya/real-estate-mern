import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import http from "http";
import {Server} from "socket.io"
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import propertyRouter from "./routes/property.route.js";
import inquiryRouter from "./routes/inquiry.route.js";
import wishlistRouter from "./routes/wishlist.route.js";
import contactRouter from "./routes/contact.route.js";
import adminRouter from "./routes/admin.route.js";
import chatRouter from "./routes/chat.route.js";

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Real Estate API is running",
  });
});

// DB
connectDB();

const allowedOrigin = ["http://localhost:5173"].filter(Boolean);

// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigin.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/property", propertyRouter);
app.use("/api/inquiry", inquiryRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/chat", chatRouter);
app.use("/api/admin", adminRouter);
app.use("/api/contact", contactRouter);

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin:allowedOrigin,
        methods:["GET", "POST"]
    },
});

io.on("connection", (socket) =>{
    socket.on("joinChat", (chatId) =>{
        socket.join(chatId)
    });

    socket.on("sendMessage", (data) =>{
        io.on(data.chatId).emit("receiveMessage", data);
    });

    socket.on("disconnect", () =>{

    });

});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server Started at http://localhost:${PORT}`);
});
