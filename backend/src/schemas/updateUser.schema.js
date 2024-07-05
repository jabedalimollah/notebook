import { z } from "zod";
const updateUserSchema = z.object({
  // --------------- name -------------
  name: z
    .string({
      invalid_type_error: "name must be a string",
    })
    .trim()
    .min(2, { message: "name must be at least 2 characters" })
    .max(20, { message: "name must be at maximum 20 characters" })
    .regex(
      /^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/,
      "name must not contain special characters and numbers"
    )
    .optional(),

  // --------------- username -------------
  username: z
    .string({
      invalid_type_error: "username must be a string",
    })
    .trim()
    .min(2, { message: "username must be at least 2 characters" })
    .max(20, { message: "username must be at maximum 20 characters" })
    .toLowerCase()
    .regex(
      /^[a-zA-Z0-9]{2,20}$/,
      "username must not contain special characters"
    )
    .optional(),

  // --------------- email -------------
  email: z
    .string({
      invalid_type_error: "email must be a string",
    })
    .email({ message: "Invalid email address" })
    .trim()
    .toLowerCase()
    .optional(),

  // --------------- Theme Color -------------
  themeColor: z
    .string({ invalid_type_error: "them must be a string" })
    .optional(),

  // ----------------- font family ----------
  fontFamily: z
    .string({ invalid_type_error: "font family must be a string" })
    .optional(),

  // --------------- font style ----------
  fontStyle: z.enum(["normal", "italic"]).optional(),

  //   -------------- font color -------------
  fontColor: z
    .string({ invalid_type_error: "font color must be a string" })
    .optional(),
});

export default updateUserSchema;
