import { z } from "zod";
const signUpSchema = z.object({
  // --------------- name -------------
  name: z
    .string({
      required_error: "name is required",
      invalid_type_error: "name must be a string",
    })
    .trim()
    .min(2, { message: "name must be at least 2 characters" })
    .max(20, { message: "name must be at maximum 20 characters" })
    .regex(
      /^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/,
      "name must not contain special characters and numbers"
    ),

  // --------------- username -------------
  username: z
    .string({
      required_error: "username is required",
      invalid_type_error: "username must be a string",
    })
    .trim()
    .min(2, { message: "username must be at least 2 characters" })
    .max(20, { message: "username must be at maximum 20 characters" })
    .toLowerCase()
    .regex(
      /^[a-zA-Z0-9]{2,20}$/,
      "username must not contain special characters"
    ),

  // --------------- email -------------
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be a string",
    })
    .email({ message: "Invalid email address" })
    .trim()
    .toLowerCase(),

  // --------------- phone number -------------
  phoneNumber: z
    .string({
      required_error: "phone number is required",
      invalid_type_error: "phone number must be a string",
    })
    .min(6, { message: "phone number must be at least 6 numbers" })
    .max(12, {
      message: "phone number max 12 numbers",
    })
    .optional(),

  // --------------- password -------------
  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password must be a string",
    })
    .trim()
    .min(8, { message: "password must be at least 8 characters" }),

  // ------------------ Grid View -------------
  gridView: z.string().optional(),
});

export { signUpSchema };
