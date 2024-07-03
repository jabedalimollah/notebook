import express from "express";
import { login, signup } from "../controllers/user.controller.js";
const router = express.Router();
import { userValidation } from "../middlewares/validation.middleware.js";
import { signUpSchema } from "../schemas/signup.schema.js";
import loginSchema from "../schemas/login.schema.js";

// ----------- Router ----------
router.post("/signup", userValidation(signUpSchema), signup);
// router.route("/signup").post(signup);
router.post("/login", userValidation(loginSchema), login);
// router.post("/login", login);

export default router;
