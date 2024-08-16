import BlogModel from "../models/BlogModel.js";
class BlogController {
  static getAllBlogs = async (req, res) => {
    try {
      const fetchAllBlogs = await BlogModel.find({ user: req.user._id });
      return res.status(200).json(fetchAllBlogs);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  static addNewBlog = async (req, res) => {
    console.log("User:", req.user); // Debugging line
    const { title, category, description } = req.body;
    try {
      if (title && category && description) {
        const addBlog = new BlogModel({
          title: title,
          description: description,
          category: category,
          thumbnail: req.file.filename,
          user: req.user._id, // Ensure req.user is properly set
        });
        const savedBlog = await addBlog.save();
        if (savedBlog) {
          return res.status(200).json({ message: "Blog Added Successfully" });
        }
      } else {
        return res.status(400).json({ message: "All fields are Required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static getSingleBlog = async (req, res) => {
    const { id } = req.params;
    try {
      if (id) {
        const fetchBlogByUserId = await BlogModel.findById(id);
        return res.status(200).json(fetchBlogByUserId);
      } else {
        return res.status(400).json({ message: "Invalid URL" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
}

export default BlogController;
