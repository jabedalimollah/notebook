import { GetUserData, UpdateUserData } from "@/utils/userApiCall";
import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Loading from "../Loading/Loading";
import { useDispatch } from "react-redux";
import { getData } from "@/features/user/userSlice";
const NotesThemeColors = ({ handleThemeColor, handleThemeBackBtn }) => {
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleNotesThemeColorBtn = async (thmColor) => {
    setLoading(true);
    let response = await UpdateUserData({ themeColor: thmColor });
    setLoading(false);
    // console.log(thmColor);
    dispatch(getData(response));
    handleThemeColor(response);
  };
  return (
    <>
      {loading ? <Loading /> : ""}
      <div className="w-full h-dvh fixed top-0 left-0 flex justify-center items-center  bg-green-100/75">
        <div className="w-9/12 md:w-6/12 lg:w-3/12 flex flex-col p-6  gap-y-3 background_gradient_colors bg-white shadow-xl shadow-gray-400 rounded-lg">
          <div className="flex flex-col">
            <button
              onClick={() => handleThemeBackBtn()}
              className="self-end bg-red-500 px-3 py-2 text-white rounded hover:bg-red-700"
            >
              <IoCloseSharp />
            </button>
            <h1 className="text-xl text-green-800 font-bold">Choose Color</h1>
          </div>
          <div className="w-full grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNotesThemeColorBtn("bg-green-100")}
              className="bg-green-100 py-5 hover:border hover:border-gray-700"
            ></button>

            <button
              onClick={() => handleNotesThemeColorBtn("bg-pink-100")}
              className="bg-pink-100 py-5 hover:border hover:border-gray-700"
            ></button>

            <button
              onClick={() => handleNotesThemeColorBtn("bg-blue-100")}
              className="bg-blue-100 py-5 hover:border hover:border-gray-700"
            ></button>

            <button
              onClick={() => handleNotesThemeColorBtn("bg-gray-100")}
              className="bg-gray-100 py-5 hover:border hover:border-gray-700"
            ></button>

            <button
              onClick={() => handleNotesThemeColorBtn("bg-yellow-100")}
              className="bg-yellow-100 py-5 hover:border hover:border-gray-700"
            ></button>

            <button
              onClick={() => handleNotesThemeColorBtn("bg-red-100")}
              className="bg-red-100 py-5 hover:border hover:border-gray-700"
            ></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotesThemeColors;
