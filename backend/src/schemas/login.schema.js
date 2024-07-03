import { z } from "zod";
const loginSchema = z.object({
  // ------------------- email -----------------
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be a string",
    })
    .email({ message: "Invalid email address" }),
  // ----------------- password ------------------
  password: z.string({
    required_error: "password is required",
    invalid_type_error: "password must be a string",
  }),
});
export default loginSchema;
