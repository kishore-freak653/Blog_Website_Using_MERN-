import authModel from "../models/authModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  // User Registration Method
  static userRegistration = async (req, res) => {
    const { username, email, password } = req.body;
    console.log("User Data", { username, email, password });

    try {
      // Check for all required fields
      if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }

      // Check if user already exists
      const existingUser = await authModel.findOne({ email }).exec(); // .exec() ensures the query is executed
      if (existingUser) {
        return res.status(409).json({ message: "Email already in use." });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Save the new user
      const newUser = new authModel({
        username,
        email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
      if (savedUser) {
        return res
          .status(201)
          .json({ message: "User registration successful." });
      } else {
        throw new Error("User registration failed.");
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // User Login Method
  static userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      // Check for all required fields
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required." });
      }

      // Find user by email
      const user = await authModel.findOne({ email }).exec(); // .exec() ensures the query is executed
      if (user) {
        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          // Generate token
          const token = jwt.sign({ userId: user._id }, "pleaseSubscribe", {
            expiresIn: "30d",
          });

          return res.status(200).json({
            message: "Login successfully",
            token,
            name: user.username,
          });
        } else {
          return res.status(401).json({ message: "Wrong credentials." });
        }
      } else {
        return res.status(404).json({ message: "Email ID not found." });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}

export default AuthController;
