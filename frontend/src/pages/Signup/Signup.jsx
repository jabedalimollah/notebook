import React, { useEffect, useState } from "react";
import styles from "../../styles/signup/signup.module.css";
import logo from "/notebook.png";
import { Link, useNavigate } from "react-router-dom";
import { HiEyeOff } from "react-icons/hi";
import { HiEye } from "react-icons/hi";
import axios from "axios";
import { apiRoutes } from "@/utils/apiRoutes";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "@/features/user/userSlice";
// const baseURL = "http://localhost:8000/api/v1/user/signup";
const Signup = () => {
  // 🚀🚀🚀🚀 ---------------- State Start -------------------------

  // ============= show hide password ============
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // =============== store input data ==================
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  // ====================== Validation ======================
  const [validName, setValidName] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);

  // =============== validation message =============
  const [usernamevalidationMessage, setUsernameValidationMessage] =
    useState("");
  const [emailvalidationMessage, setEmailValidationMessage] = useState("");

  // 🚀🚀🚀🚀 ---------------- State End -------------------------
  // ============== dispatch ===========
  // const dispatch = useDispatch();

  // -------------- navigate --------------
  const navigate = useNavigate();
  // ============== handle input box ================
  const handleInputBox = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // ============ name validation ==============
    const namePattern = /^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/;
    if (
      namePattern.test(data.name) &&
      data.name.length >= 2 &&
      data.name.length <= 20
    ) {
      setValidName(false);
    } else {
      setValidName(true);
    }

    // ================= username validation ====================
    const usernamePattern = /^[a-z0-9_.]+$/;

    if (
      usernamePattern.test(data.username) &&
      data.username.length >= 2 &&
      data.username.length <= 20
    ) {
      setValidUsername(false);
    } else {
      setValidUsername(true);
    }

    // =================== Email validation ===================
    const emailPattern =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (emailPattern.test(data.email)) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
    // ==================== Phone Number Validation ================
    // const stringToNum = parseInt(data.phoneNumber, 10);
    const phonenumberPattern = /^\D*(?:\d\D*){10,}$/;
    if (
      phonenumberPattern.test(data.phoneNumber) &&
      data.phoneNumber.length === 10
    ) {
      setValidPhoneNumber(false);
    } else {
      setValidPhoneNumber(true);
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
      validName === false &&
      !(data.name === "") &&
      validEmail === false &&
      !(data.email === "") &&
      validUsername === false &&
      !(data.username === "") &&
      validConfirmPassword === false &&
      !(data.confirmPassword === "") &&
      validPassword === false &&
      !(data.password === "") &&
      validPhoneNumber === false &&
      !(data.phoneNumber === "")
    ) {
      handleApiCalling(data);
    }
  };

  // ==================== API Calling =============
  const handleApiCalling = async (sendData) => {
    try {
      const response = await axios.post(apiRoutes.signupURI, sendData, {
        // const response = await axios.post(baseURL, sendData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // const subData = await response.data;
      // console.log(response.data);
      // console.log(response.data.token);

      // dispatch(getData(response.data));
      localStorage.setItem("notebookToken", response.data.token);

      navigate("/");
    } catch (error) {
      // console.log("err", error.response.data.message);
      if (error.response.data.message === "username already exists") {
        setUsernameValidationMessage(error.response.data.message);
      } else {
        setUsernameValidationMessage("");
      }

      if (error.response.data.message === "email already exists") {
        setEmailValidationMessage(error.response.data.message);
      } else {
        setEmailValidationMessage("");
      }

      // alert(error.response.data.message);
    }
  };

  // =========== useEffect ============
  useEffect(() => {}, []);
  return (
    <>
      <div className={`${styles.main}`}>
        <div className={`${styles.signup_container}`}>
          <div className={`${styles.logo_box}`}>
            <img src={logo} alt="logo" className={`${styles.logo}`} />
          </div>
          <h2 className={`${styles.form_title}`}>Create your Account</h2>
          <form
            action=""
            className={`${styles.signup_form}`}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className={`${styles.div_wrapper}`}>
              {/* ===================== Full Name ======================= */}
              <div className={`${styles.form_input_box}`}>
                <label htmlFor="" className={`${styles.form_data_wrapper}`}>
                  <span className={`${styles.input_title}`}>Full Name</span>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    onChange={handleInputBox}
                    className={`${styles.input_box} ${
                      validName ? styles.invalid_input : styles.valid_input
                    }`}

                    // minLength="2"
                  />
                </label>
                {validName ? (
                  <span className={`${styles.invalid_user}`}>
                    *Enter Valid Name
                  </span>
                ) : null}
              </div>

              {/* ===================== username ======================= */}
              <div className={`${styles.form_input_box}`}>
                <label htmlFor="" className={`${styles.form_data_wrapper}`}>
                  <span className={`${styles.input_title}`}>Username</span>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    name="username"
                    onChange={handleInputBox}
                    // className={`${styles.input_box}`}
                    className={`${styles.input_box} ${
                      validUsername ? styles.invalid_input : styles.valid_input
                    }`}
                  />
                </label>
                {validUsername ? (
                  <span className={`${styles.invalid_user}`}>
                    *Enter valid username
                  </span>
                ) : usernamevalidationMessage ? (
                  <span className={`${styles.invalid_user}`}>
                    {usernamevalidationMessage}
                  </span>
                ) : null}
              </div>
            </div>

            <div className={`${styles.div_wrapper}`}>
              {/* ===================== Email ======================= */}
              <div className={`${styles.form_input_box}`}>
                <label htmlFor="" className={`${styles.form_data_wrapper}`}>
                  <span className={`${styles.input_title}`}>Email</span>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    onChange={handleInputBox}
                    // className={`${styles.input_box}`}
                    className={`${styles.input_box} ${
                      validEmail ? styles.invalid_input : styles.valid_input
                    }`}
                  />
                </label>
                {validEmail ? (
                  <span className={`${styles.invalid_user}`}>
                    *Invalid Email Address
                  </span>
                ) : emailvalidationMessage ? (
                  <span className={`${styles.invalid_user}`}>
                    {emailvalidationMessage}
                  </span>
                ) : null}
              </div>

              {/* ===================== Phone Number ======================= */}
              <div className={`${styles.form_input_box}`}>
                <label htmlFor="" className={`${styles.form_data_wrapper}`}>
                  <span className={`${styles.input_title}`}>Phone</span>
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    name="phoneNumber"
                    onChange={handleInputBox}
                    // className={`${styles.input_box}`}
                    className={`${styles.input_box} ${
                      validPhoneNumber
                        ? styles.invalid_input
                        : styles.valid_input
                    }`}
                  />
                </label>
                {validPhoneNumber ? (
                  <span className={`${styles.invalid_user}`}>
                    *Enter Valid phone number
                  </span>
                ) : null}
              </div>
            </div>

            <div className={`${styles.div_wrapper}`}>
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
                    *Password must be at least 8 characters
                  </span>
                ) : null}
              </div>

              {/* ===================== Confirm Password ======================= */}
              <div className={`${styles.form_input_box}`}>
                <label htmlFor="" className={`${styles.form_data_wrapper}`}>
                  <span className={`${styles.input_title}`}>
                    Confirm Password
                  </span>
                  {/* <input
                    type="password"
                    placeholder="Confirm your password"
                    className={`${styles.input_box}`}
                  /> */}
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
                    *Confirm Password doesn't match, Try again !
                  </span>
                ) : null}
              </div>
            </div>

            <div className={`${styles.div_wrapper}`}>
              <div className={`${styles.signup_box}`}>
                <button
                  className={`${styles.signup_button}`}
                  onClick={handleSubmit}
                >
                  Create an account
                </button>
              </div>
            </div>

            {/* <div className={`${styles.signup_box}`}>
             
            </div> */}
            <div className={`${styles.login}`}>
              <span className={`${styles.login_wrapper}`}>
                Already have an account?{" "}
                <Link to="/user/login" className={`${styles.login}`}>
                  Login here
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;

