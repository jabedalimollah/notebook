import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@/components/ui/button";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
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
import CreateUpdateNotes from "./components/CreateUpdateNotes/CreateUpdateNotes";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
// const login = localStorage.getItem("notebookToken");
function App() {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const login = localStorage.getItem("notebookToken");
    // const login = JSON.parse(localStorage.getItem("items"));

    if (login) {
      // const login1 = localStorage.getItem("notebookToken");
      navigate("/user/notes");
      // console.log(login);
      setAuth(login);
    } else {
      navigate("/user/login");
    }
  }, []);
  return (
    <>
      {/* <BrowserRouter> */}
      <Navbar />
      <Routes>
        {auth ? (
          <>
            <Route path="/" element={<ErrorPage />} />

            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/user/edit_profile" element={<EditProfile />} />
            <Route path="/user/settings" element={<UserProfileSettings />} />

            <Route path="/user/notes" element={<UserNotes />} />
            <Route path="/user/create_notes" element={<CreateUpdateNotes />} />
            <Route path="/user/todo_list" element={<TodoList />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact_us" element={<ContactUs />} />
            <Route
              path="/user/update_notes/:notes_id"
              element={<CreateUpdateNotes />}
            />
            <Route path="/user/forgot_password" element={<ForgotPassword />} />
          </>
        ) : (
          <>
            {/* <Route path="/user/forgot_password" element={<ForgotPassword />} /> */}
            <Route path="/user/signup" element={<Signup />} />
            <Route path="/user/login" element={<Login />} />
          </>
        )}
        <Route path="/user/page_not_found" element={<ErrorPage />} />
      </Routes>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
