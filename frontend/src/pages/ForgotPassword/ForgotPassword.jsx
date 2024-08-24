import React, { useState } from "react";
import { HiEye } from "react-icons/hi";
import { HiEyeOff } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import logo from "/notebook.png";
import styles from "../../styles/forgotPassword/forgotPassword.module.css";
import { apiRoutes } from "@/utils/apiRoutes";
import axios from "axios";
import Loading from "@/components/Loading/Loading";

const ForgotPassword = () => {
  // ------------------------ State Start ----------------------
  const [message, setMessage] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  //   --------------------- State End ----------------------
  const navigate = useNavigate();
  const handleInputBox = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleResetPassoword = () => {
    // =================== Email validation ===================
    const emailPattern =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (emailPattern.test(data.email)) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
    // ==================== Password validation =====================
    if (data.password.length >= 8) {
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }

    // =================== Confirm Password validation =================
    if (data.password === data.confirmPassword) {
      setValidConfirmPassword(false);
    } else {
      setValidConfirmPassword(true);
    }
    if (
      validEmail === false &&
      !(data.email === "") &&
      !(data.password === "") &&
      validPassword === false &&
      !(data.confirmPassword === "") &&
      validConfirmPassword === false
    ) {
      //   console.log(data);
      handleApiCalling(data);
    }
  };

  const handleApiCalling = async (data) => {
    try {
      setLoading(true);
      const response = await axios.put(apiRoutes.resetpasswordURI, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      //   console.log(response.data);
      setLoading(false);
      setMessage(false);
      navigate("/user/profile");
    } catch (error) {
      setLoading(false);
      //   console.log(error.response.data.message);
      if (error.response.data.message === "user not found") {
        setMessage(true);
      }
    }
  };
  return (
    <>
      {loading ? <Loading /> : ""}
      <div className={`${styles.main}`}>
        <div className={`${styles.password_reset_container}`}>
          <div className={`${styles.logo_box}`}>
            <img src={logo} alt="logo" className={`${styles.logo}`} />
          </div>
          <h2 className={`${styles.form_title}`}> Reset Your Password</h2>
          <form
            action=""
            className={`${styles.password_reset_form}`}
            onSubmit={(e) => e.preventDefault()}
          >
            {message ? (
              <div className={`${styles.div_wrapper}`}>
                <span className={`${styles.message}`}>User doesn't exist</span>
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
              {/* ===================== New Password ======================= */}
              <div className={`${styles.form_input_box}`}>
                <label htmlFor="" className={`${styles.form_data_wrapper}`}>
                  <span className={`${styles.input_title}`}>New Password</span>
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
                    *Enter minimum 8 charecter
                  </span>
                ) : null}
              </div>
            </div>
            <div className={`${styles.div_wrapper}`}>
              {/* ===================== Confirm Password ======================= */}
              <div className={`${styles.form_input_box}`}>
                <label htmlFor="" className={`${styles.form_data_wrapper}`}>
                  <span className={`${styles.input_title}`}>
                    Confirm Password
                  </span>
                  <div className={`${styles.password_box}`}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      name="confirmPassword"
                      onChange={handleInputBox}
                      className={`${styles.password_input_box}`}
                    />
                    {showConfirmPassword ? (
                      <button
                        className={`${styles.eye_botton}`}
                        onClick={() => setShowConfirmPassword(false)}
                      >
                        <HiEyeOff />
                      </button>
                    ) : (
                      <button
                        className={`${styles.eye_botton}`}
                        onClick={() => setShowConfirmPassword(true)}
                      >
                        <HiEye />
                      </button>
                    )}
                  </div>
                </label>
                {validConfirmPassword ? (
                  <span className={`${styles.invalid_user}`}>
                    *Enter Same Password
                  </span>
                ) : null}
              </div>
            </div>
            {/* <div className={`${styles.forgot_password_box}`}>
              <label htmlFor="checkbox" className={`${styles.remember_me}`}>
                <input type="checkbox" name="checkbox" id="checkbox" />
                <span className={`${styles.remember_me_text}`}>
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot_password"
                className={`${styles.forgot_password_text}`}
              >
                Forgot password?
              </Link>
            </div> */}
            {/* <div className={`${styles.div_wrapper}`}> */}
            <div className={`${styles.form_input_box}`}>
              <button
                className={`${styles.password_reset_button}`}
                onClick={handleResetPassoword}
              >
                Reset Password
              </button>
            </div>
            {/* </div> */}
            {/* <div className={`${styles.password_reset_box}`}></div> */}
            <div className={`${styles.login}`}>
              <span className={`${styles.login_wrapper}`}>
                {/* Don’t have an account yet?{" "} */}
                <Link to="/user/profile" className={`${styles.login}`}>
                  {/* <Link to="/user/login" className={`${styles.login}`}> */}
                  {/* Sign up here */}
                  Back
                  {/* Return to Profile Page */}
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
