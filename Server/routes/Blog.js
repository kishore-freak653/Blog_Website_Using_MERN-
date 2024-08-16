import express from "express";
import path from "path";
import multer from "multer";
import AuthController from "../controllers/authController.js";
import BlogController from "../controllers/blogController.js";
import CategoryController from "../controllers/CategoryController.js";
import checkisUserAuthenticated from "../middleware/authMiddleware.js"
// Configure multer storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
  
    cb(null, 'public/upload');
  },
  filename: function(req, file, cb)  {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Create Express router
const router = express.Router();

// Authentication Routes
router.post("/user/register", AuthController.userRegistration);
router.post("/user/login", AuthController.userLogin);

// Protected Routes
router.get("/get/allblogs", checkisUserAuthenticated,BlogController.getAllBlogs);
router.post(
  "/add/blog",
  upload.single("thumbnail"),
  checkisUserAuthenticated,
  BlogController.addNewBlog
);
router.get(
  "/get/blog/:id",
  checkisUserAuthenticated,
  BlogController.getSingleBlog
); // Fixed route parameter

// Category Routes
router.get(
  "/get/categories",
  checkisUserAuthenticated,
  CategoryController.getAllCategory
);
router.post(
  "/add/categories",
  checkisUserAuthenticated,
  CategoryController.addNewCategory
);

export default router;
