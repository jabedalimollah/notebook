import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@/components/ui/button";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Navbar from "./common/Navbar/Navbar";
import Login from "./pages/Login/Login";
function App() {
  return (
    <>
      {/* <h1>Start Frontend Part</h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button class="bg-indigo-500 shadow-lg shadow-indigo-500/50 text-slate-300 p-2 rounded-md mt-4">
        Subscribe
      </button>
      <Button variant="destructive" className="mx-4">
        Click me
      </Button> */}
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
