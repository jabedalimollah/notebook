import { User } from "../models/user.model.js";

// ------------------ Sign Up -----------------
const signup = async (req, res) => {
  try {
    const data = req.body;
    const checkUserName = await User.findOne({ username: data.username });
    // console.log(checkUserName);
    const checkEmail = await User.findOne({ email: data.email });
    if (checkUserName) {
      // console.log("username already exits");
      res.status(400).json({ message: "username already exits" });
    } else if (checkEmail) {
      // console.log("email already exits");
      res.status(400).json({ message: "email already exits" });
    } else {
      const newUser = new User(data);
      const response = await newUser.save();
      res.status(200).json(response);
    }
  } catch (err) {
    res.status(500).json({ error: "Sign Up problem" });
    // console.log("sign up problem", err);
  }
};

// ------------------------ Export ----------------
export { signup };
