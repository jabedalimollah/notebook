import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { PiGenderIntersexBold } from "react-icons/pi";
import { IoMaleSharp } from "react-icons/io5";
import { IoFemale } from "react-icons/io5";
import { FaTransgenderAlt } from "react-icons/fa";
import { BiMaleFemale } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";
import { Link } from "react-router-dom";
import countryData from "../../database/countryStateDetails.json";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { getData } from "@/features/user/userSlice";
import { apiRoutes } from "@/utils/apiRoutes";
import { ToastContainer, toast } from "react-toastify";
import Loading from "@/components/Loading/Loading";

// const countryData =
//   "https://raw.githubusercontent.com/devopsdeveloper1107/Country-state-city-table-in-json/main/Country-State-Data-In-JSON";
const EditProfile = () => {
  // ------------------------ State Start --------------------
  const [countryDetails, setCountryDetails] = useState([]);
  const [countryName, setCountryName] = useState("India");
  const [stateDetails, setStateDetails] = useState([]);
  const [stateName, setStateName] = useState("West Bengal");
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    country: "",
    state: "",
  });
  const [validationMessage, setValidationMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.user.value);

  // ----------------------- State End -----------------------
  const dispatch = useDispatch();

  // --------------This function is use Input box ----------------
  const handleInputChange = (e) => {
    if (e.target.name === "dateOfBirth") {
      let dob = e.target.value
        .split("-")
        .reverse()
        .reduce((acc, char) => `${acc}-${char}`);
      setData({ ...data, dateOfBirth: dob });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  // --------------- Save Btn function -----------------
  const handleSaveBtn = () => {
    // console.log(data);
    // console.log(userData);
    setValidationMessage("");
    if (data.username === userData.username && data.email === userData.email) {
      let newData = { ...data };
      delete newData.username;
      delete newData.email;
      updateUserData(newData);
    } else if (data.username === userData.username) {
      let newData = { ...data };
      delete newData.username;
      updateUserData(newData);
    } else if (data.email === userData.email) {
      let newData = { ...data };
      delete newData.email;
      updateUserData(newData);
    } else {
      updateUserData(data);
    }
  };

  // ------------- Get country details from json file ---------------
  const getCountryData = () => {
    // ---------------- countryData this is from countryStateDetails.json file -----------------
    setCountryDetails(countryData);

    // console.log(userData);
    const token = localStorage.getItem("notebookToken");
    const user = token ? jwtDecode(token) : null;
    if (userData._id === user._id) {
      // console.log("asdf", userData);
      let stateData = countryData.filter(
        (item, index) => item.country_name == userData.country
      );
      setData({ ...data, state: stateData[0].states });
      setData({ ...data, country: userData.country });

      setStateDetails(stateData[0].states);
    }
  };

  // ---------------- Country Select function -------------
  const handleCountrySelect = (e) => {
    let stateData = countryDetails.filter(
      (item, index) => item.country_name == e.target.value
    );

    setData({ ...data, state: stateData[0].states });
    setData({ ...data, country: e.target.value });

    setStateDetails(stateData[0].states);
  };
  // --------------- State Select function ----------------
  const handleStateSelect = (e) => {
    setData({ ...data, state: e.target.value });
  };

  // ----------------- get user data from api call ----------------
  const handleApiCalling = async () => {
    try {
      const token = localStorage.getItem("notebookToken");
      const user = token ? jwtDecode(token) : null;
      setLoading(true);
      const response = await axios.get(
        `${apiRoutes.userprofileURI}/${user._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLoading(false);
      dispatch(getData(response.data.data));
      setData(response.data.data);
    } catch (error) {
      console.log("err", error);
    }
  };

  // ==================== Update user data ====================
  const updateUserData = async (updateData) => {
    try {
      const token = localStorage.getItem("notebookToken");
      setLoading(true);
      const response = await axios.put(
        `${apiRoutes.updateUserProfileURI}/${data._id}`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLoading(false);
      dispatch(getData(response.data.data));
      setData(response.data.data);
      toast.success("Profile Update Successfully", {
        position: "top-center",
      });
    } catch (error) {
      setLoading(false);
      // console.log(error.response.data.message);
      setValidationMessage(error.response.data.message);
    }
  };

  // ================== useEffect ======================
  useEffect(() => {
    handleApiCalling();
    getCountryData();
  }, []);
  return (
    <>
      {loading ? <Loading /> : ""}
      <div
        className={`w-full md:h-screen lg:h-screen background_color flex justify-center items-center  box-border pt-10`}
      >
        <div
          className={`w-10/12 md:w-8/10 lg:w-6/12 flex flex-col justify-center items-center py-8 background_gradient_color rounded-lg shadow-lg`}
        >
          <div className="">
            <h1 className="flex items-center gap-x-1 text-2xl font-bold text-green-700">
              <RiEdit2Fill /> Edit Profile
            </h1>
          </div>
          <hr className="my-3 border border-green-700 w-10/12" />
          <form
            action=""
            className="w-10/12 md:w-11/12 lg:w-10/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 "
            onSubmit={(e) => e.preventDefault()}
          >
            {/* ================= Name ============== */}
            <div className={`flex flex-col text-green-900`}>
              <label
                htmlFor=""
                className="flex items-center gap-x-2 mb-2 font-bold"
              >
                <FaUserAlt />
                <span>Name :</span>
              </label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleInputChange}
                className={`w-full md:w-10/12 lg:w-10/12 py-1.5 md:py-1 px-2  border outline-none border-green-700 rounded-md focus:border-2 focus:border-green-700`}
              />
              {/* {nameValidation ? ( */}
              <span className="text-red-500 mt-1">
                {/* *Name must be at least 2 character */}
                {validationMessage === "name must be at least 2 characters"
                  ? validationMessage
                  : validationMessage ===
                    "name must be at maximum 20 characters"
                  ? validationMessage
                  : ""}
              </span>
              {/* ) : null} */}
            </div>
            {/* ================= Username ============== */}
            <div className={`flex flex-col text-green-900 `}>
              <label
                htmlFor=""
                className="flex items-center gap-x-2 mb-2 font-bold"
              >
                <FaUserAlt />
                <span>Username :</span>
              </label>
              <input
                type="text"
                name="username"
                value={data.username}
                onChange={handleInputChange}
                className={`w-full md:w-10/12 lg:w-10/12 py-1.5 md:py-1 px-2 border outline-none border-green-700 rounded-md focus:border-2 focus:border-green-700`}
              />
              {/* {true ? ( */}
              <span className="text-red-500 mt-1">
                {/* *username must be character */}
                {validationMessage === "username must be at least 2 characters"
                  ? validationMessage
                  : validationMessage === "username already exist"
                  ? validationMessage
                  : validationMessage ===
                    "username must be at maximum 20 characters"
                  ? validationMessage
                  : ""}
              </span>
              {/* ) : null} */}
            </div>
            {/* =================== Email ================= */}
            <div className={`flex flex-col text-green-900`}>
              <label
                htmlFor=""
                className="flex items-center gap-x-2 mb-2 font-bold"
              >
                <IoMdMail />
                <span>Email :</span>
              </label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleInputChange}
                className={`w-full md:w-10/12 lg:w-10/12 py-1.5 md:py-1 px-2 border outline-none border-green-700 rounded-md focus:border-2 focus:border-green-700`}
              />
              {/* {true ? ( */}
              <span className="text-red-500 mt-1">
                {/* *Enter valid Email */}
                {validationMessage === "Invalid email address"
                  ? validationMessage
                  : validationMessage === "email already exist"
                  ? validationMessage
                  : ""}
              </span>
              {/* ) : null} */}
            </div>
            {/* =================== Phone Number ================= */}
            <div className={`flex flex-col text-green-900`}>
              <label
                htmlFor=""
                className="flex items-center gap-x-2 mb-2 font-bold"
              >
                <FaPhoneAlt />
                <span>Phone Number :</span>
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={data.phoneNumber}
                onChange={handleInputChange}
                className={`w-full md:w-10/12 lg:w-10/12 py-1.5 md:py-1 px-2 border outline-none border-green-700 rounded-md focus:border-2 focus:border-green-700`}
              />
              {/* {true ? ( */}
              <span className="text-red-500 mt-1">
                {/* *Phone number 10 numbers */}
                {validationMessage === "phone number must be at least 6 numbers"
                  ? validationMessage
                  : validationMessage === "phone number max 12 numbers"
                  ? validationMessage
                  : ""}
              </span>
              {/* ) : null} */}
            </div>
            {/* =================== Gender ================= */}
            <div className={`w-full  flex flex-col text-green-900`}>
              <label
                htmlFor=""
                className="flex items-center gap-x-2 mb-2 font-bold"
              >
                {/* <PiGenderIntersexBold /> */}
                <span className="flex">
                  {/* <IoFemale /> <IoMaleSharp /> */}
                  <BiMaleFemale />
                </span>

                <span>Gender :</span>
              </label>
              <div className="flex flex-col  md:flex-row gap-x-4 gap-y-3 md:gap-y-0 text-green-900 font-semibold text-sm md:text-base">
                <div className="flex items-center gap-x-2">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    // defaultChecked={
                    //   getData.gender
                    //     ? getData.gender === "male"
                    //       ? true
                    //       : false
                    //     : null
                    // }
                    // defaultChecked={data.gender === "male"}
                    checked={data.gender == "male"}
                    className="w-5 h-5"
                    onChange={handleInputChange}
                  />
                  <label htmlFor="male" className="flex items-center gap-x-1">
                    Male
                    <IoMaleSharp />
                  </label>
                </div>
                <div className="flex items-center gap-x-2">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    // defaultChecked={data.gender === "female" ? true : false}
                    checked={data.gender == "female"}
                    className="w-5 h-5"
                    onChange={handleInputChange}
                  />
                  <label htmlFor="female" className="flex items-center gap-x-1">
                    Female
                    <IoFemale />
                  </label>
                </div>
                <div className="flex items-center gap-x-2">
                  <input
                    type="radio"
                    id="other"
                    name="gender"
                    value="other"
                    checked={data.gender == "other"}
                    className="w-5 h-5 "
                    onChange={handleInputChange}
                  />
                  <label htmlFor="other" className="flex items-center gap-x-1">
                    Other
                    {/* <FaTransgenderAlt /> */}
                  </label>
                </div>
              </div>

              {false ? (
                <span className="text-red-500 mt-1">*Enter your gender</span>
              ) : null}
            </div>
            {/* =================== Date of Birth ================= */}
            <div className={`flex flex-col text-green-900`}>
              <label
                htmlFor=""
                className="flex items-center gap-x-2 mb-2 font-bold"
              >
                <FaCalendarAlt />
                <span>Date of Birth :</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={`${
                  data.dateOfBirth
                    ? data.dateOfBirth
                        .split("-")
                        .reverse()
                        .reduce((acc, char) => `${acc}-${char}`)
                    : ""
                }`}
                onChange={handleInputChange}
                className={`w-full md:w-10/12 lg:w-10/12 py-1.5 md:py-1 px-2 border outline-none border-green-700 rounded-md focus:border-2 focus:border-green-700`}
              />
              {false ? (
                <span className="text-red-500 mt-1">*Enter Date of Birth</span>
              ) : null}
            </div>
            {/* =================== Country ================= */}
            <div className={`flex flex-col text-green-900`}>
              <label
                htmlFor=""
                className="flex items-center gap-x-2 mb-2 font-bold"
              >
                <FaGlobe />
                <span>Country :</span>
              </label>

              <select
                name="country"
                id="country"
                defaultChecked={data.country || ""}
                value={data.country || ""}
                // onChange={handleCountrySelect}
                // value={countryName}
                onChange={handleCountrySelect}
                className={`w-full md:w-10/12 lg:w-10/12 py-2 md:py-2 px-2 border outline-none border-green-700 rounded-md focus:border-2 focus:border-green-700`}
              >
                {/* <option value="default">Default</option> */}
                {countryDetails.map((item, index) => (
                  <option
                    value={item.country_name}
                    key={index}
                    // selected={item.country_name == "India" ? true : false}
                  >
                    {item.country_name}
                  </option>
                ))}
              </select>
              {false ? (
                <span className="text-red-500 mt-1">*Enter Date of Birth</span>
              ) : null}
            </div>
            {/* =================== State ================= */}
            <div className={`flex flex-col text-green-900`}>
              <label
                htmlFor=""
                className="flex items-center gap-x-2 mb-2 font-bold"
              >
                <FaLocationDot />
                <span>State :</span>
              </label>

              <select
                name="state"
                id="state"
                defaultChecked={data.state || ""}
                value={data.state || ""}
                // value={stateName}
                className={`w-full md:w-10/12 lg:w-10/12 py-2 px-2 border outline-none border-green-700 rounded-md focus:border-2 focus:border-green-700`}
                onChange={handleStateSelect}
                // onChange={handleInputChange}
                // value={"India"}
              >
                {stateDetails.map((item, index) => (
                  <option value={item.state_name} key={index}>
                    {item.state_name}
                  </option>
                ))}
              </select>
              {false ? (
                <span className="text-red-500 mt-1">*Enter Date of Birth</span>
              ) : null}
            </div>
            {/* ====================== Buttons ========================== */}
            <div className="w-full"></div>
            <div className="w-full flex justify-between md:justify-normal md:gap-x-5">
              <Link
                to="/user/profile"
                className=" bg-red-600 text-white p-2 px-6 rounded hover:bg-red-700"
              >
                Back
              </Link>
              <button
                className=" bg-green-600 text-white  p-2 px-6 rounded hover:bg-green-700"
                onClick={handleSaveBtn}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditProfile;
