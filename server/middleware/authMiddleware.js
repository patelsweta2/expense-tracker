import catchAsyncError from "./catchAsyncError.js";
import CustomError from "../utils/customError.js";
import jwt from "jsonwebtoken";
import User from "../schema/user.schema.js";

export const authMiddleware = catchAsyncError(async (req, res, next) => {
  try {
    const token = req.cookies.auth_token;
    if (!token) {
      throw new CustomError("Authentication token is missing", 401);
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    req.user = { userId: user._id };
    next();
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Authentication failed" });
  }
});
