import React, { useEffect, useState } from "react";
import styles from "../../styles/navbar/navbar.module.css";
import logo from "/notebook.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "@/features/menu/menuSlice";
import { IoMdClose } from "react-icons/io";
import { Link, NavLink, Router } from "react-router-dom";
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
let token = localStorage.getItem("notebookToken");
const Navbar = () => {
  const [auth, setAuth] = useState(null);

  const [userData, setUserData] = useState([]);
  const menuBtn = useSelector((state) => state.menu.value);
  const dispatch = useDispatch();

  const userDataCalling = async () => {
    let data = token ? await GetUserData() : [];

    setUserData(data);
  };

  useEffect(() => {
    userDataCalling();
    if (token) {
      setAuth(token);
    }
  }, []);

  return (
    <>
      <div className={`${styles.main}`}>
        <header className={`${styles.header} flex justify-between`}>
          <div className={`${styles.logo_box}`}>
            <img src={logo} alt="logo" className={`${styles.logo}`} />
          </div>
          <button
            className="flex lg:hidden items-center pr-5"
            onClick={() => dispatch(menuToggle())}
          >
            {menuBtn ? <IoMdClose /> : <RxHamburgerMenu />}
          </button>
        </header>
        {/* </div> */}
        {/* ================================================================= */}
        <div
          className={`${
            menuBtn ? "inline-block" : "hidden"
          }  lg:hidden w-full md:w-4/12 h-full shadow-2xl background_gradient_color z-20  fixed left-0`}
        >
          <div className="w-full h-full flex flex-col justify-start gap-y-3 md:gap-y-5 items-center ">
            {auth ? (
              <>
                <div className="w-full flex flex-col  items-center ">
                  <div className="w-4/12 md:w-6/12 flex mt-8">
                    <Link to="/user/profile" className="w-full rounded-full">
                      <img
                        src={userData.profilePic || "#"}
                        alt={userData.profilePic || "#"}
                        className="w-full rounded-full "
                      />
                    </Link>
                  </div>
                  <div className="mt-3 md:mt-4 mb-1 md:mb-4 flex flex-col items-center">
                    <Link
                      to="/user/profile"
                      className="text-green-700 font-bold text-xl"
                      onClick={() => dispatch(menuToggle())}
                    >
                      {userData.name}
                    </Link>

                    <Link
                      to="/user/profile"
                      className="text-gray-600 font-bold text-base"
                      onClick={() => dispatch(menuToggle())}
                    >
                      Profile
                    </Link>
                  </div>
                </div>

                <div className="w-8/12 flex ">
                  <NavLink
                    to="/user/notes"
                    className={`w-full text-base font-bold py-1 px-3 text-green-800 hover:bg-green-600 hover:text-white rounded  flex items-center gap-x-2 `}
                    onClick={() => dispatch(menuToggle())}
                  >
                    <MdEditDocument />
                    Notes
                  </NavLink>
                </div>
                <div className="w-8/12 flex ">
                  <NavLink
                    to="/user/todo_list"
                    className={`w-full text-base font-bold py-1 px-3 rounded text-green-800 hover:bg-green-600 hover:text-white flex items-center gap-x-2 `}
                    onClick={() => dispatch(menuToggle())}
                  >
                    <FaList />
                    Todo List
                  </NavLink>
                </div>
                <div className="w-8/12 flex ">
                  <NavLink
                    to="/about"
                    className="w-full text-base font-bold py-1 px-3 rounded text-green-800 hover:bg-green-600 hover:text-white flex items-center gap-x-2 "
                    onClick={() => dispatch(menuToggle())}
                  >
                    <BsInfoSquareFill />
                    About
                  </NavLink>
                </div>
                <div className="w-8/12 flex ">
                  <NavLink
                    to="/contact_us"
                    className="w-full text-base font-bold py-1 px-3 rounded text-green-800 hover:bg-green-600 hover:text-white flex items-center gap-x-2 "
                    onClick={() => dispatch(menuToggle())}
                  >
                    <IoMdMail />
                    Contact Us
                  </NavLink>
                </div>
                <div className="w-8/12 flex ">
                  <NavLink
                    to="/user/settings"
                    className="w-full text-base font-bold py-1 px-3 rounded text-green-800 hover:bg-green-600 hover:text-white flex items-center gap-x-2 "
                    onClick={() => dispatch(menuToggle())}
                  >
                    <IoSettingsSharp />
                    Settings
                  </NavLink>
                </div>
              </>
            ) : (
              <>
                <div className="w-full pt-12 flex flex-col justify-center gap-y-3 md:gap-y-5 items-center ">
                  <div className="w-8/12 flex ">
                    <NavLink
                      to="/user/signup"
                      className={`w-full text-base font-bold py-1 px-3 rounded text-green-800 hover:bg-green-600 hover:text-white flex items-center gap-x-2 justify-center `}
                      onClick={() => dispatch(menuToggle())}
                    >
                      {/* <FaList /> */}
                      Sign Up
                    </NavLink>
                  </div>
                  <div className="w-8/12 flex ">
                    <NavLink
                      to="/user/login"
                      className={`w-full text-base font-bold py-1 px-3 rounded text-green-800 hover:bg-green-600 hover:text-white flex items-center justify-center gap-x-2 `}
                      onClick={() => dispatch(menuToggle())}
                    >
                      {/* <FaList /> */}
                      Log in
                    </NavLink>
                  </div>
                </div>
              </>
            )}
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
      </div>
    </>
  );
};

export default Navbar;
