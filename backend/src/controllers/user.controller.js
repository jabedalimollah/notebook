import { User } from "../models/user.model.js";

// ------------------ Sign Up -----------------
const signup = async (req, res) => {
  try {
    const data = req.body;
    const newUser = new User(data);
    const response = await newUser.save();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Sign Up problem" });
    // console.log("sign up problem", err);
  }
};

// ------------------------ Export ----------------
export { signup };
