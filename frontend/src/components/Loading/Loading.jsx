import React from "react";
import styles from "../../styles/loading/loading.module.css";
const Loading = () => {
  return (
    <div className="w-full h-dvh fixed top-0 left-0 z-50 background_color flex justify-center items-center">
      <div className="flex flex-col gap-y-5">
        {/* From Uiverse.io by doniaskima  */}
        <div className={styles.loader} />
        {/* 
      <div className={styles.load_row}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div> */}
        <div className={styles.loader3}>
          <div className={styles.circle1} />
          <div className={styles.circle1} />
          <div className={styles.circle1} />
          {/* <div className={styles.circle1} />
        <div className={styles.circle1} /> */}
        </div>
      </div>
    </div>
  );
};

export default Loading;
