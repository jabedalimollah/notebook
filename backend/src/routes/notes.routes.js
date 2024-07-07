import express from "express";
import {
  deleteData,
  findNotes,
  getData,
  postData,
  updateData,
} from "../controllers/notes.controller.js";
const router = express.Router();

// =========== Router ===========
router.post("/postdata", postData);
router.get("/getdata/:id", getData);
router.put("/updatedata/:id", updateData);
router.delete("/deletedata/:id", deleteData);
router.get("/findnotes/:id", findNotes);

export default router;
