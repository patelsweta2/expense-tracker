import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import connectDB from "./server/config/db.js";
import userRouter from "./server/router/user.router.js";
import incomeRouter from "./server/router/income.router.js";
import expenseRouter from "./server/router/expense.router.js";
import incomeStatsRouter from "./server/router/stats.router.js";
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
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// Santize data
app.use(mongoSanitize()); //nosql injection atack
// prevent Parameter pollution
app.use(hpp());

//endpoints
app.use("/api/users", userRouter);
app.use("/api", incomeRouter);
app.use("/api", expenseRouter);
app.use("/api", incomeStatsRouter);

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
