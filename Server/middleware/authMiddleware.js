import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js";

const checkisUserAuthenticated = async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer ")) {
    try {
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, "pleaseSubscribe");
      const user = await authModel.findById(decoded.userId).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }
};

export default checkisUserAuthenticated;
