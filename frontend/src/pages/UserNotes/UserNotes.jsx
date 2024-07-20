import SidebarMenu from "@/common/SidebarMenu/SidebarMenu";
import React from "react";

const UserNotes = () => {
  return (
    <>
      <div className="flex  h-dvh ">
        <SidebarMenu />
        <div className="w-full flex justify-center items-center border border-black">
          <h1>User Notes</h1>
        </div>
      </div>
    </>
  );
};

export default UserNotes;
