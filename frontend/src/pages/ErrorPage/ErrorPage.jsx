import React from "react";
import { BiSolidError } from "react-icons/bi";
import { NavLink } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className="w-full h-dvh flex justify-center items-center background_color">
      <div className="flex flex-col items-center gap-y-2">
        <BiSolidError className="text-4xl text-red-700" />
        <h1 className="text-2xl ">404 Page Not Found</h1>
        <NavLink to={"/user/login"}>Back to Login Page</NavLink>
      </div>
    </div>
  );
};

export default ErrorPage;
