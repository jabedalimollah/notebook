import express from "express";
import {
  deleteUserProfile,
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
// ----------- Router ----------
router.post("/signup", userValidation(signUpSchema), signup);
// router.route("/signup").post(signup);
router.post("/login", userValidation(loginSchema), login);
// router.post("/login", login);

router.put(
  "/resetpassword",
  userValidation(resetPasswordSchema),
  resetPassword
);

router.put(
  "/updateuser/:id",
  userValidation(updateUserSchema),
  updateUserProfile
);

router.delete("/deleteuser/:id", deleteUserProfile);
export default router;
