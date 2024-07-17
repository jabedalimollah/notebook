import React, { useEffect, useState } from "react";
import picturesData from "../../db.json";
import { apiRoutes } from "@/utils/apiRoutes";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "@/features/user/userSlice";
const ChangeProfileImage = ({ handleImageChangeBtn, profilePic }) => {
  const [changeImageBtn, setChangeImageBtn] = useState(false);

  const handleChangeImageBtn = () => {
    setChangeImageBtn(!changeImageBtn);
  };
  return (
    <>
      <div
        className={`w-full h-dvh background_color z-10 fixed left-0 top-0 flex justify-center items-center`}
      >
        <div
          className={`w-10/12 md:w-6/12 lg:w-3/12 background_gradient_color  rounded-lg`}
        >
          <div className={`w-full`}>
            <img
              // src="/Images/Profile_Pictures/profile2.jpg"
              src={profilePic}
              alt=""
              className={`w-full rounded-lg`}
            />
          </div>
          <div className={`w-full flex justify-between mt-9`}>
            <button
              onClick={() => handleImageChangeBtn()}
              className={`w-5/12 py-2 bg-red-600 rounded text-white hover:bg-red-700`}
            >
              Cancel
            </button>

            <button
              onClick={handleChangeImageBtn}
              className={`w-5/12 py-2 bg-slate-500 hover:bg-slate-600 rounded text-white`}
            >
              Change Image
            </button>
          </div>
        </div>
      </div>
      {/* ================== Change Image Component ======================== */}
      {changeImageBtn ? (
        <ChangeImage handleChangeImageBtn={handleChangeImageBtn} />
      ) : null}
    </>
  );
};

const ChangeImage = ({ handleChangeImageBtn }) => {
  const [pictures, setPictures] = useState([]);
  const [selectPhoto, setSelectPhoto] = useState("");
  const userId = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const handleSelectPhoto = (select) => {
    // console.log(select);
    setSelectPhoto(select);
  };
  const handleSaveBtn = () => {
    // console.log(selectPhoto);
    // console.log(userId._id);

    handleApiCalling();
    handleChangeImageBtn();
  };
  const handleApiCalling = async () => {
    try {
      const token = localStorage.getItem("notebookToken");
      const response = await axios.put(
        `${apiRoutes.updateUserProfileURI}/${userId._id}`,
        { profilePic: selectPhoto },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(getData(response.data.data));
    } catch (error) {
      console.log("err", error);
    }
  };
  useEffect(() => {
    setPictures(picturesData);
  }, []);
  return (
    <>
      <div
        className={`w-full h-dvh z-20 fixed left-0 top-0 flex justify-center items-center background_color`}
      >
        <div
          className={`w-10/12 md:w-8/12 lg:w-4/12  background_gradient_color p-4 rounded-md shadow-lg`}
        >
          <div className={`w-full grid grid-cols-3 gap-4 `}>
            {pictures.map((item, index) => (
              <div
                className={`w-full ${
                  selectPhoto === item.path
                    ? " border-2 border-green-500"
                    : "border-0"
                } p-2 rounded `}
                key={item.id}
                onClick={() => handleSelectPhoto(item.path)}
              >
                <img src={item.path} alt="" className={`w-full`} />
              </div>
            )) || <div>Loading ...</div>}
          </div>
          <div className={`w-full flex justify-between mt-4`}>
            <button
              onClick={() => handleChangeImageBtn()}
              className={`bg-red-600 hover:bg-red-700 shadow-2xl w-4/12 py-2 text-white rounded`}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveBtn}
              className={`bg-green-600 hover:bg-green-700 shadow-lg w-4/12 py-2 text-white rounded`}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeProfileImage;

// {pictures.map((item, index) => (
//   <div>
//     <img src={item.path} alt="" />
//   </div>
// ))}

// View Change Image Remove cancel

{
  /* <div
  className={`w-full h-dvh background_color z-10 fixed left-0 top-0 flex justify-center items-center`}
>
  <div className="w-3/12 shadow-md flex flex-col items-center gap-y-2 p-5 background_gradient_color rounded">
    <button
      onClick={handleViewPicture}
      className={`border-2 border-blue-600 p-2 w-10/12 rounded text-blue-800 hover:bg-blue-800 hover:text-white font-bold`}
    >
      View
    </button>

    <button
      className={`border-2 border-green-600 p-2 w-10/12 rounded text-green-800 hover:bg-green-800 hover:text-white font-bold`}
    >
      Change Image
    </button>

    <button
      className={`border-2 border-gray-600 p-2 w-10/12 rounded text-gray-800 hover:bg-gray-800 hover:text-white font-bold`}
    >
      Default Picture
    </button>

    <button
      onClick={() => handleImageChangeBtn()}
      className={`border-2 border-red-600 p-2 w-10/12 rounded text-red-800 hover:bg-red-800 hover:text-white font-bold`}
    >
      Cancel
    </button>
  </div>
</div>; */
}
