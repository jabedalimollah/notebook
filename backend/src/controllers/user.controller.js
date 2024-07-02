import { User } from "../models/user.model.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
// ------------------ Sign Up -----------------
const signup = asyncErrorHandler(async (req, res) => {
  // try {
  const data = req.body;
  const checkUserName = await User.findOne({ username: data.username });
  // console.log(checkUserName);
  const checkEmail = await User.findOne({ email: data.email });
  // console.log(checkEmail);

  // ================= check duplicate username and email ===============
  if (checkUserName) {
    // console.log("username already exists");

    // ****** throwing error in errorHandler.js file **********
    throw {
      status: 400,
      statusInfo: "error",
      message: "username already exists",
    };
    // res.status(400).json({ message: "username already exists" });
  } else if (checkEmail) {
    // console.log("email already exists");

    // ****** throwing error in errorHandler.js file **********
    throw {
      status: 400,
      statusInfo: "error",
      message: "email already exists",
    };
    // res.status(400).json({ message: "email already exists" });
  } else {
    const newUser = new User(data);
    const response = await newUser.save();
    // res.status(200).json(response);
    res
      .status(200)
      .json({ status: 200, statusInfo: "success", response: response });
  }
  // } catch (err) {
  //   res.status(500).json({ error: "Sign Up problem" });
  //   // console.log("sign up problem", err);
  // }
});

// const signup = async (req, res) => {
//   try {
//     const data = req.body;
//     const checkUserName = await User.findOne({ username: data.username });
//     // console.log(checkUserName);
//     const checkEmail = await User.findOne({ email: data.email });
//     // console.log(checkEmail);

//     // ================= check duplicate username and email ===============
//     if (checkUserName) {
//       // console.log("username already exits");
//       res.status(400).json({ message: "username already exits" });
//     } else if (checkEmail) {
//       // console.log("email already exits");
//       res.status(400).json({ message: "email already exits" });
//     } else {
//       const newUser = new User(data);
//       const response = await newUser.save();
//       res.status(200).json(response);
//     }
//   } catch (err) {
//     res.status(500).json({ error: "Sign Up problem" });
//     // console.log("sign up problem", err);
//   }
// };

// ------------------------ Export ----------------
export { signup };
