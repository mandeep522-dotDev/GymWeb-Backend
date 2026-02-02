import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


// import routes
import userRoutes from "./routes/user.routes.js";
import classRoutes from "./routes/class.routes.js"
import paymentRoutes from "./routes/payment.routes.js";
import subscriberRoutes from "./routes/subscriber.routes.js"

// route dicllaration
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/classes", classRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/subscriber", subscriberRoutes)

export { app };
