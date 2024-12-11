import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import connectDB from "./server/config/db.js";
// import userRouter from "./server/router/userRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

// Setup security headers
app.use(helmet());
app.use(cookieParser());

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Santize data
app.use(mongoSanitize()); //nosql injection atack
// prevent Parameter pollution
app.use(hpp());

//endpoints
// app.use("/api/users", userRouter);

const PORT = process.env.PORT || 8000;
const MODE = process.env.NODE_ENV || "production";

//global error handler
// app.use(globalErrorHandler);
app.get("/", (req, res) => {
  res.send("Server is running");
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connection to db successful");
    console.log("");
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT} in ${MODE} mode.`);
    });
  } catch (error) {
    console.log(error);
    console.log("Aborting server due to error in connection to data base");
  }
};

start();