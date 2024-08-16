import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  category : {
    type : mongoose.Schema.Types.ObjectId,
    refer : "categories",
  },

  description : {
    type:String,
  },

  thumbnail :{
    type:String,
  },
  user : {
    type :mongoose.Schema.Types.ObjectId,
    refer :"users",
  },
});

const BlogModel = mongoose.model("blogs",BlogSchema);
export default BlogModel;