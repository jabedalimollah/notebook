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
  phoneNumber: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "/Images/Profile_Pictures/profile1.jpg",
  },
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  country: {
    type: String,
    default: "India",
  },
  state: {
    type: String,
  },
  themeColor: {
    type: String,
    default: "bg-green-100",
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
  gridView: {
    type: String,
    default: "grid",
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
