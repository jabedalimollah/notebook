import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { apiRoutes } from "./apiRoutes";
const token = localStorage.getItem("notebookToken");
const user = token ? jwtDecode(token) : null; // jwtDecode is for extract user id

// ================= Get User Data =================
const GetUserData = async () => {
  try {
    const response = await axios.get(
      `${apiRoutes.userprofileURI}/${user._id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return await response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// ==================== Update User Data =======================
const UpdateUserData = async (updateData) => {
  try {
    const response = await axios.put(
      `${apiRoutes.updateUserProfileURI}/${user._id}`,
      updateData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    //   console.log(response.data.data)
    //   dispatch(getData(response.data.data));
    //   setData(response.data.data);
    return await response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export { GetUserData, UpdateUserData };
