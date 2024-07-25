import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosSave } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import { PostNotes, FindNotes, UpdateNotesData } from "@/utils/notesApiCalling";
import { FaFileExport } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { IoReorderFourOutline } from "react-icons/io5";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import NotesLockBtn from "../NotesLockBtn/NotesLockBtn";
import { IoIosLock } from "react-icons/io";
import { LuEqualNot } from "react-icons/lu";

// ============ JWT Token ===============
const token = localStorage.getItem("notebookToken");
const user = token ? jwtDecode(token) : null; // jwtDecode is for extract user id
const CreateUpdateNotes = () => {
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
  const [passwordProtection, setPasswordProtection] = useState(false);
  const [lineHide, setLineHide] = useState(true);
  // ================= State End ========================
  const Navigate = useNavigate();

  //   ----------------- Get params Data ----------
  const { notes_id } = useParams(); // get params data [ notes id ]

  // ================ handle Input Change ===================
  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  //   =============== Find Notes Data ==================
  const findNotesData = async () => {
    let existNotes = await FindNotes(notes_id);

    // ----------------- This is for "dd"/"mm"/"yyyy" format -----------------------
    let updateDate = existNotes.updatedAt
      .split("T")[0]
      .split("-")
      .reverse()
      .reduce((acc, char) => `${acc}-${char}`);

    //   -------------- This is for "hh":"mm":"ss" format -------------------
    let updateTime = existNotes.updatedAt.split("T")[1].split(".")[0];
    setData(existNotes);
    setPasswordProtection(existNotes.isPasswordProtected);
    // setData({ title: existNotes.title, text: existNotes.text });
    setCurrentDate({ date: updateDate, time: updateTime });
    // console.log(existNotes.updatedAt.split("T")[1].split(".")[0]);
  };

  // ============= handle Save Button =================
  const handleSaveBtn = async () => {
    if (notes_id) {
      if (!(data.title === "")) {
        let newData = await UpdateNotesData(notes_id, data);
        setData({ title: newData.title, text: newData.text });
        let updateDate = newData.updatedAt
          .split("T")[0]
          .split("-")
          .reverse()
          .reduce((acc, char) => `${acc}-${char}`);
        let updateTime = newData.updatedAt.split("T")[1].split(".")[0];
        setCurrentDate({ date: updateDate, time: updateTime });
        Navigate("/user/notes");
      }
    } else {
      if (!(data.title === "")) {
        PostNotes(data);
        // console.log(data);
        Navigate("/user/notes");
      }
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

  //   ================= Handle Protect Password Verification Button ===================
  const handleProtectPasswordVerificationBtn = () => {
    setPasswordProtection(false);
  };

  // =========== useEffect ===============
  useEffect(() => {
    handleDateAndTime();
    setData({ ...data, author: user._id });
    notes_id ? findNotesData() : null;
  }, []);
  return (
    <>
      {!passwordProtection ? (
        <>
          <div className="w-full  flex flex-col box-border">
            <div className="w-full h-screen pt-10 flex flex-col">
              <div className="w-full flex justify-between px-6 py-2  bg-green-50">
                {/* ================= Back Button ============ */}
                <NavLink
                  to={"/user/notes"}
                  className={`flex items-center gap-x-1`}
                >
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
                          onClick={() => setLineHide(!lineHide)}
                          className={`flex justify-start gap-x-2  hover:bg-green-700 hover:text-white`}
                        >
                          {lineHide ? (
                            <>
                              <LuEqualNot />
                              Hide Line
                            </>
                          ) : (
                            <>
                              <IoReorderFourOutline />
                              Show Line
                            </>
                          )}
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
                    value={data.title}
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
                value={data.text}
                onChange={handleInputChange}
                placeholder="Write Here ... "
                className={`w-full h-dvh px-4 py-1 border border-green-700 outline-none ${
                  lineHide ? "textContent" : "textContentHide"
                } `}
              ></textarea>
            </div>
          </div>

          {lockBtn ? (
            <NotesLockBtn
              handlelockBtn={handlelockBtn}
              handleNotesPasswordReturn={handleNotesPasswordReturn}
              data={data}
            />
          ) : (
            ""
          )}
        </>
      ) : (
        // ============== Notes Password Verification Component ============
        <NotesPasswordVerification
          handleProtectPasswordVerificationBtn={
            handleProtectPasswordVerificationBtn
          }
          data={data}
        />
      )}
    </>
  );
};

// =============== Notes Password Verfication Component ================
const NotesPasswordVerification = ({
  handleProtectPasswordVerificationBtn,
  data,
}) => {
  //   ------------------- State Start -----------------
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState(false);

  // ----------------- State End -------------------
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordVerify = () => {
    if (data.password === password) {
      handleProtectPasswordVerificationBtn();
    } else {
      setPasswordMessage(true);
    }
  };
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center background_color">
        <div className="w-3/12 rounded shadow-2xl background_gradient_color p-6 flex flex-col gap-y-3">
          <h1 className="text-2xl text-green-800 font-bold">Protected Notes</h1>
          <div className="w-full flex flex-col">
            <span className="text-green-900 flex gap-x-0.5 items-center">
              <IoIosLock /> Password
            </span>
            <input
              type="password"
              placeholder="Enter Your Password"
              onChange={handlePasswordInput}
              className="w-full outline-none p-2 border rounded-sm bg-gray-200/15 shadow-inner shadow-gray-800 border-green-700"
            />
            {passwordMessage ? (
              <span className="text-red-700">*Incorrect Password</span>
            ) : (
              ""
            )}
          </div>
          <div className="w-full flex justify-between">
            <NavLink
              to={"/user/notes"}
              className="px-3 py-1 rounded text-white bg-gray-600"
            >
              Back
            </NavLink>
            {/* <button className="px-3 py-1 rounded text-white bg-gray-600">
              Back
            </button> */}
            <button
              onClick={handlePasswordVerify}
              className="px-4 py-1 rounded text-white bg-green-600"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUpdateNotes;
