import SidebarMenu from "@/common/SidebarMenu/SidebarMenu";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { MdEditSquare } from "react-icons/md";
import { GetNotes } from "@/utils/notesApiCalling";
import { useDispatch, useSelector } from "react-redux";
import { allNotes } from "@/features/notes/notesSlice";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";

const UserNotes = () => {
  // --------------- State Start ------------------
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const notes = useSelector((state) => state.notes.value);

  // ------------------ State End -----------------
  const dispatch = useDispatch();
  const NotesData = async () => {
    setData(await GetNotes());
    dispatch(allNotes(await GetNotes()));
    // console.log(await GetNotes());
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    // console.log(e.target.value);

    let newData = [];
    newData = notes.filter((item) => {
      return (
        !(
          item.title.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1
        ) ||
        !(item.text.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1)
      );
      // ||
      // !(
      //   item.catagory.toLowerCase().indexOf(e.target.value.toLowerCase()) ===
      //   -1
      // )
    });
    // console.log(newData);
    setData(newData);
  };
  useEffect(() => {
    // setData(GetNotes());
    // console.log(GetNotes());
    // GetNotes();
    NotesData();
  }, []);

  return (
    <>
      <div className="w-full  flex flex-col box-border">
        <div className="w-full h-screen pt-10 flex ">
          {/* <div className="flex  h-dvh "> */}
          <SidebarMenu />
          <div className="w-full  flex flex-col background_color overflow-auto ">
            <div className="w-full flex justify-between p-5 ">
              {/* ================= Create Notes ============= */}
              <div>
                <NavLink
                  to="/user/create_notest"
                  className={`bg-green-700 hover:bg-green-900 text-white py-2 px-3 rounded flex items-center gap-x-1`}
                >
                  <MdEditSquare />
                  Create
                </NavLink>
              </div>
              {/* ============ Search Notes ================ */}
              <div className="">
                <div className="w-full">
                  <label
                    htmlFor="search"
                    className="border border-green-700 rounded flex items-center pr-2 py-1 bg-green-50"
                  >
                    <input
                      type="text"
                      placeholder="Search your notes"
                      id="search"
                      value={searchInput}
                      onChange={handleSearchInput}
                      className="py-1 px-2 outline-none bg-green-50"
                    />
                    <CiSearch />
                  </label>
                </div>
              </div>
              {/* ================= View Option =================== */}
              <div>
                <button className="py-2 px-3 border border-green-700 flex items-center gap-x-2 text-green-700 rounded hover:bg-green-700 hover:text-white">
                  View <BsFillGrid3X3GapFill />
                </button>
              </div>
            </div>
            {/* ======================= All Notes From User ================ */}
            <div className="w-full ">
              <div className="w-full grid grid-cols-3 gap-2 p-4">
                {data.map((item, index) => (
                  <div
                    className="w-full  p-5 rounded-lg bg-green-100 shadow-xls shadow-lg"
                    key={index}
                  >
                    <h1 className="text-2xl font-bold truncate text-green-700">
                      {item.title}
                    </h1>
                    <p className="truncate text-green-700">{item.text}</p>

                    <div className="w-full flex justify-between mt-2">
                      <NavLink
                        to={`/user/update_notes/${item._id}`}
                        className="flex items-center gap-x-1 text-gray-600 border border-gray-500  shadow-gray-300 shadow-md  px-1.5 py-0.5 rounded"
                      >
                        <RiEdit2Fill /> Edit
                      </NavLink>
                      <button className="flex items-center gap-x-1 text-red-400 border shadow-gray-300 shadow-md border-red-400 px-1.5 py-0.5 rounded">
                        <RiDeleteBin5Fill /> Delete
                      </button>
                    </div>
                  </div>
                ))}
                {/* <div className="w-full  p-5 rounded-lg bg-green-100 shadow-xls border border-black">
                  <h1 className="text-2xl font-bold">Title</h1>
                  <p>This is my first notes</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserNotes;
