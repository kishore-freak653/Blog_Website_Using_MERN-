import categoryModel from "../models/CategoryModel.js";

class CategoryController{
  static getAllCategory = async (req,res)=> {
  try {
    const fetchAllCategories = await categoryModel.find({});
    return res.status(200).json(fetchAllCategories);
  } catch (error) {
     return res.status(400).json({message : error.message});
  }
  };

  static addNewCategory = async (req,res) =>{

    const{title} = req.body;
    try {
      if(title) {
    const NewCategory = new categoryModel({
      title,
    })
    const SaveCategory = await NewCategory.save();
    if(SaveCategory){
       return res.status(200).json({ message: "Category Added Successfully" });
    }
      }
      else{
        return res.status(400).json({ message: "All Fields are Required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
}

export default CategoryController;