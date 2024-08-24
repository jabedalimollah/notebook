import { DeleteNotesData, GetNotes } from "@/utils/notesApiCalling";
import React, { useState } from "react";
import Loading from "../Loading/Loading";

const DeleteNotes = ({ handleDeleteBtn, notesId }) => {
  const [loading, setLoading] = useState(false);
  const handleDeleteData = async () => {
    setLoading(true);
    let res = await DeleteNotesData(notesId);
    // console.log(res);

    if (res === "success") {
      //   GetNotes();
      handleDeleteBtn();
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? <Loading /> : ""}
      <div className="w-full h-dvh bg-green-100/85 flex justify-center items-center z-20 fixed top-0 left-0">
        <div className="w-10/12 md:w-6/12 lg:w-3/12 background_gradient_color p-3 md:p-8 flex flex-col justify-center items-center rounded-lg shadow-2xl gap-y-2">
          <h1 className="text-2xl text-red-700">Delete Notes</h1>
          <p className="text-sm md:text-base">
            Are you sure you want to delete this notes ?
          </p>
          <div className="w-full flex justify-center gap-x-4 text-sm md:text-base">
            <button
              onClick={() => handleDeleteBtn()}
              className="bg-gray-300 py-1 px-3 rounded shadow-mds  shadow-gray-400 hover:bg-blue-400 hover:text-white hover:shadow-none"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteData}
              className="bg-red-600 text-white py-1 px-3 rounded shadow-mds shadow-red-400 hover:bg-red-700 hover:shadow-none"
            >
              Delete
            </button>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default DeleteNotes;
