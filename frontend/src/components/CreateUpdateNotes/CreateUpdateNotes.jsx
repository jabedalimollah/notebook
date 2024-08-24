import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosSave } from "react-icons/io";
import { FaFileImport } from "react-icons/fa6";
import { jwtDecode } from "jwt-decode";
import { PostNotes, FindNotes, UpdateNotesData } from "@/utils/notesApiCalling";
import { FaFileExport } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { IoReorderFourOutline } from "react-icons/io5";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import NotesLockBtn from "../NotesLockBtn/NotesLockBtn";
import { IoIosLock } from "react-icons/io";
import { LuEqualNot } from "react-icons/lu";
import { jsPDF } from "jspdf";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { FaMicrophone } from "react-icons/fa6";
import { FaRegStopCircle } from "react-icons/fa";
import { FaDotCircle } from "react-icons/fa";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { IoIosCopy } from "react-icons/io";
import useClipboard from "react-use-clipboard";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../Loading/Loading";

// ============ JWT Token ===============
const token = localStorage.getItem("notebookToken");
const user = token ? jwtDecode(token) : null; // jwtDecode is for extract user id

// ------------------- Component Start -------------------
const CreateUpdateNotes = () => {
  // ================== State Start ====================
  const [data, setData] = useState({
    title: "",
    text: "",
    author: "",
    isPasswordProtected: false,
    password: null,
  });
  const [currentDate, setCurrentDate] = useState({
    date: "",
    time: "",
  });

  const [optionBtn, setOptionBtn] = useState(false);
  const [lockBtn, setLockBtn] = useState(false);
  const [passwordProtection, setPasswordProtection] = useState(false);
  const [lineHide, setLineHide] = useState(true);
  const [speakerBtn, setSpeakerBtn] = useState(false);
  const [micBtn, setMicBtn] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= State End ========================
  const [isCopied, setCopied] = useClipboard(`${data.title}\n${data.text}`, {
    // const [isCopied, setCopied] = useClipboard(data.text, {
    successDuration: 1000,
  });
  const Navigate = useNavigate();
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  //   ----------------- Get params Data ----------
  const { notes_id } = useParams(); // get params data [ notes id ]

  // ================ handle Input Change ===================
  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // setCopied(data.text);
  };

  //   =============== Find Notes Data ==================
  const findNotesData = async () => {
    setLoading(true);
    let existNotes = await FindNotes(notes_id);
    setLoading(false);
    // ----------------- This is for "dd"/"mm"/"yyyy" format -----------------------
    let updateDate = existNotes.updatedAt
      .split("T")[0]
      .split("-")
      .reverse()
      .reduce((acc, char) => `${acc}-${char}`);

    //   -------------- This is for "hh":"mm":"ss" format -------------------
    let updateTime = existNotes.updatedAt.split("T")[1].split(".")[0];
    setData(existNotes);
    setPasswordProtection(existNotes.isPasswordProtected);
    // setData({ title: existNotes.title, text: existNotes.text });
    setCurrentDate({ date: updateDate, time: updateTime });
    // console.log(existNotes.updatedAt.split("T")[1].split(".")[0]);
  };

  // ============= handle Save Button =================
  const handleSaveBtn = async () => {
    if (data.title === "") {
      toast.info("Write Title", {
        position: "top-center",
      });
    }

    if (notes_id) {
      if (!(data.title === "")) {
        let newData = await UpdateNotesData(notes_id, data);
        setData({ title: newData.title, text: newData.text });
        let updateDate = newData.updatedAt
          .split("T")[0]
          .split("-")
          .reverse()
          .reduce((acc, char) => `${acc}-${char}`);
        let updateTime = newData.updatedAt.split("T")[1].split(".")[0];
        setCurrentDate({ date: updateDate, time: updateTime });
        Navigate("/user/notes");
      }
    } else {
      if (!(data.title === "")) {
        PostNotes(data);
        // console.log(data);
        Navigate("/user/notes");
      }
    }
  };

  // ====================== Speaker Button ==================

  const handleSpeakerBtn = (toggle) => {
    setSpeakerBtn(toggle);

    const utterance = new SpeechSynthesisUtterance(data.text);

    // Select a voice
    const voices = speechSynthesis.getVoices();

    utterance.voice = voices[0]; // Choose a specific voice

    // Speak the text

    window.speechSynthesis.cancel();
    if (toggle) {
      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
    }

    // console.log(utterance)
    // window.speechSynthesis.pause();
  };

  // ==================== Microphone Button ===================
  const startListening = () => {
    return SpeechRecognition.startListening({
      continuous: true,
      language: "en-IN",
    });
  };
  if (!browserSupportsSpeechRecognition) {
    return null;
  }
  const handleMicrophoneBtn = () => {
    if (micBtn) {
      SpeechRecognition.stopListening();
      // setData({ ...data, text: transcript });
      setData({
        ...data,
        text: transcript,
      });
      setMicBtn(false);
    } else {
      startListening();
      setData({
        ...data,
        text: transcript,
      });
      // console.log(transcript);
      setMicBtn(true);
    }
    setData({
      ...data,
      text: transcript,
    });
  };

  // ===================== Copy to clipboard Button =========================
  const handleCopyToClipboard = () => {
    // setCopied(data.text);
    setCopied(`${data.title}\n${data.text}`);
    // console.log(isCopied);
  };

  // ============== Date and Time =============
  const handleDateAndTime = () => {
    let currentdate = new Date();
    let date =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear();
    let time = currentdate.getHours() + ":" + currentdate.getMinutes();

    setCurrentDate({ date, time });
  };

  // ======================= Handle Import File =====================
  const handleImportFile = (e) => {
    // let fileData = new FileReader();
    // fileData.readAsText(e.files[0]);
    // fileData.onload = function () {
    //   console.log(fileData.result);
    // };

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      // console.log(text);
      setData({ ...data, text: text });
      // alert(text)
    };
    reader.readAsText(e.target.files[0]);
  };

  // =================== Export Txt file Button ==================
  const handleExportTxtFile = () => {
    const value = { title: data.title, text: data.text };
    const element = document.createElement("a");

    const file = new Blob(
      [
        // document.getElementById("title").value,
        // "\n",
        document.getElementById("text").value,
      ],
      { type: "text/plain;charset=utf-8" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "My_Notebook_File.txt";
    // element.download = `${data.title}.txt`;
    // element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();
  };

  // ====================== Export PDF file Button ===========

  const handleExportPdfFile = () => {
    // const doc = new jsPDF();
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [297, 210], // A4 page size in mm
    });
    doc.setFontSize(12);
    doc.text(`${data.text}`, 10, 10);
    doc.save("My_Notebook_File.pdf");
  };

  // ============ Lock Button ===============
  const handlelockBtn = () => {
    // console.log("handle lock");
    setLockBtn(!lockBtn);
    // setOptionBtn(false);
    setOptionBtn(!optionBtn);
  };

  // ============ Lock Password Details ===========
  const handleNotesPasswordReturn = (notesPassword) => {
    setData({
      ...data,
      isPasswordProtected: notesPassword.isPasswordProtected,
      password: notesPassword.password,
    });
    // console.log(notesPassword);
  };

  //   ================= Handle Protect Password Verification Button ===================
  const handleProtectPasswordVerificationBtn = () => {
    setPasswordProtection(false);
  };

  // =========== useEffect ===============
  useEffect(() => {
    handleDateAndTime();
    setData({ ...data, author: user._id });
    notes_id ? findNotesData() : null;
  }, []);
  return (
    <>
      {loading ? <Loading /> : ""}
      {!passwordProtection ? (
        <>
          <div className="w-full  flex flex-col box-border">
            <div className="w-full h-screen pt-10 flex flex-col">
              <div className="w-full flex justify-between px-3 text-sm md:text-base md:px-6 py-1 md:py-2  bg-green-50">
                {/* ================= Back Button ============ */}
                <NavLink
                  to={"/user/notes"}
                  className={`flex items-center gap-x-1`}
                >
                  <IoMdArrowBack /> Back
                </NavLink>

                {/* ================= Speaker and Mic Button ================== */}
                <div className="flex gap-x-1 text-green-800">
                  {/* ================= Speaker Button ============= */}
                  <div className="flex">
                    {speakerBtn ? (
                      <button
                        onClick={() => handleSpeakerBtn(false)}
                        className="px-3 md:px-6 py-1 md:py-2  bg-green-200 active:bg-green-700 active:text-white rounded text-red-600"
                      >
                        <FaRegStopCircle />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSpeakerBtn(true)}
                        className="px-3 md:px-6 py-1 md:py-2  bg-green-200 active:bg-green-700 active:text-white rounded"
                      >
                        <HiMiniSpeakerWave />
                      </button>
                    )}
                  </div>
                  {/* ======================= Microphone Button ============================ */}
                  <div className="hidden">
                    {micBtn ? (
                      <button
                        // onClick={() => handleMicrophoneBtn(false)}
                        onClick={handleMicrophoneBtn}
                        className=" px-6 py-2 text-red-600  bg-green-200  active:bg-green-700 active:text-white rounded"
                      >
                        <FaDotCircle className={`animate-ping`} />
                      </button>
                    ) : (
                      <button
                        // onClick={startListening}
                        onClick={handleMicrophoneBtn}
                        // onClick={() => handleMicrophoneBtn(true)}
                        className=" px-6 py-2  bg-green-200  active:bg-green-700 active:text-white rounded"
                      >
                        <FaMicrophone />
                      </button>
                    )}
                  </div>
                  {/* ================================ Copy to Clipboard ========================= */}
                  <div className="flex ">
                    <button
                      onClick={handleCopyToClipboard}
                      className="flex items-center gap-x-1 px-6 py-1 md:py-2  bg-green-200  active:bg-green-700 active:text-white rounded"
                    >
                      {isCopied ? "copied" : "Copy"}

                      <IoIosCopy />
                    </button>
                  </div>
                </div>

                <div className="flex  gap-x-2 ">
                  {/* ================ Save Button ========== */}
                  <button
                    onClick={handleSaveBtn}
                    className={`bg-green-700 hover:bg-green-800 text-white  flex items-center gap-x-1 py-1 md:py-2 px-3 rounded-lg`}
                  >
                    <IoIosSave />
                    <span className="hidden md:inline-block">Save</span>
                  </button>
                  {/* ================== Option Button ==================== */}
                  {/* <button className="flex items-center px-2 border font-bold border-gray-800 text-gray-800 hover:bg-gray-600 hover:text-white py-2 rounded-lg">
                <BsThreeDotsVertical />
                Option
              </button> */}

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        onClick={() => setOptionBtn(true)}
                        className={`h-min md:h-auto`}
                        // className="flex items-center px-2 border font-bold border-gray-800 text-gray-800 hover:bg-gray-600 hover:text-white py-2 rounded-lg"
                      >
                        <BsThreeDotsVertical />
                        <span className="hidden md:inline-block">Option</span>
                      </Button>
                    </PopoverTrigger>
                    {optionBtn ? (
                      <PopoverContent className={`flex flex-col bg-green-100 `}>
                        {/* <div className="flex flex-col absolute top-24 right-12 bg-green-300 p-14 "> */}

                        {!notes_id ? (
                          // <label
                          <label
                            variant="text"
                            htmlFor="import_file"
                            // onClick={handleExportPdfFile}
                            className={`text-sm py-2 px-3 rounded-md flex justify-start items-center hover:bg-green-700 hover:text-white  relative outline-none `}
                          >
                            <input
                              type="file"
                              id="import_file"
                              name="import_file"
                              accept=".txt"
                              onChange={handleImportFile}
                              className="invisible w-full outline-none"
                            />{" "}
                            <span className="absolute w-full  flex items-center  gap-x-3">
                              {" "}
                              <FaFileImport className="text-sm" />
                              Import Text File
                              {/* <BiSolidFileImport /> */}
                            </span>
                          </label>
                        ) : (
                          ""
                        )}

                        <Button
                          variant="text"
                          onClick={handleExportPdfFile}
                          className={`flex justify-start gap-x-2 hover:bg-green-700 hover:text-white`}
                        >
                          <FaFileExport /> Export PDF File
                        </Button>
                        <Button
                          variant="text"
                          onClick={handleExportTxtFile}
                          className={`flex justify-start gap-x-2 hover:bg-green-700 hover:text-white`}
                        >
                          <FaFileExport /> Export Text File
                        </Button>
                        <Button
                          onClick={handlelockBtn}
                          variant="text"
                          className={`flex justify-start gap-x-2  hover:bg-green-700 hover:text-white`}
                        >
                          <IoMdLock />
                          {/* Lock */}
                          Protect Notes
                        </Button>
                        <Button
                          variant="text"
                          onClick={() => setLineHide(!lineHide)}
                          className={`flex justify-start gap-x-2  hover:bg-green-700 hover:text-white`}
                        >
                          {lineHide ? (
                            <>
                              <LuEqualNot />
                              Hide Line
                            </>
                          ) : (
                            <>
                              <IoReorderFourOutline />
                              Show Line
                            </>
                          )}
                        </Button>
                        {/* </div> */}
                      </PopoverContent>
                    ) : (
                      ""
                    )}
                  </Popover>
                </div>
              </div>
              {/* ===================== Title, Time And Notes Section ==================== */}
              <div className="w-full ">
                <div className="w-full flex justify-between ">
                  {/* ==================== Title Section =================== */}
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={data.title}
                    onChange={handleInputChange}
                    placeholder="Title : <Your Notes Title>"
                    className={`border-b-2 border-green-500 srounded py-2 w-7/12 md:w-6/12 px-4 outline-none `}
                  />
                  {/* ================ Date and Time Section ================= */}
                  <div className=" pr-6 text-gray-500 flex py-2 gap-x-2">
                    <span>
                      {currentDate.date}
                      {/* 21/07/2024 */}
                    </span>
                    <span>
                      {/* {currentDate.time} */}
                      {/* 11:57 am */}
                    </span>
                  </div>
                </div>
              </div>
              {/* ======================== Notes Section ============================ */}
              <textarea
                name="text"
                id="text"
                value={data.text}
                // value={data.text ? data.text : transcript}
                onChange={handleInputChange}
                placeholder="Write Here ... "
                className={`w-full h-dvh px-4 py-1 border border-green-700 outline-none ${
                  lineHide ? "textContent" : "textContentHide"
                } `}
              ></textarea>
            </div>
          </div>

          {lockBtn ? (
            <NotesLockBtn
              handlelockBtn={handlelockBtn}
              handleNotesPasswordReturn={handleNotesPasswordReturn}
              data={data}
            />
          ) : (
            ""
          )}
        </>
      ) : (
        // ============== Notes Password Verification Component ============
        <NotesPasswordVerification
          handleProtectPasswordVerificationBtn={
            handleProtectPasswordVerificationBtn
          }
          data={data}
        />
      )}
      <ToastContainer />
    </>
  );
};

