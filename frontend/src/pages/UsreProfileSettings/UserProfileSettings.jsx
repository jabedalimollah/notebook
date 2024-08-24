import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { RiDeleteBinFill } from "react-icons/ri";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { GiPadlock } from "react-icons/gi";
import { AiFillLock } from "react-icons/ai";
import { apiRoutes } from "@/utils/apiRoutes";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loading from "@/components/Loading/Loading";
const UserProfileSettings = () => {
  const [backBtn, setBackBtn] = useState(false);
  const handleBackBtn = () => {
    setBackBtn(!backBtn);
  };

  return (
    <>
      <div
        className={`w-full h-screen md:h-screen lg:h-screen background_color flex items-start md:items-center justify-center `}
      >
        <div
          className={`w-11/12 md:w-10/12 lg:w-6/12 flex flex-col items-center py-5 justify-center rounded-lg background_gradient_color box_shadow mt-11 md:mt-0 lg:mt-0`}
        >
          {/* ======================== Back Button =================== */}
          <div className=" self-start ml-6">
            <Link
              to="/user/profile"
              className="flex items-center justify-center gap-x-1 font-bold text-green-700"
            >
              <IoMdArrowBack />
              Back
            </Link>
          </div>
          <h1 className="text-xl md:text-4xl lg:text-4xl mb-4 font-bold text-green-700">
            Settings
          </h1>

          <div className="mt-3">
            <NavLink
              to="/user/forgot_password"
              className={
                "font-bold text-gray-600 borders border-gray-600 rounded-md hover:bg-gray-600 hover:text-white py-2 px-3"
              }
            >
              Reset Password
            </NavLink>
          </div>

          {/* =========================== Delete Button  =========================== */}
          <div className=" flex flex-col items-center gap-y-4 w-11/12 md:w-8/12 lg:w-8/12 p-4 rounded-md">
            <hr className="w-full border border-green-800" />
            <h1 className="text-base md:text-xl lg:text-xl font-bold text-green-800 flex items-center gap-x-1 ">
              <RiDeleteBin7Fill /> Delete Your Notebook Account
            </h1>
            {/* <hr className="w-full border border-green-800" /> */}
            <button
              className=" py-2 px-3 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800 flex items-center gap-x-1"
              onClick={() => handleBackBtn()}
            >
              <RiDeleteBinFill /> Permanently Delete Account
            </button>
          </div>
        </div>
      </div>
      {/* ======================= Delete Btn Component ============= */}
      {backBtn ? <DeleteBtnComponent handleBackBtn={handleBackBtn} /> : ""}
    </>
  );
};

// ==================== Create Delete Btn Component ===================
const DeleteBtnComponent = ({ handleBackBtn }) => {
  const [passwordShowBtn, setPasswordShowBtn] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleApiCalling = async () => {
    try {
      // console.log("pass", password);
      const token = localStorage.getItem("notebookToken");
      const user = token ? jwtDecode(token) : null;
      setLoading(true);
      const response = await axios.delete(
        `${apiRoutes.deleteUserProfileURI}/${user._id}`,

        {
          headers: { Authorization: `Bearer ${token}` },
          data: {
            password: password,
          },
        }
      );
      setLoading(false);
      // console.log("res", response.data.statusInfo);
      if (response.data.statusInfo === "success") {
        setPasswordValidationMessage("");
        localStorage.removeItem("notebookToken");
        window.location.reload();
        navigate("/user/login");
      }
    } catch (error) {
      setLoading(false);
      // console.log("err", error.response.data.message);
      setPasswordValidationMessage(error.response.data.message);
    }
  };

  const handleDeleteBtn = () => {
    handleApiCalling();
    // console.log(password);
  };
  return (
    <>
      {loading ? <Loading /> : ""}
      <div className="w-full h-dvh background_color z-10 fixed top-0 left-0 flex justify-center items-center">
        <div
          className={`w-10/12 md:w-10/12 lg:w-4/12 flex flex-col items-center py-5 md:py-10 lg:py-5 justify-center rounded-lg background_gradient_color box_shadow `}
        >
          <h1 className="text-xl font-black text-red-800 mb-4">
            Delete Your Account
          </h1>
          <form
            action=""
            className="w-10/12 md:w-7/12 lg:w-7/12 flex flex-col gap-y-1"
            onSubmit={(e) => e.preventDefault()}
          >
            <label
              htmlFor=""
              className="font-bold text-green-800 flex items-center gap-x-1"
            >
              {/* <GiPadlock /> */}
              <AiFillLock />
              Password
            </label>
            <div className="border border-black rounded-md bg-white flex p-0.5">
              <input
                type={passwordShowBtn ? "text" : "password"}
                className="outline-none w-11/12 p-1"
                onChange={handlePasswordInput}
              />
              <button
                onClick={() => setPasswordShowBtn(!passwordShowBtn)}
                className="text-gray-500"
              >
                {passwordShowBtn ? <IoMdEye /> : <IoMdEyeOff />}
              </button>
            </div>

            <span className="text-red-800 mb-4">
              {passwordValidationMessage === "please enter password correctly"
                ? "*Incorrect Password"
                : passwordValidationMessage === "wrong password"
                ? "*Incorrect Password"
                : ""}
            </span>
            <button
              className=" py-2 rounded-lg bg-blue-500 hover:bg-blue-700 text-white mb-2"
              onClick={() => handleBackBtn()}
            >
              Back
            </button>
            <button
              className=" py-2 rounded-lg bg-red-500 hover:bg-red-700 text-white"
              onClick={handleDeleteBtn}
            >
              Delete Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default UserProfileSettings;
