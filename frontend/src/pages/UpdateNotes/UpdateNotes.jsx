import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosSave } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import { FindNotes, UpdateNotesData } from "@/utils/notesApiCalling";

// ============ JWT Token ===============
const token = localStorage.getItem("notebookToken");
const user = token ? jwtDecode(token) : null; // jwtDecode is for extract user id

const UpdateNotes = () => {
  // ================== State Start ====================
  const [data, setData] = useState({
    title: "",
    text: "",
  });
  const [currentDate, setCurrentDate] = useState({
    date: "",
    time: "",
  });

  // ================= State End ========================

  // ================ handle Input Change ===================
  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  //   ----------------- Get params Data ----------
  const { notes_id } = useParams(); // get params data [ notes id ]

  // ============= handle Save Button =================
  const handleSaveBtn = async () => {
    if (!(data.title === "")) {
      //   PostNotes(data);
      //   Navigate("/user/notes");
      //   console.log(data);

      //   console.log(notes_id);
      let newData = await UpdateNotesData(notes_id, data);
      setData({ title: newData.title, text: newData.text });
      let updateDate = newData.updatedAt
        .split("T")[0]
        .split("-")
        .reverse()
        .reduce((acc, char) => `${acc}-${char}`);
      let updateTime = newData.updatedAt.split("T")[1].split(".")[0];
      setCurrentDate({ date: updateDate, time: updateTime });
    }
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
    setData({ title: existNotes.title, text: existNotes.text });
    setCurrentDate({ date: updateDate, time: updateTime });
    // console.log(existNotes.updatedAt.split("T")[1].split(".")[0]);
  };

  useEffect(() => {
    findNotesData();
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
              <button className="flex items-center px-2 border font-bold border-gray-800 text-gray-800 hover:bg-gray-600 hover:text-white py-2 rounded-lg">
                <BsThreeDotsVertical />
                Option
              </button>
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
            className={`w-full h-dvh px-4 py-1 border border-green-700 outline-none textContent`}
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default UpdateNotes;
