import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import { generateToken } from "../middlewares/auth.middleware.js";
import { encryPassword } from "../utils/hashPassword.js";
// ------------------ Sign Up -----------------
const signup = asyncErrorHandler(async (req, res) => {
  // try {
  const data = req.body;
  const checkUserName = await User.findOne({ username: data.username });
  // console.log(checkUserName);
  const checkEmail = await User.findOne({ email: data.email });
  // console.log(checkEmail);

  // ================= check duplicate username and email ===============
  if (checkUserName || checkEmail) {
    // console.log("username already exists");

    // ****** throwing error in ApiError.js file **********
    // throw new ApiError(400, "error", "username or email already exists");

    // ****** throwing error in errorHandler.js file **********
    throw {
      status: 409,
      statusInfo: "error",
      response: "username or email already exists",
    };
    // res.status(400).json({ response: "username or email already exists" });
  } else {
    const newUser = new User(data);
    const response = await newUser.save();

    // console.log(newPassword);
    // res.status(200).json(response);
    const payload = {
      _id: response._id,
      name: response.name,
      username: response.username,
      email: response.email,
    };
    const token = generateToken(payload);
    res.status(200).json({
      status: 200,
      statusInfo: "success",
      response: response,
      token: token,
    });
  }
  // if (checkUserName) {
  //   // console.log("username already exists");

  //   // ****** throwing error in ApiError.js file **********
  //   // throw new ApiError(400, "error", "username already exists");

  //   // ****** throwing error in errorHandler.js file **********
  //   throw {
  //     status: 400,
  //     statusInfo: "error",
  //     response: "username already exists",
  //   };
  //   // res.status(400).json({ response: "username already exists" });
  // } else if (checkEmail) {
  //   // console.log("email already exists");

  //   // ****** throwing error in errorHandler.js file **********
  //   throw {
  //     status: 400,
  //     statusInfo: "error",
  //     response: "email already exists",
  //   };
  //   // res.status(400).json({ response: "email already exists" });
  // } else {
  //   const newUser = new User(data);
  //   const response = await newUser.save();
  //   // res.status(200).json(response);
  //   res
  //     .status(200)
  //     .json({ status: 200, statusInfo: "success", response: response });
  // }
  // } catch (err) {
  //   res.status(500).json({ error: "Sign Up problem" });
  //   // console.log("sign up problem", err);
  // }
});

// ------------------- Log in ---------------------
const login = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;

  // ---------- check email and password exists or not ---------
  // const response = await User.findOne({
  //   email,
  //   password,
  // });

  const user = await User.findOne({ email: email });

  if (!user || !(await user.comparePassword(password))) {
    // ****** throwing error in errorHandler.js file **********
    throw {
      status: 401,
      statusInfo: "error",
      response: "email or password doesn't exists",
    };
  }
  // ------------ Generate Token ----------
  const payload = {
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
  };
  const token = generateToken(payload);
  // ------------------ response send -------------
  res
    .status(200)
    .json({ status: 200, statusInfo: "success", response: user, token: token });
});

// -------------------- Reset Password -------------
const resetPassword = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await encryPassword(password);

  const user = await User.findOneAndUpdate(
    {
      email: email,
    },
    {
      password: hashedPassword,
    },
    {
      new: true,
    }
  );
  if (!user) {
    throw new ApiError(404, "fail", "user not found");
  } else {
    res
      .status(200)
      .json({ status: 200, statusInfo: "success", response: user });
  }
});

// ------------------ Update User Profile ----------------
const updateUserProfile = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;

  const updateUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updateUser) {
    throw new ApiError(404, "fail", "user not found");
  }
  res
    .status(200)
    .json({ status: 200, statusInfo: "success", response: updateUser });
});

// ----------------- Delete User Profile ------------------
const deleteUserProfile = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const user = await User.findOne({ _id: id });

  // ------------- user exist or not --------
  if (!user) {
    throw new ApiError(404, "fail", "user not found");
  }

  // ------------ Enter password before deleting account ----------
  // -------------- compare password -----------------
  const userPassword = await user.comparePassword(password);

  // ------------- check password correct or wrong --------------
  if (!userPassword) {
    throw new ApiError(401, "fail", "wrong password");
  }
  const deleteUser = await User.findByIdAndDelete({ _id: id });

  if (!deleteUser) {
    throw new ApiError(404, "fail", "user not found");
  }
  res.status(200).json({
    status: 200,
    statusInfo: "success",
    response: "account deleted successfully",
  });
});

// ------------------------ Export ----------------
export { signup, login, resetPassword, updateUserProfile, deleteUserProfile };

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
//       res.status(400).json({ response: "username already exits" });
//     } else if (checkEmail) {
//       // console.log("email already exits");
//       res.status(400).json({ response: "email already exits" });
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
