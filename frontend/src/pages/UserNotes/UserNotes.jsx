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
import DeleteNotes from "@/components/DeleteNotes/DeleteNotes";
import NotesView from "@/components/NotesView/NotesView";
import { GetUserData } from "@/utils/userApiCall";
import { FaLock } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";
import { MdOutlineErrorOutline } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotesThemeColors from "@/components/NotesThemeColors/NotesThemeColors";
import { IoMdArrowDropdown } from "react-icons/io";

const UserNotes = () => {
  // --------------- State Start ------------------
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [notesId, setNotesId] = useState(null);
  const [gridBtn, setGridBtn] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [themeColorBtn, setThemeColorBtn] = useState(false);
  const notes = useSelector((state) => state.notes.value);

  // ------------------ State End -----------------
  const dispatch = useDispatch();
  const NotesData = async () => {
    setData(await GetNotes());
    // let rev = await GetNotes();

    // setData(rev.reverse());
    dispatch(allNotes(await GetNotes()));
    // console.log(await GetNotes());
  };

  // --------------------- Search Input ---------------------
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
    });
    // console.log(newData);
    setData(newData);
    // if (e.target.value === "") {
    //   setData(newData.reverse());
    // }
  };

  // ------------------- Delete Button -------------------------
  const handleDeleteBtn = async (id) => {
    setDeleteBtn(!deleteBtn);
    setNotesId(id);
    setData(await GetNotes());
    // let rev = await GetNotes();

    // setData(rev.reverse());
  };

  // ---------------------- Theme Colors Button ----------------
  const handleThemeColor = (response) => {
    setThemeColorBtn(!themeColorBtn);
    handleApiCalling();
    setUserDetails(response);
  };

  // ---------------- Theme Color Back Button ---------------
  const handleThemeBackBtn = () => {
    setThemeColorBtn(!themeColorBtn);
  };
  // -------------------- Sort Button -------------------
  const handleSortingBtn = (sortValue) => {
    if (sortValue === "time_ascending") {
      setData([...notes]);
    } else if (sortValue === "time_descending") {
      let rev = [...notes];
      let rev_temp = rev.reverse();
      setData(rev_temp);
    } else if (sortValue === "a-z") {
      let sortNotes = [...notes];
      let a_zSort = sortNotes.sort((item1, item2) => {
        let first = item1.title.toLowerCase();
        let second = item2.title.toLowerCase();
        return first > second ? 1 : -1;
      });

      setData(a_zSort);
    } else if (sortValue === "z-a") {
      let sortNotes = [...notes];
      let z_aSort = sortNotes.sort((item1, item2) => {
        let first = item1.title.toLowerCase();
        let second = item2.title.toLowerCase();
        return first > second ? -1 : 1;
      });

      setData(z_aSort);
    }
  };

  // ------------------- Grid Button --------------
  const handleGridBtn = async () => {
    setGridBtn(!gridBtn);
    let userData = await GetUserData();
    setUserDetails(userData);
  };

  const handleApiCalling = async () => {
    let userData = await GetUserData();
    setUserDetails(userData);
    // console.log(userData);
  };

  // ---------------------- useEffect -----------------------------
  useEffect(() => {
    // setData(GetNotes());
    // console.log(GetNotes());
    // GetNotes();
    handleApiCalling();
    NotesData();
  }, []);

  return (
    <>
      <div className="w-full  flex flex-col box-border">
        <div className="w-full h-screen pt-10 flex ">
          {/* <div className="flex  h-dvh "> */}
          <SidebarMenu />
          <div className="w-full  flex flex-col background_color overflow-auto text-sm md:text-base">
            <div className="w-full flex justify-between p-4 md:p-5 ">
              {/* ================= Create Notes ============= */}
              <div>
                <NavLink
                  to="/user/create_notes"
                  className={`bg-green-700 hover:bg-green-900 text-white py-3 md:py-2 px-3 rounded flex items-center gap-x-1`}
                >
                  <MdEditSquare />
                  <span className="hidden md:inline-block">Create</span>
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
                <button
                  onClick={handleGridBtn}
                  className="py-2.5 md:py-2 px-3 border border-green-700 flex items-center gap-x-2 text-green-700 rounded hover:bg-green-700 hover:text-white"
                >
                  <span className="hidden md:inline-block">View</span>
                  <BsFillGrid3X3GapFill />
                </button>
              </div>
            </div>

            {/* ==================Colors, Sorting Notes and Notes Count ======================= */}
            <div className="w-full flex justify-between  px-4 md:px-5 bg-gray-300 py-1 md:py-2 ">
              {/* <select name="notes" id="notes" className="p-3">
                <option value="time_ascending" className="p-3 bg-green-600 m-5">
                  Sort time by ascending order
                </option>

                <option value="time_descending">
                  Sort time by descending order
                </option>
                <option value="a_z">Sort alphabetical (A to Z)</option>
                <option value="z_a">Sort alphabetical (Z to A)</option>
              </select> */}
              {/* ===================== Choose Colors Button ================== */}
              <button
                onClick={handleThemeColor}
                className={`py-1 md:py-2 px-4 md:px-5 borders border-black rounded shadow-sm shadow-gray-500 ${
                  userDetails.themeColor || "bg-green-100"
                }`}
              ></button>

              {/* ================== Sorting Notes Button ========================= */}
              <DropdownMenu className={` `}>
                <DropdownMenuTrigger
                  className={`px-2  py-1 text-green-900  outline-none flex gap-x-1 items-center rounded hover:bg-green-700 hover:text-white `}
                  // className={`px-2  py-1 rounded text-white font-bold bg-gray-600 outline-none `}
                >
                  Sorting notes <IoMdArrowDropdown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleSortingBtn("time_ascending")}
                  >
                    Sort time by ascending order
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleSortingBtn("time_descending")}
                  >
                    Sort time by descending order
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSortingBtn("a-z")}>
                    Sort alphabetical (A to Z)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSortingBtn("z-a")}>
                    Sort alphabetical (Z to A)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* ======================= Total Notes Count ================== */}
              <div className="text-green-800 flex items-center">
                {data.length} Notes
              </div>
            </div>
            {/* ======================= All Notes From User ================ */}
            {data.length === 0 ? (
              <div className="flex justify-center items-center w-full mt-10">
                <div className="flex flex-col items-center">
                  {/* <MdOutlineErrorOutline className="text-2xl text-yellow-600" /> */}
                  No notes found
                </div>
              </div>
            ) : (
              <div className="w-full ">
                <div
                  className={`w-full grid ${
                    userDetails.gridView === "list"
                      ? "grid-cols-1 "
                      : userDetails.gridView === "grid"
                      ? "grid-cols-3"
                      : "grid-cols-2"
                  } gap-2 p-4`}
                >
                  {/* <div className="w-full grid grid-cols-3 gap-2 p-4"> */}
                  {data.map((item, index) => (
                    <div
                      className={`w-full  p-5 rounded-lg ${
                        userDetails.themeColor || "bg-green-100"
                      } shadow-xls shadow-lg`}
                      // className="w-full  p-5 rounded-lg bg-green-100 shadow-xls shadow-lg"
                      key={index}
                    >
                      <h1 className="text-base md:text-2xl font-bold truncate text-green-700">
                        {/* {item.title} */}
                        {item.isPasswordProtected ? (
                          <span className="flex gap-x-1 text-gray-500 font-bold items-center text-sm md:text-2xl">
                            {/* <FaLock /> */}
                            <IoMdLock className="self-center " />
                            Locked
                          </span>
                        ) : (
                          item.title
                        )}
                      </h1>
                      <p className="truncate text-green-700 text-sm md:text-base">
                        {item.isPasswordProtected ? (
                          <span className="flex  gap-x-0.5 items-center">
                            <IoMdLock />
                            This notes is protected
                          </span>
                        ) : (
                          item.text
                        )}
                        {/* {item.text} */}
                      </p>

                      <div className="w-full flex justify-between mt-2">
                        <NavLink
                          to={`/user/update_notes/${item._id}`}
                          className="flex items-center gap-x-1 text-gray-600 border border-gray-500  shadow-gray-300 shadow-md  px-1.5 py-1 md:py-0.5 rounded hover:bg-gray-500 hover:text-white"
                        >
                          <RiEdit2Fill />
                          <span className="hidden md:inline-block">Edit</span>
                        </NavLink>
                        <button
                          onClick={() => handleDeleteBtn(item._id)}
                          className="flex items-center gap-x-1 text-red-400 border shadow-gray-300 shadow-md border-red-400 px-1.5 py-1 md:py-0.5 rounded hover:bg-red-400 hover:text-white"
                        >
                          <RiDeleteBin5Fill />
                          <span className="hidden md:inline-block">Delete</span>
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
            )}
          </div>
        </div>
      </div>
      {/* ======================== Delete Button ===================== */}
      {deleteBtn ? (
        <DeleteNotes handleDeleteBtn={handleDeleteBtn} notesId={notesId} />
      ) : (
        ""
      )}

      {/* ======================= View Notes ========================= */}
      {gridBtn ? <NotesView handleGridBtn={handleGridBtn} /> : ""}

      {/* ===================== Notes Theme Color ================= */}
      {themeColorBtn ? (
        <NotesThemeColors
          handleThemeColor={handleThemeColor}
          handleThemeBackBtn={handleThemeBackBtn}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default UserNotes;
