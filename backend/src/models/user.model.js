import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  themeColor: {
    type: String,
    default: "#FFFFFF",
  },
  fontFamily: {
    type: String,
    default: "Arial, Helvetica, sans-serif",
  },
  fontStyle: {
    type: String,
    enum: ["normal", "italic"],
    default: "normal",
  },
  fontColor: {
    type: String,
    default: "#000000",
  },
});

const User = mongoose.model("User", userSchema);
export { User };
