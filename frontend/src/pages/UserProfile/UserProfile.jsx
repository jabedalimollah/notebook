import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import profile from "/Images/Profile_Pictures/profile1.jpg";
import { FaPlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { RiEdit2Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { PiGenderIntersexBold } from "react-icons/pi";
import { FaTransgender } from "react-icons/fa";
import { IoCalendarNumber } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FaGlobe } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { apiRoutes } from "@/utils/apiRoutes";
import { jwtDecode } from "jwt-decode";
import { getData } from "@/features/user/userSlice";
import ChangeProfileImage from "@/components/ChangeProfileImage/ChangeProfileImage";
import Loading from "@/components/Loading/Loading";
// import image from "../../db.json";
const UserProfile = () => {
  // ----------------------- State Start ---------------------
  // const [data, setData] = useState({});
  const [imageEditBtn, setImageEditBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const data = useSelector((state) => state.user.value);

  // ------------------- State End --------------------

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleApiCalling = async () => {
    try {
      const token = localStorage.getItem("notebookToken");
      const user = token ? jwtDecode(token) : null;
      // console.log(user._id);

      // console.log(user._id);
      setLoading(true);
      const response = await axios.get(
        `${apiRoutes.userprofileURI}/${user._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // const response = await axios.get(
      //   `http://localhost:8000/api/v1/user/userprofile/6682382e4b698023592a256a`,
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );
      // console.log("res", response.data.data);
      setLoading(false);
      dispatch(getData(response.data.data));
      // setData(response.data.data);
    } catch (error) {
      setLoading(false);
      console.log("err", error);
    }
  };
  const handleImageChangeBtn = () => {
    setImageEditBtn(!imageEditBtn);
  };
  const handleLogOutBtn = () => {
    localStorage.removeItem("notebookToken");
    navigate("/user/login");
    window.location.reload();
  };
  useEffect(() => {
    handleApiCalling();
  }, []);

  return (
    <>
      {loading ? <Loading /> : ""}
      <div
        className={`w-full md:h-screen lg:h-screen pt-10 box-border background_color `}
      >
        {/* ======================== Back Button ==================== */}
        <div
          className={`ml-3 md:ml-12 lg:ml-12 pt-4 pb-3 md:pb-0 lg:pb-0 md:pt-10 lg:pt-10`}
        >
          <Link
            to="/user/notes"
            className={`text-emerald-950 font-medium flex items-center text-sm md:text-base lg:text-base  w-fit`}
          >
            <IoMdArrowBack className={`mr-2`} /> Back To Home
          </Link>
        </div>
        <div
          className={`w-full md:mt-16 lg:mt-0  flex justify-center items-center`}
        >
          {/* ========================= Profile Box =========================== */}
          <div
            className={`w-9/12 md:w-10/12 lg:w-7/12 flex flex-col md:flex-row lg:flex-row rounded-lg box_color box_shadow`}
          >
            {/* ------------------ Profile Picture, Edit Profile, Settings and Logout Button ---------------- */}
            <div
              className={`w-full md:w-4/12 gap-y-5 p-6 bg-white flex flex-col justify-center items-center `}
            >
              <div className={` w-8/12 md:w-full lg:w-full relative `}>
                {/* <div className={` w-full relative `}> */}
                <div className={`w-12/12`}>
                  <img
                    // src={image[1].path}
                    src={data.profilePic}
                    alt=""
                    className={`w-fit rounded-full`}
                  />
                  {/* <img src={profile} alt="" className={`w-fit rounded-full`} /> */}
                </div>
                {/* <button
                  className={`box_color border border-black rounded-full p-2 absolute bottom-0 right-12`}
                >
                  <FaCamera className={`text-gray-700  text-2xl`} />
                </button> */}
                <button
                  onClick={handleImageChangeBtn}
                  className={`button_gradient_color p-2 borders border-black rounded-full font-bold absolute bottom-0 right-3`}
                >
                  <FaPlus className={`text-white text-2xl `} />
                </button>
              </div>
              <div
                className={`text-xl md:text-base lg:text-xl font-bold text-green-700`}
              >
                <h1>{data.name}</h1>
              </div>
              <div
                className={`text-lg md:text-base lg:text-lg font-bold w-full hidden md:inline-block lg:inline-block`}
              >
                <Link
                  to="/user/edit_profile"
                  className={`flex items-center py-1 gap-x-1 border border-black hover:bg-black hover:text-white w-full justify-center rounded`}
                >
                  {/* <FaEdit /> */}
                  <RiEdit2Fill />
                  Edit Profile
                </Link>
              </div>
              <div
                className={`text-lg md:text-base lg:text-lg text-green-900 font-bold w-full hidden md:inline-block lg:inline-block`}
              >
                <Link
                  to="/user/settings"
                  className={`flex items-center py-1 gap-x-1 w-full justify-center border border-black rounded hover:bg-green-900 hover:text-white`}
                >
                  <IoSettingsSharp /> Settings
                </Link>
              </div>
              <div
                className={`text-lg md:text-base lg:text-lg w-full font-semibold hidden md:inline-block lg:inline-block`}
              >
                <button
                  onClick={handleLogOutBtn}
                  className={`bg-red-500 py-1 rounded text-white w-full hover:bg-red-800`}
                >
                  Log out
                </button>
              </div>
            </div>
            {/* ------------------- Profile Details ----------------------- */}
            <div className={`w-full flex items-center flex-col p-6`}>
              {/* ----------------- Name and Username --------------- */}
              <div
                className={`w-8/12  text-center mt-8 hidden md:inline-block lg:inline-block`}
              >
                <h2 className={`text-3xl font-bold text-gray-700 mb-4 `}>
                  {data.name}
                  {/* Jabed Ali Mollah */}
                </h2>
                <span className={`text-green-800 font-bold text-lg`}>
                  Profile
                </span>
              </div>
              <hr
                className={`w-10/12 my-3 border border-gray-500 hidden md:inline-block lg:inline-block`}
              />
              {/* -------------- User Details ---------------- */}
              <div className={`w-full flex flex-col items-center`}>
                {/* <div className={`w-8/12 flex border border-black`}>
                  <span className={`mr-12`}>Username</span>
                  <span>@jabed</span>
                </div> */}
                <table className="w-full md:w-9/12 lg:w-9/12 ">
                  <thead>
                    <tr>
                      {/* <th
                        className={`w-8/12 border-separate border py-2 text-center`}
                      >
                        User Details
                      </th> */}
                      {/* <th>Content</th> */}
                    </tr>
                  </thead>
                  <tbody
                    className={` md:leading-8 lg:leading-8 text-sm md:text-base`}
                    // className={` md:leading-8 lg:leading-8 flex flex-col md:contents text-sm md:text-base`}
                  >
                    <tr
                      className={`mb-3 md:mb-0 lg-0 w-full flex md:table-row lg:table-row gap-x-1`}
                    >
                      <td className={`font-bold flex items-center gap-x-1`}>
                        <FaUser />
                        <span className="hidden md:inline-block">Username</span>
                      </td>
                      <td className={`font-bold text-gray-500`}>
                        @{data.username}
                        {/* @jabed */}
                      </td>
                    </tr>
                    <tr
                      className={`mb-3 md:mb-0 lg-0 w-full flex md:table-row gap-x-1`}
                    >
                      <td className={`font-bold flex items-center gap-x-1`}>
                        <MdEmail />
                        <span className={`hidden md:inline-block `}>Email</span>
                      </td>
                      <td className={`font-bold text-gray-500`}>
                        {data.email}
                        {/* jabed@test.com */}
                      </td>
                    </tr>
                    <tr
                      className={`mb-3 md:mb-0 lg-0 w-full flex md:table-row gap-x-1`}
                    >
                      <td className={`font-bold flex items-center gap-x-1`}>
                        <MdLocalPhone />
                        <span className={`hidden md:inline-block`}>
                          Phone Number
                        </span>
                      </td>
                      <td className={`font-bold text-gray-500`}>
                        {/* 6295965896 */}
                        {data.phoneNumber}
                      </td>
                    </tr>
                    <tr
                      className={`mb-3 md:mb-0 lg-0 w-full flex md:table-row gap-x-1`}
                    >
                      <td className={`font-bold flex items-center gap-x-1`}>
                        <PiGenderIntersexBold />
                        <span className={`hidden md:inline-block`}>Gender</span>
                      </td>
                      <td className={`font-bold text-gray-500 capitalize`}>
                        {data.gender || "none"}
                        {/* Male */}
                      </td>
                    </tr>
                    <tr
                      className={`mb-3 md:mb-0 lg-0 w-full flex md:table-row gap-x-1`}
                    >
                      <td className={`font-bold flex items-center gap-x-1`}>
                        {/* <IoCalendarNumber /> */}
                        <FaCalendarAlt />
                        <span className={`hidden md:inline-block`}>
                          Date Of Birth
                        </span>
                      </td>
                      <td className={`font-bold text-gray-500`}>
                        {data.dateOfBirth || "none"}
                        {/* 08/10/2000 */}
                      </td>
                    </tr>
                    <tr
                      className={`mb-3 md:mb-0 lg-0 w-full flex md:table-row gap-x-1`}
                    >
                      <td className={`font-bold flex items-center gap-x-1`}>
                        <IoLocationSharp />
                        <span className={`hidden md:inline-block`}>State</span>
                      </td>
                      <td className={`font-bold text-gray-500`}>
                        {data.state || "none"}
                        {/* West Bengal */}
                      </td>
                    </tr>
                    <tr
                      className={`mb-3 md:mb-0 lg-0 w-full flex md:table-row gap-x-1`}
                    >
                      <td className={`font-bold flex items-center gap-x-1`}>
                        <FaGlobe />
                        <span className={`hidden md:inline-block`}>
                          Country
                        </span>
                      </td>
                      <td className={`font-bold text-gray-500`}>
                        {data.country || "none"}
                        {/* India */}
                      </td>
                    </tr>
                    {/* <tr>
                      <td>Email</td>
                      <td>jabed@test.com</td>
                    </tr>
                    <tr>
                      <td>Phone Number</td>
                      <td>6295965896</td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
            <div
              className={`w-full mb-8 flex flex-col items-center gap-y-3 md:hidden lg:hidden`}
            >
              <div
                className={`w-8/12 text-sm md:text-base lg:text-lg font-bold  inline-block md:hidden lg:hidden`}
              >
                <Link
                  to="/user/edit_profile"
                  className={`flex items-center py-1 gap-x-1 border border-black hover:bg-black hover:text-white w-full justify-center rounded`}
                >
                  {/* <FaEdit /> */}
                  <RiEdit2Fill />
                  Edit Profile
                </Link>
              </div>

              <div
                className={`w-8/12 text-sm md:text-base lg:text-lg text-green-900 font-bold inline-block md:hidden lg:hidden`}
              >
                <Link
                  to="/user/settings"
                  className={`flex items-center py-1 gap-x-1 w-full justify-center border border-black rounded hover:bg-green-900 hover:text-white`}
                >
                  <IoSettingsSharp /> Settings
                </Link>
              </div>
              <div
                className={`w-8/12 text-sm md:text-base lg:text-lg  font-semibold inline-block md:hidden lg:hidden`}
              >
                <button
                  onClick={handleLogOutBtn}
                  className={`bg-red-500 py-1 rounded text-white w-full hover:bg-red-800`}
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ====================== Image Edit Component ============= */}
      {imageEditBtn ? (
        <ChangeProfileImage
          handleImageChangeBtn={handleImageChangeBtn}
          profilePic={data.profilePic}
        />
      ) : null}
    </>
  );
};

export default UserProfile;

// <tbody
// className={` md:leading-8 lg:leading-8 flex flex-col md:contents text-sm md:text-base`}
// >
// <tr className={`mb-3 md:mb-0 lg-0 w-full`}>
//   <td className={`font-bold flex items-center gap-x-1`}>
//     <FaUser />
//     Username
//   </td>
//   <td className={`font-bold text-gray-500`}>
//     @{data.username}

//   </td>
// </tr>
// <tr className={`mb-3 md:mb-0 lg-0 w-full`}>
//   <td className={`font-bold flex items-center gap-x-1`}>
//     <MdEmail />
//     Email
//   </td>
//   <td className={`font-bold text-gray-500`}>
//     {data.email}

//   </td>
// </tr>
// <tr className={`mb-3 md:mb-0 lg-0 w-full`}>
//   <td className={`font-bold flex items-center gap-x-1`}>
//     <MdLocalPhone />
//     Phone Number
//   </td>
//   <td className={`font-bold text-gray-500`}>

//     {data.phoneNumber}
//   </td>
// </tr>
// <tr className={`mb-3 md:mb-0 lg-0 w-full`}>
//   <td className={`font-bold flex items-center gap-x-1`}>
//     <PiGenderIntersexBold />
//     Gender
//   </td>
//   <td className={`font-bold text-gray-500`}>
//     {data.gender || "none"}

//   </td>
// </tr>
// <tr className={`mb-3 md:mb-0 lg-0 w-full`}>
//   <td className={`font-bold flex items-center gap-x-1`}>

//     <FaCalendarAlt />
//     Date Of Birth
//   </td>
//   <td className={`font-bold text-gray-500`}>
//     {data.dob || "none"}

//   </td>
// </tr>
// <tr className={`mb-3 md:mb-0 lg-0 w-full`}>
//   <td className={`font-bold flex items-center gap-x-1`}>
//     <IoLocationSharp />
//     State
//   </td>
//   <td className={`font-bold text-gray-500`}>
//     {data.state || "none"}

//   </td>
// </tr>
// <tr className={`mb-3 md:mb-0 lg-0 w-full`}>
//   <td className={`font-bold flex items-center gap-x-1`}>
//     <FaGlobe />
//     Conuntry
//   </td>
//   <td className={`font-bold text-gray-500`}>
//     {data.country || "none"}

//   </td>
// </tr>
// </tbody>
