import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosSave } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import { PostNotes } from "@/utils/notesApiCalling";
import { FaFileExport } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { IoReorderFourOutline } from "react-icons/io5";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import NotesLockBtn from "@/components/NotesLockBtn/NotesLockBtn";
// ============ JWT Token ===============
const token = localStorage.getItem("notebookToken");
const user = token ? jwtDecode(token) : null; // jwtDecode is for extract user id
const CreateNotes = () => {
  // ================== State Start ====================
  const [data, setData] = useState({
    title: "",
    text: "",
    author: "",
    isPasswordProtected: false,
    password: null,
  });
  const [currentDate, setCurrentDate] = useState({
    date: "",
    time: "",
  });

  const [optionBtn, setOptionBtn] = useState(false);
  const [lockBtn, setLockBtn] = useState(false);
  // ================= State End ========================
  const Navigate = useNavigate();

  // ================ handle Input Change ===================
  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // ============= handle Save Button =================
  const handleSaveBtn = () => {
    if (!(data.title === "")) {
      PostNotes(data);
      // console.log(data);
      Navigate("/user/notes");
    }
  };

  // ============== Date and Time =============
  const handleDateAndTime = () => {
    let currentdate = new Date();
    let date =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear();
    let time = currentdate.getHours() + ":" + currentdate.getMinutes();

    setCurrentDate({ date, time });
  };

  // ============ Lock Button ===============
  const handlelockBtn = () => {
    // console.log("handle lock");
    setLockBtn(!lockBtn);
    // setOptionBtn(false);
    setOptionBtn(!optionBtn);
  };

  // ============ Lock Password Details ===========
  const handleNotesPasswordReturn = (notesPassword) => {
    setData({
      ...data,
      isPasswordProtected: notesPassword.isPasswordProtected,
      password: notesPassword.password,
    });
    // console.log(notesPassword);
  };

  // =========== useEffect ===============
  useEffect(() => {
    handleDateAndTime();
    setData({ ...data, author: user._id });
  }, []);
  return (
    <>
      <div className="w-full  flex flex-col box-border">
        <div className="w-full h-screen pt-10 flex flex-col">
          <div className="w-full flex justify-between px-6 py-2  bg-green-50">
            {/* ================= Back Button ============ */}
            <NavLink to={"/user/notes"} className={`flex items-center gap-x-1`}>
              <IoMdArrowBack /> Back
            </NavLink>
            <div className="flex  gap-x-2 ">
              {/* ================ Save Button ========== */}
              <button
                onClick={handleSaveBtn}
                className={`bg-green-700 hover:bg-green-800 text-white  flex items-center gap-x-1 py-2 px-3 rounded-lg`}
              >
                <IoIosSave /> Save
              </button>
              {/* ================== Option Button ==================== */}
              {/* <button className="flex items-center px-2 border font-bold border-gray-800 text-gray-800 hover:bg-gray-600 hover:text-white py-2 rounded-lg">
                <BsThreeDotsVertical />
                Option
              </button> */}

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    onClick={() => setOptionBtn(true)}
                    // className="flex items-center px-2 border font-bold border-gray-800 text-gray-800 hover:bg-gray-600 hover:text-white py-2 rounded-lg"
                  >
                    <BsThreeDotsVertical />
                    Option
                  </Button>
                </PopoverTrigger>
                {optionBtn ? (
                  <PopoverContent className={`flex flex-col bg-green-100 `}>
                    {/* <div className="flex flex-col absolute top-24 right-12 bg-green-300 p-14 "> */}

                    <Button
                      variant="text"
                      className={`flex justify-start gap-x-2 hover:bg-green-700 hover:text-white`}
                    >
                      <FaFileExport /> Export
                    </Button>
                    <Button
                      onClick={handlelockBtn}
                      variant="text"
                      className={`flex justify-start gap-x-2  hover:bg-green-700 hover:text-white`}
                    >
                      <IoMdLock /> Lock
                    </Button>
                    <Button
                      variant="text"
                      className={`flex justify-start gap-x-2  hover:bg-green-700 hover:text-white`}
                    >
                      <IoReorderFourOutline /> Hide Line
                    </Button>
                    {/* </div> */}
                  </PopoverContent>
                ) : (
                  ""
                )}
              </Popover>
            </div>
          </div>
          {/* ===================== Title, Time And Notes Section ==================== */}
          <div className="w-full ">
            <div className="w-full flex justify-between ">
              {/* ==================== Title Section =================== */}
              <input
                type="text"
                name="title"
                onChange={handleInputChange}
                placeholder="Title : <Your Notes Title>"
                className={`border-b-2 border-green-500 srounded py-2 w-6/12 px-4 outline-none `}
              />
              {/* ================ Date and Time Section ================= */}
              <div className=" pr-6 text-gray-500 flex py-2 gap-x-2">
                <span>
                  {currentDate.date}
                  {/* 21/07/2024 */}
                </span>
                <span>
                  {/* {currentDate.time} */}
                  {/* 11:57 am */}
                </span>
              </div>
            </div>
          </div>
          {/* ======================== Notes Section ============================ */}
          <textarea
            name="text"
            id="text"
            onChange={handleInputChange}
            placeholder="Write Here ... "
            className={`w-full h-dvh px-4 py-1 border border-green-700 outline-none textContent`}
          ></textarea>
        </div>
      </div>

      {lockBtn ? (
        <NotesLockBtn
          handlelockBtn={handlelockBtn}
          handleNotesPasswordReturn={handleNotesPasswordReturn}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default CreateNotes;
