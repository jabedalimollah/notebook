import React, { useEffect, useState } from "react";
import { TfiLayoutGrid3Alt } from "react-icons/tfi";
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import { ImMenu } from "react-icons/im";
import { RiCloseLargeFill } from "react-icons/ri";
import { UpdateUserData } from "@/utils/userApiCall";
import Loading from "../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "@/features/user/userSlice";

const NotesView = ({ handleGridBtn }) => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const handleChangeGrid = async (grid) => {
    // console.log(gridValue);
    setLoading(true);
    let newD = await UpdateUserData({ gridView: grid });
    setLoading(false);
    dispatch(getData(newD));

    handleGridBtn(newD);
  };
  const backBtn = () => {
    // const response = await GetUserData();
    handleGridBtn(user);
  };
  useEffect(() => {});
  return (
    <>
      {loading ? <Loading /> : ""}
      <div className="w-full h-dvh fixed top-0 left-0 flex justify-center items-center  bg-green-100/75">
        <div className="w-9/12 md:w-6/12 lg:w-3/12 flex flex-col p-6  gap-y-3 background_gradient_color shadow-xl shadow-gray-400 rounded-lg">
          {/* ================== Close Button =============== */}
          <button
            onClick={backBtn}
            className="self-end bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 "
          >
            <RiCloseLargeFill />
          </button>
          <h1 className="text-2xl font-bold text-green-700">View</h1>
          <button
            onClick={() => handleChangeGrid("list")}
            className=" w-full flex items-center border border-green-800 gap-x-2 p-2 text-xl text-green-800 hover:bg-green-800 hover:text-white"
          >
            <ImMenu />
            List
          </button>
          <button
            onClick={() => handleChangeGrid("grid")}
            className=" w-full flex items-center border border-green-800 gap-x-2 p-2 text-xl text-green-800 hover:bg-green-800 hover:text-white"
          >
            <TfiLayoutGrid3Alt /> Grid
          </button>
          <button
            onClick={() => handleChangeGrid("largeGrid")}
            className=" w-full flex items-center border border-green-800 gap-x-2 p-2 text-xl text-green-800 hover:bg-green-800 hover:text-white"
          >
            <TfiLayoutGrid2Alt />
            Large gird
          </button>
        </div>
      </div>
    </>
  );
};

export default NotesView;
