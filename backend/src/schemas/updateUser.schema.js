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
    // .regex(
    //   /^[a-zA-Z0-9]{2,20}$/,
    //   "username must not contain special characters"
    // )
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

  // ------------------ Profile Picture ----------------
  profilePic: z.string().optional(),

  // --------------------- Gender ---------------------
  gender: z.string({ invalid_type_error: "them must be a string" }).optional(),

  // ------------------ Date of Birth --------------
  dateOfBirth: z
    .string({ invalid_type_error: "them must be a string" })
    .optional(),

  // --------------------- Country -------------------
  country: z.string({ invalid_type_error: "them must be a string" }).optional(),

  // ------------------------- State -----------------
  state: z.string({ invalid_type_error: "them must be a string" }).optional(),

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
  // ----------------------- Grid View -----------------
  gridView: z.string().optional(),
});

export default updateUserSchema;
