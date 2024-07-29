import SidebarMenu from "@/common/SidebarMenu/SidebarMenu";
import React from "react";

const ContactUs = () => {
  return (
    <>
      <div className="w-full  flex flex-col box-border">
        <div className="w-full h-screen pt-10 flex ">
          <SidebarMenu />
          <div className="w-full flex justify-center items-center border border-black">
            <h1>contact Us</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
