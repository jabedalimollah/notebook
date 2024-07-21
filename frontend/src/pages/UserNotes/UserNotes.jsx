import SidebarMenu from "@/common/SidebarMenu/SidebarMenu";
import React from "react";
import { NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { MdEditSquare } from "react-icons/md";
const UserNotes = () => {
  return (
    <>
      <div className="w-full  flex flex-col box-border">
        <div className="w-full h-screen pt-10 flex ">
          {/* <div className="flex  h-dvh "> */}
          <SidebarMenu />
          <div className="w-full flex flex-col background_color">
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
            <div className="w-full">
              <div className="w-full flex gap-2 p-4">
                <div className="w-full  p-5 rounded-lg bg-green-100 shadow-xls border border-black">
                  <h1 className="text-2xl font-bold">Title</h1>
                  <p>This is my first notes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserNotes;
