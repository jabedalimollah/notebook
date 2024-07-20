import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@/components/ui/button";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Navbar from "./common/Navbar/Navbar";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import UserProfile from "./pages/UserProfile/UserProfile";
import EditProfile from "./pages/EditProfile/EditProfile";
import UserProfileSettings from "./pages/UsreProfileSettings/UserProfileSettings";
import UserNotes from "./pages/UserNotes/UserNotes";
import TodoList from "./pages/TodoList/TodoList";
import About from "./pages/About/About";
import ContactUs from "./pages/ContactUs/ContactUs";
function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />

          <Route path="/user/signup" element={<Signup />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/forgot_password" element={<ForgotPassword />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/edit_profile" element={<EditProfile />} />
          <Route path="/user/settings" element={<UserProfileSettings />} />

          <Route path="/user/notes" element={<UserNotes />} />
          <Route path="/user/todo_list" element={<TodoList />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact_us" element={<ContactUs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
