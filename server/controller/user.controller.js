import User from "../Schema/user.schema.js";
import CustomError from "../utils/customError.js";
import catchAsyncError from "../middleware/catchAsyncError.js";

/*  signUp controller --> POST -> api/users/signup   */
export const signUp = catchAsyncError(async (req, res, next) => {
  const { userName, email, password } = req.body;

  //check if email already exists
  const isExist = await User.findOne({ email });
  if (isExist) {
    return next(new CustomError("Email already exists", 400));
  }

  //create new user
  const user = await User.create({ userName, email, password });

  // Respond with user details
  res.status(201).json({
    success: true,
    message: "User created successfully",
    user: {
      id: user._id,
      userName: user.userName,
      email: user.email,
    },
  });
});

/* login controller --> POST -> api/users/login */
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //check if email exists
  const user = await User.findOne({ email });
  if (!user) {
    return next(new CustomError("email is not registered", 401));
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new CustomError("Incorrect password", 401));
  }
  // Generate token
  const token = await user.getJwtToken(); // Expires in 2 days```
  res.cookie("auth_token", token, {
    httpOnly: true,
    maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});
