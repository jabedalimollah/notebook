import { mongoose, Schema } from "mongoose";
const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    themeColor: {
      type: String,
      default: "#FFFFFF",
    },
    fontFamily: {
      type: String,
      default: "Arial, Helvetica, sans-serif",
    },
    fontStyle: {
      type: String,
      enum: ["normal", "italic"],
      default: "normal",
    },
    fontColor: {
      type: String,
      default: "#000000",
    },
    password: {
      type: String,
    },
    isPasswordProtected: {
      type: Boolean,
      default: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is Required"],
    },
  },
  {
    timestamps: true,
  }
);

const Notes = mongoose.model("Notes", notesSchema);
export { Notes };
