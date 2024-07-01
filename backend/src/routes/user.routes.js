import express from "express";
import { signup } from "../controllers/user.controller.js";
const router = express.Router();
import { signupValidation } from "../middlewares/validation.middleware.js";
import { signUpSchema } from "../schemas/signup.schema.js";
// ----------- Router ----------
router.post("/signup", signupValidation(signUpSchema), signup);
// router.route("/signup").post(signup);

export default router;
