import React, { useEffect, useState } from "react";
// import { Label } from "../ui/";
import { Switch } from "../ui/switch";
import { BiSolidLock } from "react-icons/bi";
import { BiSolidLockOpen } from "react-icons/bi";
import { useParams } from "react-router-dom";
const NotesLockBtn = ({ handlelockBtn, handleNotesPasswordReturn, data }) => {
  // ------------------ State Start ----------------
  const [switchChecked, setSwitchChecked] = useState("");
  const [passwordDetails, setPasswordDetails] = useState({
    isPasswordProtected: false,
    password: "",
    confirmNotesPassword: "",
  });

  // ----------------- State End ---------------
  //   ----------------- Get params Data ----------
  const { notes_id } = useParams(); // get params data [ notes id ]

  const handleNotesPasswordInput = (e) => {
    // console.log(switchChecked);
    setPasswordDetails({
      ...passwordDetails,

      [e.target.name]: e.target.value,
    });
    // setPasswordDetails({
    //   ...passwordDetails,
    //   isPasswordProtected: switchChecked,
    //   [e.target.name]: e.target.value,
    // });
  };

  // ================ Handle Password Save Button ============
  const handlePasswordSaveBtn = () => {
    // console.log(passwordDetails);
    if (!(passwordDetails.password === "")) {
      handleNotesPasswordReturn(passwordDetails);
      handlelockBtn();
    }
  };

  const passwordExist = () => {
    setPasswordDetails({
      isPasswordProtected: data.isPasswordProtected,
      password: data.password,
      confirmNotesPassword: data.password,
    });
  };

  // =============== useEffect ============
  useEffect(() => {
    notes_id ? passwordExist() : null;
  }, []);
  return (
    <>
      <div className="w-full h-dvh fixed top-0 left-0 flex justify-center items-center z-50  bg-green-100/75">
        <div className="w-9/12 md:w-6/12 lg:w-3/12 flex flex-col p-6  gap-y-3 background_gradient_color shadow-xl shadow-gray-400 rounded-lg">
          <h1 className="text-2xl text-green-700 font-bold"> Lock Notes</h1>
          <h2 className="text-green-700">Protect your notes</h2>
          <div className="flex gap-x-3 items-center">
            <Switch
              id="lock-mode"
              checked={passwordDetails.isPasswordProtected}
              // checked={switchChecked}
              // onClick={() => setSwitchChecked(!switchChecked)}
              // onClick={() =>
              //   setPasswordDetails({
              //     isPasswordProtected: !passwordDetails.isPasswordProtected,
              //   })
              // }
              onClick={() =>
                setPasswordDetails({
                  ...passwordDetails,
                  isPasswordProtected: !passwordDetails.isPasswordProtected,
                })
              }
            />
            <label htmlFor="lock-mode">
              {/* {switchChecked ? ( */}
              {passwordDetails.isPasswordProtected ? (
                <BiSolidLock className="text-2xl" />
              ) : (
                <BiSolidLockOpen className="text-2xl" />
              )}
            </label>
          </div>
          <div className="w-full flex">
            <input
              type="password"
              placeholder="Enter new password "
              name="password"
              defaultValue={passwordDetails.password}
              // value={passwordDetails.password}
              onChange={handleNotesPasswordInput}
              disabled={!passwordDetails.isPasswordProtected}
              className={`mb-3 px-3 py-2 w-full outline-none border-1  shadow-gray-400 shadow-inner border-green-600 rounded flex`}
            />
          </div>
          <div className="w-full flex flex-col gap-y-2">
            <input
              type="password"
              placeholder="Enter Confirm password "
              name="confirmNotesPassword"
              // value={passwordDetails.confirmNotesPassword}
              defaultValue={passwordDetails.confirmNotesPassword}
              onChange={handleNotesPasswordInput}
              disabled={!passwordDetails.isPasswordProtected}
              className={`px-3 py-2 w-full outline-none border-1  shadow-gray-400 shadow-inner border-green-600 rounded flex`}
            />
            {passwordDetails.password ===
            passwordDetails.confirmNotesPassword ? (
              ""
            ) : (
              <span className="text-red-800">*Password are not matching</span>
            )}
          </div>
          <div className="w-full flex justify-between p-2">
            <button
              onClick={() => handlelockBtn()}
              className="bg-red-400 text-white px-3 py-1 rounded shadow-xl hover:bg-red-700"
            >
              Back
            </button>
            <button
              onClick={handlePasswordSaveBtn}
              className="bg-blue-400 text-white px-3 py-1 rounded shadow-xl hover:bg-blue-700"
            >
              Save
            </button>
          </div>

          {/* <Label htmlFor="airplane-mode">Airplane Mode</Label> */}
        </div>
      </div>
    </>
  );
};

export default NotesLockBtn;
