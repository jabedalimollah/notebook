import SidebarMenu from "@/common/SidebarMenu/SidebarMenu";
import React, { useEffect, useState } from "react";
import { SiGmail } from "react-icons/si";
import { FaGlobe } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { RiMessage2Fill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { GetUserData } from "@/utils/userApiCall";

const ContactUs = () => {
  const [data, setData] = useState({});
  const [date, setDate] = useState(null);
  const getApiData = async () => {
    let tempData = await GetUserData();

    setData(tempData);
  };
  const getCurrentYear = () => {
    let year = new Date();

    setDate(year.getFullYear());
  };
  useEffect(() => {
    getApiData();
    getCurrentYear();
  }, []);
  return (
    <>
      <div className="w-full  flex flex-col box-border">
        <div className="w-full h-auto lg:h-screen pt-10 flex ">
          <SidebarMenu />
          <div className="w-full flex flex-col justify-center pt-6 overflow-auto">
            <div className="w-full flex flex-col lg:flex-row justify-center items-center">
              <div className="w-10/12 lg:w-6/12 p-1 md:p-6">
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold text-green-700">
                    Contact Us
                  </h1>
                  <hr className="border border-green-600 w-full" />
                  <div className="my-6 w-full  flex flex-col gap-y-4 md:gap-y-0 md:flex-row justify-around">
                    <a
                      href="mailto:jabedalimollah7@gmail.com"
                      className=" shadow-md  border border-green-600 hover:bg-green-700 text-sm hover:text-white text-green-600 py-2 px-2 flex items-center gap-x-2 rounded"
                    >
                      <SiGmail />
                      <span>jabedalimollah7@gmail.com</span>
                    </a>

                    <a
                      href="https://jabedalimollah.netlify.app/"
                      target="_blank"
                      className=" shadow-md  border border-green-600 hover:bg-green-700 text-sm hover:text-white text-green-600 py-2 px-2 flex items-center gap-x-2 rounded"
                    >
                      <FaGlobe /> <span> jabedalimollah.netlify.app</span>
                    </a>
                  </div>
                  <form
                    action={`${import.meta.env.VITE_APP_CONTACT_URL}`}
                    method="POST"
                    className="w-full flex gap-y-3 flex-col border border-green-700 rounded-md shadow-md background_gradient_color p-5"
                  >
                    <div className="flex flex-col w-full gap-y-1">
                      <label
                        htmlFor=""
                        className="text-green-700 flex items-center gap-x-1.5  font-bold text-base"
                      >
                        <FaUserAlt /> Name:
                      </label>{" "}
                      <input
                        type="text"
                        name="name"
                        defaultValue={data.name}
                        required
                        // disabled={data.name}
                        placeholder="Enter your name"
                        className="border border-green-700 outline-none py-2 px-3 rounded  text-green-700"
                      />
                    </div>
                    <div className="flex flex-col w-full gap-y-1">
                      <label
                        htmlFor=""
                        className="text-green-700 flex items-center gap-x-1.5  font-bold text-base"
                      >
                        <IoIosMail /> Email:
                      </label>{" "}
                      <input
                        type="email"
                        name="email"
                        defaultValue={data.email}
                        // disabled={data.email}
                        required
                        placeholder="Enter your Email"
                        className="border border-green-700 outline-none py-2 px-3 rounded  text-green-700"
                      />
                    </div>
                    <div className="flex flex-col w-full gap-y-1">
                      <label
                        htmlFor=""
                        className="text-green-700 flex items-center gap-x-1.5  font-bold text-base"
                      >
                        <RiMessage2Fill /> Message:
                      </label>{" "}
                      <textarea
                        name="message"
                        id="message"
                        placeholder="Enter your message"
                        className="border border-green-700 outline-none py-2 px-3 rounded  text-green-700"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 px-3 bg-green-700 text-white rounded hover:bg-green-800 flex items-center justify-center gap-x-2"
                    >
                      <IoSend /> Send Message
                    </button>
                  </form>
                </div>
              </div>
              <div className="w-8/12 lg:w-4/12 flex justify-center items-center mt-4 md:mt-0 mb-6 lg:mb-0">
                <div className="w-full">
                  <img
                    src="https://cdn.pixabay.com/photo/2022/03/01/08/11/call-center-7040784_960_720.png"
                    // style={{ filter: "hue-rotate(144deg)" }}
                    style={{ filter: "hue-rotate(246deg)" }}
                    // 144deg
                    // src="https://cdn.pixabay.com/photo/2017/03/23/09/41/network-2167871_1280.jpg"
                    // src="https://cdn.pixabay.com/photo/2017/03/23/09/37/network-2167850_1280.jpg"
                    // src="https://cdn.pixabay.com/photo/2024/02/28/15/47/call-8602325_1280.png"
                    // src="https://cdn.pixabay.com/photo/2024/07/14/07/46/customer-service-8893905_1280.png"
                    alt="contact_us"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center bg-green-100 text-green-900">
              <div className="py-4 w-full flex flex-col items-center">
                <div className="my-3 flex gap-x-4">
                  <a
                    href="https://in.linkedin.com/in/jabedalimollah"
                    target="_blank"
                    className="border-2 border-green-800 p-2 rounded-full hover:bg-green-800 hover:text-white"
                  >
                    {" "}
                    <FaLinkedin />
                  </a>
                  <a
                    href="https://github.com/jabedalimollah"
                    target="_blank"
                    className="border-2 border-green-800 p-2 rounded-full hover:bg-green-800 hover:text-white"
                  >
                    <FaGithub />{" "}
                  </a>
                  <a
                    href="https://x.com/JabedAliMollah7"
                    target="_blank"
                    className="border-2 border-green-800 p-2 rounded-full hover:bg-green-800 hover:text-white"
                  >
                    <BsTwitterX />
                  </a>
                </div>
                <div className="flex gap-x-3">
                  <NavLink to={"/user/notes"}>Notes</NavLink>
                  <NavLink to={"/user/todo_list"}>Todo List</NavLink>
                  <NavLink to={"/user/profile"}>Profile</NavLink>
                  <NavLink to={"/about"}>About</NavLink>
                  {/* <NavLink to={"/contact_us"}>Contact Us</NavLink> */}
                </div>
              </div>
              <div className="py-3 bg-green-300  w-full text-center font-bold text-xs md:text-base">
                Copyright © {date}, Notebook. All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
