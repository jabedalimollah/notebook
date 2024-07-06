import express from "express";
import {
  deleteUserProfile,
  getUserProfile,
  login,
  resetPassword,
  signup,
  updateUserProfile,
} from "../controllers/user.controller.js";
const router = express.Router();
import { userValidation } from "../middlewares/validation.middleware.js";
import { signUpSchema } from "../schemas/signup.schema.js";
import loginSchema from "../schemas/login.schema.js";
import { jwtAuthMiddleware } from "../middlewares/auth.middleware.js";
import resetPasswordSchema from "../schemas/resetPassword.schema.js";
import updateUserSchema from "../schemas/updateUser.schema.js";

// =============== Router ===============

// --------------- signup --------------
router.post("/signup", userValidation(signUpSchema), signup);

// --------------- log in -------------
router.post("/login", userValidation(loginSchema), login);

// ------------- Reset Password ---------
router.put(
  "/resetpassword",
  userValidation(resetPasswordSchema),
  resetPassword
);

// ------------- Update User Profile ----------
router.put(
  "/updateuser/:id",
  jwtAuthMiddleware,
  userValidation(updateUserSchema),
  updateUserProfile
);

// ---------------- Get User Profile ------------
router.get("/userprofile/:id", jwtAuthMiddleware, getUserProfile);

// ---------------- Delete User Profile ------------
router.delete("/deleteuser/:id", jwtAuthMiddleware, deleteUserProfile);

// --------------- Export Router --------------
export default router;