// =============== Notes Password Verfication Component ================
const NotesPasswordVerification = ({
  handleProtectPasswordVerificationBtn,
  data,
}) => {
  //   ------------------- State Start -----------------
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState(false);

  // ----------------- State End -------------------
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordVerify = () => {
    if (data.password === password) {
      handleProtectPasswordVerificationBtn();
    } else {
      setPasswordMessage(true);
    }
  };
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center background_color">
        <div className="w-9/12 md:w-6/12 lg:w-3/12 rounded shadow-2xl background_gradient_color p-6 flex flex-col gap-y-3">
          <h1 className="text-2xl text-green-800 font-bold">Protected Notes</h1>
          <div className="w-full flex flex-col">
            <span className="text-green-900 flex gap-x-0.5 items-center">
              <IoIosLock /> Password
            </span>
            <input
              type="password"
              placeholder="Enter Your Password"
              onChange={handlePasswordInput}
              className="w-full outline-none p-2 border rounded-sm bg-gray-200/15 shadow-inner shadow-gray-800 border-green-700"
            />
            {passwordMessage ? (
              <span className="text-red-700">*Incorrect Password</span>
            ) : (
              ""
            )}
          </div>
          <div className="w-full flex justify-between">
            <NavLink
              to={"/user/notes"}
              className="px-3 py-1 rounded text-white bg-gray-600"
            >
              Back
            </NavLink>
            {/* <button className="px-3 py-1 rounded text-white bg-gray-600">
              Back
            </button> */}
            <button
              onClick={handlePasswordVerify}
              className="px-4 py-1 rounded text-white bg-green-600"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUpdateNotes;
