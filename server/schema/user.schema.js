import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
  },
  { timestamps: true }
);

// Pre-save middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await argon2.hash(this.password);
    next();
  } catch (error) {
    console.error("Error hashing password:", error.message);
    next(error);
  }
});

// method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    return await argon2.verify(this.password, enteredPassword);
  } catch (error) {
    console.error("Error comparing password:", error.message);
    throw new Error("Password comparison failed");
  }
};

//method to generate JWT token
userSchema.methods.getJwtToken = function () {
  try {
    return jwt.sign(
      { userId: this._id, email: this.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_TIME || "1h" }
    );
  } catch (error) {
    console.error("Error generating JWT:", error.message);
    throw new Error("Token generation failed");
  }
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
