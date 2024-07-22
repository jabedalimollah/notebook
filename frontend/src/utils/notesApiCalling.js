import { apiRoutes } from "./apiRoutes";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const token = localStorage.getItem("notebookToken");
const user = jwtDecode(token); // jwtDecode is for extract user id
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

export { PostNotes, GetNotes };
