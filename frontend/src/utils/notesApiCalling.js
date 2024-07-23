import { apiRoutes } from "./apiRoutes";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const token = localStorage.getItem("notebookToken");
const user = token ? jwtDecode(token) : null; // jwtDecode is for extract user id

// ==================== Post Notes [create new notes] ===========================
const PostNotes = async (data) => {
  try {
    // const token = localStorage.getItem("notebookToken");
    const response = await axios.post(apiRoutes.createNotesURI, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response.data);
  } catch (error) {
    // console.log(error);
  }
};

// ============================ Get All Notes ==================================
const GetNotes = async () => {
  try {
    const response = await axios.get(`${apiRoutes.getNotesURI}/${user._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(await response.data.data);
    return await response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// ====================== Find One Notes ==================================
const FindNotes = async (notesId) => {
  try {
    const response = await axios.get(`${apiRoutes.findNotesURI}/${notesId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response.data.data);
    return await response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// ========================== Update Exist Notes =============================
const UpdateNotesData = async (notesId, newData) => {
  try {
    const response = await axios.put(
      `${apiRoutes.updateNotesURI}/${notesId}`,
      newData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // console.log(response.data.data);
    return await response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// ========================== Delete Exist Notes ========================
const DeleteNotesData = async (notesId) => {
  try {
    const response = await axios.delete(
      `${apiRoutes.deleteNotesURI}/${notesId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // console.log(response);
    return await response.data.statusInfo;
  } catch (error) {
    console.log(error);
  }
};

export { PostNotes, GetNotes, FindNotes, UpdateNotesData, DeleteNotesData };
