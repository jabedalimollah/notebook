import mongoose from "mongoose";
import bcrypt from "bcrypt";
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
// ------------------- Hashed Password --------------------
userSchema.pre("save", async function (next) {
  // --------- check password is modified or not -----------
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, genSalt);
    this.password = hashedPassword;
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export { User };
