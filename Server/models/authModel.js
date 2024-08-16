import express from "express";
import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

authSchema.index({ email: 1 }, { unique: true });
const authModel = mongoose.model("users",authSchema);
export default authModel;