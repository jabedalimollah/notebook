import React, { useState } from "react";
import logo from "/notebook.png";
import { HiEyeOff } from "react-icons/hi";
import { HiEye } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/login/login.module.css";
import { apiRoutes } from "@/utils/apiRoutes";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getData } from "@/features/user/userSlice";
const Login = () => {
  // -------------------- State Start ------------------------
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(false);
  // ------------------ State End ------------------------
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleInputBox = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleLogIn = () => {
    // =================== Email validation ===================
    const emailPattern =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (emailPattern.test(data.email)) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }

    // ================== Password validation ===============
    if (!(data.password === "")) {
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }
    if (
      validEmail === false &&
      !(data.email === "") &&
      validPassword === false &&
      !(data.password === "")
    ) {
      handleApiCalling(data);
    }
    // console.log(data);
  };
  const handleApiCalling = async (data) => {
    try {
      const response = await axios.post(apiRoutes.loginURI, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log("res", response.data.token);
      // dispatch(getData(response.data.data._id));
      localStorage.setItem("notebookToken", response.data.token);
      setMessage(false);
      // navigate("/");
      navigate("/user/notes");
    } catch (error) {
      // console.log("err", error.response.data.message);
      if ("email or password doesn't exists" === error.response.data.message) {
        setMessage(true);
      }
    }
  };
  return (
    <>
      <div className={`${styles.main}`}>
        <div className={`${styles.login_container}`}>
          <div className={`${styles.logo_box}`}>
            <img src={logo} alt="logo" className={`${styles.logo}`} />
          </div>
          <h2 className={`${styles.form_title}`}>Sign in to your account</h2>
          <form
            action=""
            className={`${styles.login_form}`}
            onSubmit={(e) => e.preventDefault()}
          >
            {message ? (
              <div className={`${styles.div_wrapper}`}>
                {/* ===================== Email ======================= */}
                {/* <div className={`${styles.form_input_box}`}>
                <label htmlFor="" className={`${styles.form_data_wrapper}`}> */}
                {/* <span className={`${styles.input_title}`}>Email</span> */}
                <span className={`${styles.message}`}>User doesn't exist</span>
                {/* </label>
              </div> */}
              </div>
            ) : null}
            <div className={`${styles.div_wrapper}`}>
              {/* ===================== Email ======================= */}
              <div className={`${styles.form_input_box}`}>
                <label htmlFor="" className={`${styles.form_data_wrapper}`}>
                  <span className={`${styles.input_title}`}>Email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className={`${styles.input_box}`}
                    onChange={handleInputBox}
                  />
                </label>
                {validEmail ? (
                  <span className={`${styles.invalid_user}`}>
                    Invalid Email Addresss
                  </span>
                ) : null}
              </div>
            </div>

            <div className={`${styles.div_wrapper}`}>
              {/* ===================== Password ======================= */}
              {/* <div className={`${styles.form_input_box}`}>
                <label htmlFor="" className={`${styles.form_data_wrapper}`}>
                  <span className={`${styles.input_title}`}>Password</span>

                  <input
                    type="password"
                    placeholder="Enter your password"
                    className={`${styles.input_box}`}
                  />
                </label>
                {false ? (
                  <span className={`${styles.invalid_user}`}>
                    Enter password
                  </span>
                ) : null}
              </div> */}
              {/* ===================== Password ======================= */}
              <div className={`${styles.form_input_box}`}>
                <label htmlFor="" className={`${styles.form_data_wrapper}`}>
                  <span className={`${styles.input_title}`}>Password</span>
                  <div className={`${styles.password_box}`}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      name="password"
                      onChange={handleInputBox}
                      className={`${styles.password_input_box}`}
                    />
                    {showPassword ? (
                      <button
                        className={`${styles.eye_botton}`}
                        onClick={() => setShowPassword(false)}
                      >
                        <HiEyeOff />
                      </button>
                    ) : (
                      <button
                        className={`${styles.eye_botton}`}
                        onClick={() => setShowPassword(true)}
                      >
                        <HiEye />
                      </button>
                    )}
                  </div>
                </label>
                {validPassword ? (
                  <span className={`${styles.invalid_user}`}>
                    *Please Enter Your Password
                  </span>
                ) : null}
              </div>
            </div>
            <div className={`${styles.forgot_password_box}`}>
              <label htmlFor="checkbox" className={`${styles.remember_me}`}>
                <input type="checkbox" name="checkbox" id="checkbox" />
                <span className={`${styles.remember_me_text}`}>
                  Remember me
                </span>
              </label>
              <Link
                to="/user/forgot_password"
                className={`${styles.forgot_password_text}`}
              >
                Forgot password?
              </Link>
            </div>
            {/* <div className={`${styles.div_wrapper}`}> */}
            <div className={`${styles.form_input_box}`}>
              <button
                className={`${styles.login_button}`}
                onClick={handleLogIn}
              >
                Log in to your account
              </button>
            </div>
            {/* </div> */}
            {/* <div className={`${styles.login_box}`}></div> */}
            <div className={`${styles.login}`}>
              <span className={`${styles.login_wrapper}`}>
                Don’t have an account yet?{" "}
                <Link to="/user/signup" className={`${styles.login}`}>
                  Sign up here
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
