import { Notes } from "../models/notes.model.js";
import ApiError from "../utils/ApiError.js";
// import ApiResponse from "../utils/apiResponse.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";

// ================ Post Data =========
const postData = asyncErrorHandler(async (req, res) => {
  const data = req.body;
  if (!data.author) {
    throw new ApiError(404, "fail", "author not found");
  }
  if (data.password) {
    data.isPasswordProtected = true;
  }
  const newData = new Notes(data);
  const newNotes = await newData.save();
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        newNotes,
        null,
        "success",
        "notes created successfully"
      )
    );
});

// ================ Get Data =============
const getData = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const data = await Notes.find({ author: id });
  res
    .status(200)
    .json(
      new ApiResponse(200, data, null, "success", "data getting successfully")
    );
});

// ============== Update Data ============
const updateData = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const updateData = await Notes.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!updateData) {
    throw new ApiError(401, "fail", "notes not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updateData,
        null,
        "success",
        "data updated successfully"
      )
    );
});

// =============== Delete Data ===============
const deleteData = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const deleteData = await Notes.findByIdAndDelete(id);
  if (!deleteData) {
    throw new ApiError(404, "fail", "data not found");
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, null, null, "success", "data deleted successfully")
    );
});

// =============== Find Notes =============
const findNotes = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const data = await Notes.findById(id);
  if (!data) {
    throw new ApiError(404, "fail", "data not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, data, null, "success", "data get successfully"));
});

// ============ Export ==========
export { postData, getData, updateData, deleteData, findNotes };
