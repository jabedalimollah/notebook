import React from "react";
import styles from "../../styles/navbar/navbar.module.css";
import logo from "/notebook.png";
const Navbar = () => {
  return (
    <div className={`${styles.main}`}>
      <header className={`${styles.header}`}>
        <div className={`${styles.logo_box}`}>
          <img src={logo} alt="logo" className={`${styles.logo}`} />
        </div>
      </header>
    </div>
  );
};

export default Navbar;
