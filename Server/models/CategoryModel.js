import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
title:{
  type:String,
  require:true
},
});

const categoryModel = mongoose.model("categories",categorySchema);
export default categoryModel;


