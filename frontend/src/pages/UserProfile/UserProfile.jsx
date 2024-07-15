import React from "react";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import profile from "/profile.jpg";
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

const UserProfile = () => {
  return (
    <>
      {/* ======================== Back Button ==================== */}
      <div className={`w-full h-screen background_color `}>
        <div className={` ml-12 pt-10`}>
          <Link
            to="/"
            className={`text-emerald-950 font-medium flex items-center text-base`}
          >
            <IoMdArrowBack className={`mr-2`} /> Back To Home
          </Link>
        </div>

        <div className={`w-full flex justify-center items-center`}>
          {/* ========================= Profile Box =========================== */}
          <div className={`w-7/12 flex  rounded-lg box_color box_shadow`}>
            {/* ------------------ Profile Picture, Edit Profile, Settings and Logout Button ---------------- */}
            <div
              className={`w-4/12 gap-y-5 p-6 bg-white flex flex-col justify-center items-center `}
            >
              <div className={` w-full relative `}>
                <div className={`w-12/12`}>
                  <img src={profile} alt="" className={`w-fit rounded-full`} />
                </div>
                {/* <button
                  className={`box_color border border-black rounded-full p-2 absolute bottom-0 right-12`}
                >
                  <FaCamera className={`text-gray-700  text-2xl`} />
                </button> */}
                <button
                  className={`background_gradient_color p-2 borders border-black rounded-full font-bold absolute bottom-0 right-3`}
                >
                  <FaPlus className={`text-white text-2xl `} />
                </button>
              </div>
              <div className={`text-lg font-bold w-full`}>
                <Link
                  to="/user/edit_profile"
                  className={`flex items-center py-1 gap-x-1 border border-black hover:bg-black hover:text-white w-full justify-center rounded`}
                >
                  {/* <FaEdit /> */}
                  <RiEdit2Fill />
                  Edit Profile
                </Link>
              </div>
              <div className={`text-lg text-green-900 font-bold w-full`}>
                <Link
                  to="/user/settings"
                  className={`flex items-center py-1 gap-x-1 w-full justify-center border border-black rounded hover:bg-green-900 hover:text-white`}
                >
                  <IoSettingsSharp /> Settings
                </Link>
              </div>
              <div className={`text-lg w-full font-semibold`}>
                <button
                  className={`bg-red-500 py-1 rounded text-white w-full hover:bg-red-800`}
                >
                  Log out
                </button>
              </div>
            </div>
            {/* ------------------- Profile Details ----------------------- */}
            <div className={`w-full flex items-center flex-col p-6`}>
              {/* ----------------- Name and Username --------------- */}
              <div className={`w-8/12  text-center mt-8`}>
                <h2 className={`text-3xl font-bold text-gray-700 mb-4 `}>
                  Jabed Ali Mollah
                </h2>
                <span className={`text-green-800 font-bold text-2xl`}>
                  Profile
                </span>
              </div>
              <hr className={`w-10/12 my-3 border border-gray-500`} />
              {/* -------------- User Details ---------------- */}
              <div className={`w-full flex flex-col items-center`}>
                {/* <div className={`w-8/12 flex border border-black`}>
                  <span className={`mr-12`}>Username</span>
                  <span>@jabed</span>
                </div> */}
                <table className="w-9/12 ">
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
                  <tbody className={`leading-8`}>
                    <tr>
                      <td className={`font-bold flex items-center gap-x-1`}>
                        <FaUser />
                        Username
                      </td>
                      <td className={`font-bold text-gray-500`}>@jabed</td>
                    </tr>
                    <tr>
                      <td className={`font-bold flex items-center gap-x-1`}>
                        <MdEmail />
                        Email
                      </td>
                      <td className={`font-bold text-gray-500`}>
                        jabed@test.com
                      </td>
                    </tr>
                    <tr>
                      <td className={`font-bold flex items-center gap-x-1`}>
                        <MdLocalPhone />
                        Phone Number
                      </td>
                      <td className={`font-bold text-gray-500`}>6295965896</td>
                    </tr>
                    <tr>
                      <td className={`font-bold flex items-center gap-x-1`}>
                        <PiGenderIntersexBold />
                        Gender
                      </td>
                      <td className={`font-bold text-gray-500`}>Male</td>
                    </tr>
                    <tr>
                      <td className={`font-bold flex items-center gap-x-1`}>
                        {/* <IoCalendarNumber /> */}
                        <FaCalendarAlt />
                        Date Of Birth
                      </td>
                      <td className={`font-bold text-gray-500`}>08/10/2000</td>
                    </tr>
                    <tr>
                      <td className={`font-bold flex items-center gap-x-1`}>
                        <IoLocationSharp />
                        State
                      </td>
                      <td className={`font-bold text-gray-500`}>West Bengal</td>
                    </tr>
                    <tr>
                      <td className={`font-bold flex items-center gap-x-1`}>
                        <FaGlobe />
                        Conuntry
                      </td>
                      <td className={`font-bold text-gray-500`}>India</td>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
