import React from "react";
import logo from "/notebook.png";
import { Link } from "react-router-dom";
import styles from "../../styles/login/login.module.css";
const Login = () => {
  return (
    <>
      <div className={`${styles.main}`}>
        <div className={`${styles.signup_container}`}>
          <div className={`${styles.logo_box}`}>
            <img src={logo} alt="logo" srcset="" className={`${styles.logo}`} />
          </div>
          <h2 className={`${styles.form_title}`}>Sign in to your account</h2>
          <form action="" className={`${styles.signup_form}`}>
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
                    Enter password
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
                to="/forgot_password"
                className={`${styles.forgot_password_text}`}
              >
                Forgot password?
              </Link>
            </div>
            {/* <div className={`${styles.div_wrapper}`}> */}
            <div className={`${styles.form_input_box}`}>
              <button className={`${styles.signup_button}`}>
                Log in to your account
              </button>
            </div>
            {/* </div> */}
            {/* <div className={`${styles.signup_box}`}></div> */}
            <div className={`${styles.login}`}>
              <span className={`${styles.login_wrapper}`}>
                Don’t have an account yet?{" "}
                <Link to="/signup" className={`${styles.login}`}>
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
