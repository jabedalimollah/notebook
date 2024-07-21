import { apiRoutes } from "./apiRoutes";
import axios from "axios";
const PostNotes = async (data) => {
  try {
    const token = localStorage.getItem("notebookToken");
    const response = await axios.post(apiRoutes.createNotesURI, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response.data);
  } catch (error) {
    // console.log(error);
  }
};

export { PostNotes };
