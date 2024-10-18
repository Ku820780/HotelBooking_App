import express from "express";
import { check, validationResult } from "express-validator"; // Correct import for express-validator
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.get("/me", verifyToken, async(req, res)=> {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
})

router.post(
  "/register",
  [
    check("firstName", "First Name is required").not().isEmpty(), // Ensure required field
    check("lastName", "Last Name is required").not().isEmpty(),  // Ensure required field
    check("email", "Valid email is required").isEmail(),         // Ensure valid email
    check("password", "Password must be at least 6 characters long").isLength({ min: 6 }) // Ensure password length
  ],
  async (req, res) => {
    try {
      // Validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      // Check if user already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create a new user
      user = new User(req.body);
      await user.save();

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
      );

      // Set token in cookie
      res.cookie("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure in production
        maxAge: 86400000, // 1 day
      });

      // Return success response
      return res.status(200).send({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

export default router;