// name
// username
// email
// password

<div className={`${styles.main}`}>
  <div className={`${styles.signup_container}`}>
    <div className={`${styles.logo_box}`}>
      <img src={logo} alt="logo" srcset="" className={`${styles.logo}`} />
    </div>
    <h2 className={`${styles.form_title}`}>Create your Account</h2>
    <form action="" className={`${styles.signup_form}`}>
      <div className={`${styles.div_wrapper}`}>
        {/* ===================== Full Name ======================= */}
        <div className={`${styles.form_input_box}`}>
          <label htmlFor="" className={`${styles.form_data_wrapper}`}>
            <span className={`${styles.input_title}`}>Full Name</span>
            <input
              type="text"
              placeholder="Enter your name"
              className={`${styles.input_box}`}
            />
          </label>
          {false ? (
            <span className={`${styles.invalid_user}`}>*Enter Full Name</span>
          ) : null}
        </div>

        {/* ===================== username ======================= */}
        <div className={`${styles.form_input_box}`}>
          <label htmlFor="" className={`${styles.form_data_wrapper}`}>
            <span className={`${styles.input_title}`}>Username</span>
            <input
              type="text"
              placeholder="Enter your username"
              className={`${styles.input_box}`}
            />
          </label>
          {false ? (
            <span className={`${styles.invalid_user}`}>Enter username</span>
          ) : null}
        </div>
      </div>

      <div className={`${styles.div_wrapper}`}>
        {/* ===================== Email ======================= */}
        <div className={`${styles.form_input_box}`}>
          <label htmlFor="" className={`${styles.form_data_wrapper}`}>
            <span className={`${styles.input_title}`}>Email</span>
            <input
              type="email"
              placeholder="Enter your email"
              className={`${styles.input_box}`}
            />
          </label>
          {false ? (
            <span className={`${styles.invalid_user}`}>Enter email</span>
          ) : null}
        </div>

        {/* ===================== Phone Number ======================= */}
        <div className={`${styles.form_input_box}`}>
          <label htmlFor="" className={`${styles.form_data_wrapper}`}>
            <span className={`${styles.input_title}`}>Phone</span>
            <input
              type="number"
              placeholder="Enter your phone number"
              className={`${styles.input_box}`}
            />
          </label>
          {false ? (
            <span className={`${styles.invalid_user}`}>Enter phone number</span>
          ) : null}
        </div>
      </div>

      <div className={`${styles.div_wrapper}`}>
        {/* ===================== Password ======================= */}
        <div className={`${styles.form_input_box}`}>
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
              Enter minimum 8 charecter
            </span>
          ) : null}
        </div>

        {/* ===================== Confirm Password ======================= */}
        <div className={`${styles.form_input_box}`}>
          <label htmlFor="" className={`${styles.form_data_wrapper}`}>
            <span className={`${styles.input_title}`}>Confirm Password</span>
            <input
              type="password"
              placeholder="Confirm your password"
              className={`${styles.input_box}`}
            />
          </label>
          {false ? (
            <span className={`${styles.invalid_user}`}>Confirm password</span>
          ) : null}
        </div>
      </div>

      <div className={`${styles.signup_box}`}>
        <button className={`${styles.signup_button}`}>Create an account</button>
      </div>
      <div className={`${styles.login}`}>
        <span className={`${styles.login_wrapper}`}>
          Already have an account?{" "}
          <Link to="/login" className={`${styles.login}`}>
            Login here
          </Link>
        </span>
      </div>
    </form>
  </div>
</div>;
