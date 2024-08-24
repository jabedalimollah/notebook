import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdEditDocument } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { BsInfoSquareFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { FaGlobe } from "react-icons/fa";
import { GetUserData } from "@/utils/userApiCall";
import Loading from "@/components/Loading/Loading";
// import { useSelector } from "react-redux";
const SidebarMenu = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const menuBtn = useSelector((state) => state.menu.value);

  const userDataCalling = async () => {
    setLoading(true);
    let data = await GetUserData();
    setLoading(false);
    setUserData(data);
  };
  useEffect(() => {
    userDataCalling();
  }, []);
  return (
    <>
      {loading ? <Loading /> : ""}
      <div
        className={`hidden lg:inline-block w-2/12 h-full shadow-2xl background_gradient_color `}
      >
        <div className="w-full h-full flex flex-col justify-start gap-y-5 items-center ">
          <div className="w-full flex flex-col  items-center ">
            <div className="w-6/12 flex mt-8">
              <Link to="/user/profile" className="w-full rounded-full">
                <img
                  src={userData.profilePic}
                  // src="/Images/Profile_Pictures/profile2.jpg"
                  alt={userData.profilePic}
                  className="w-full rounded-full "
                />
              </Link>
            </div>
            <div className="mt-4 mb-4 flex flex-col items-center">
              <Link
                to="/user/profile"
                className="text-green-700 font-bold text-xl"
              >
                {/* Jabed Ali Mollah */}
                {userData.name}
              </Link>

              <Link
                to="/user/profile"
                className="text-gray-600 font-bold text-base"
              >
                Profile
              </Link>
            </div>
          </div>

          <div className="w-8/12 flex ">
            {/* <Link
              to="/user/notes"
              className="w-full text-base font-bold py-1 px-3 rounded bg-green-600 text-white flex items-center gap-x-2"
            >
              <MdEditDocument />
              Notes
            </Link> */}
            <NavLink
              to="/user/notes"
              className={`w-full text-base font-bold py-1 px-3 text-green-800 hover:bg-green-600 hover:text-white rounded  flex items-center gap-x-2 `}
            >
              <MdEditDocument />
              Notes
            </NavLink>
          </div>
          <div className="w-8/12 flex ">
            <NavLink
              to="/user/todo_list"
              className={`w-full text-base font-bold py-1 px-3 rounded text-green-800 hover:bg-green-600 hover:text-white flex items-center gap-x-2 `}
            >
              <FaList />
              Todo List
            </NavLink>
          </div>
          <div className="w-8/12 flex ">
            <NavLink
              to="/about"
              className="w-full text-base font-bold py-1 px-3 rounded text-green-800 hover:bg-green-600 hover:text-white flex items-center gap-x-2 "
            >
              <BsInfoSquareFill />
              About
            </NavLink>
          </div>
          <div className="w-8/12 flex ">
            <NavLink
              to="/contact_us"
              className="w-full text-base font-bold py-1 px-3 rounded text-green-800 hover:bg-green-600 hover:text-white flex items-center gap-x-2 "
            >
              <IoMdMail />
              Contact Us
            </NavLink>
          </div>
          <div className="w-8/12 flex ">
            <NavLink
              to="/user/settings"
              className="w-full text-base font-bold py-1 px-3 rounded text-green-800 hover:bg-green-600 hover:text-white flex items-center gap-x-2 "
            >
              <IoSettingsSharp />
              Settings
            </NavLink>
          </div>
          <div className="w-full flex flex-col gap-y-2 items-center mt-6 ">
            <hr className="border border-green-700 mb-3 w-full" />
            <div className="text-xl text-green-700 font-bold">Follow Me</div>
            <div className="w-8/12 flex justify-center gap-x-2 text-2xl text-green-900 ">
              <a
                href="https://in.linkedin.com/in/jabedalimollah"
                target="_blank"
              >
                <FaLinkedin />
              </a>
              <a href="https://github.com/jabedalimollah" target="_blank">
                <FaGithub />
              </a>
              <a href="https://x.com/JabedAliMollah7" target="_blank">
                <BsTwitterX />
              </a>
              <a href="https://jabedalimollah.netlify.app/" target="_blank">
                <FaGlobe />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;

{
  /* ================================================================= */
}
{
  /* <div
  className={`${
    menuBtn ? "inline-block" : "hidden"
  }  lg:hidden w-full md:w-4/12 h-full shadow-2xl background_gradient_color z-20  fixed left-0`}
>
  <div className="w-full h-full flex flex-col justify-start gap-y-3 md:gap-y-5 items-center ">
    <div className="w-full flex flex-col  items-center ">
      <div className="w-4/12 md:w-6/12 flex mt-8">
        <Link to="/user/profile" className="w-full rounded-full">
          <img
            src={userData.profilePic}
           
            alt={userData.profilePic}
            className="w-full rounded-full "
          />
        </Link>
      </div>
      <div className="mt-3 md:mt-4 mb-1 md:mb-4 flex flex-col items-center">
        <Link to="/user/profile" className="text-green-700 font-bold text-xl">
       
          {userData.name}
        </Link>

        <Link to="/user/profile" className="text-gray-600 font-bold text-base">
          Profile
        </Link>
      </div>
    </div>

    <div className="w-8/12 flex ">
   
      <NavLink
        to="/user/notes"
        className={`w-full text-base font-bold py-1 px-3 text-green-800 hover:bg-green-600 hover:text-white rounded  flex items-center gap-x-2 `}
      >
        <MdEditDocument />
        Notes
      </NavLink>
    </div>
    <div className="w-8/12 flex ">
      <NavLink
        to="/user/todo_list"
        className={`w-full text-base font-bold py-1 px-3 rounded text-green-800 hover:bg-green-600 hover:text-white flex items-center gap-x-2 `}
      >
        <FaList />
        Todo List
      </NavLink>
    </div>
    <div className="w-8/12 flex ">
      <NavLink
        to="/about"
        className="w-full text-base font-bold py-1 px-3 rounded text-green-800 hover:bg-green-600 hover:text-white flex items-center gap-x-2 "
      >
        <BsInfoSquareFill />
        About
      </NavLink>
    </div>
    <div className="w-8/12 flex ">
      <NavLink
        to="/contact_us"
        className="w-full text-base font-bold py-1 px-3 rounded text-green-800 hover:bg-green-600 hover:text-white flex items-center gap-x-2 "
      >
        <IoMdMail />
        Contact Us
      </NavLink>
    </div>
    <div className="w-8/12 flex ">
      <NavLink
        to="/user/settings"
        className="w-full text-base font-bold py-1 px-3 rounded text-green-800 hover:bg-green-600 hover:text-white flex items-center gap-x-2 "
      >
        <IoSettingsSharp />
        Settings
      </NavLink>
    </div>
    <div className="w-full flex flex-col gap-y-2 items-center mt-6 ">
      <hr className="border border-green-700 mb-3 w-full" />
      <div className="text-xl text-green-700 font-bold">Follow Me</div>
      <div className="w-8/12 flex justify-center gap-x-2 text-2xl text-green-900 ">
        <a href="https://in.linkedin.com/in/jabedalimollah" target="_blank">
          <FaLinkedin />
        </a>
        <a href="https://github.com/jabedalimollah" target="_blank">
          <FaGithub />
        </a>
        <a href="https://x.com/JabedAliMollah7" target="_blank">
          <BsTwitterX />
        </a>
        <a href="https://jabedalimollah.netlify.app/" target="_blank">
          <FaGlobe />
        </a>
      </div>
    </div>
  </div>
</div>; */
}
