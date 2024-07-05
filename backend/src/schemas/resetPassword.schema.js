import { z } from "zod";
// ==================== Reset Password Schema ===============
const resetPasswordSchema = z.object({
  // ------------------- email -----------------
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be a string",
    })
    .email({ message: "Invalid email address" }),
  // ----------------- password ------------------
  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password must be a string",
    })
    .trim()
    .min(8, { message: "password must be at least 8 characters" }),
});

export default resetPasswordSchema;
