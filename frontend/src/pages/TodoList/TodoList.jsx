import SidebarMenu from "@/common/SidebarMenu/SidebarMenu";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
Modal.setAppElement("#root");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// ================ Todo List Component Start =================
const TodoList = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [listData, setListData] = useState([]);
  const [listItem, setListItem] = useState("");
  const [indexNo, setIndexNo] = useState(null);
  const [checkBox, setCheckBox] = useState([]);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  function closeUpdateModal() {
    setUpdateModal(false);
  }
  function openUpdateModal() {
    setUpdateModal(true);
  }

  const getData = (listContent) => {
    let data = listData;
    let temp = data.push(listContent);

    setListData(data);
  };

  const updateData = (data, index) => {
    openUpdateModal();
    setListItem(data);

    setIndexNo(index);
  };
  const updateListValue = (data) => {
    listData[indexNo] = data;
  };
  const handleDeleteBtn = (listIndex) => {
    setListData(listData.filter((item, index) => !(listIndex === index)));
  };

  const handleCheckBox = (index) => {};
  return (
    <>
      <div className="w-full  flex flex-col box-border">
        <div className="w-full h-screen pt-10 flex ">
          <SidebarMenu />
          <div className="w-full flex justify-center  bg-green-100  ">
            <div className="w-11/12 md:w-10/12 bg-green-50 shadow-lg shadow-gray-400  py-5  px-6 flex flex-col items-center">
              <h1 className="text-2xl font-bold uppercase text-center text-green-900 py-3">
                Todo List
              </h1>
              <span className="text-red-500 w-full flex justify-center my-4  text-sm text-center md:text-base">
                Note :- This data will destroy if you close this tab or refresh
                this tab
              </span>
              <div className="w-full flex justify-between px-1 md:px-5 text-sm md:text-base">
                <button
                  onClick={openModal}
                  className="bg-green-700 hover:bg-green-800 text-white py-1 px-3 rounded"
                >
                  Add Task
                </button>
                <button
                  onClick={() => setListData([])}
                  className="bg-red-700 hover:bg-red-800 text-white py-1 px-3 rounded"
                >
                  Delete All
                </button>
              </div>
              <div className="borders border-black my-3 px-1 md:px-5 bg-gray-200s w-full overflow-auto">
                {!(listData.length === 0) ? (
                  listData.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center px-3  bg-gray-200s bg-green-100 py-3 my-3 rounded shadow-md"
                    >
                      <div className={`flex gap-x-1`}>
                        <input
                          type="checkbox"
                          name={index}
                          id={index}
                          // checked={item.checked}
                          onChange={() => handleCheckBox(index)}
                        />
                        <label htmlFor={index} className={``}>
                          {item}
                        </label>
                      </div>

                      <div className="flex gap-x-2">
                        <button
                          className="flex text-green-700 text-xl md:text-2xl bg-whites"
                          onClick={() => updateData(item, index)}
                        >
                          <FaEdit />
                          {/* Edit */}
                        </button>
                        <button
                          className="flex text-red-900 text-xl md:text-2xl"
                          onClick={() => handleDeleteBtn(index)}
                        >
                          <MdDelete />
                          {/* Delete */}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center  bg-gray-200 py-2 md:p-4">
                    Empty List
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* =============== Add Task Modal ==================== */}

      <CreateAndUpdateList
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        getData={getData}
      />
      {/* =============== Update Task Modal ==================== */}
      {updateModal ? (
        <UpdateDataList
          updateModal={updateModal}
          closeUpdateModal={closeUpdateModal}
          updateListValue={updateListValue}
          listItem={listItem}
        />
      ) : (
        ""
      )}
    </>
  );
};

const CreateAndUpdateList = ({ modalIsOpen, closeModal, getData }) => {
  const [listContent, setListContent] = useState();
  const handleAddBtn = () => {
    closeModal();
    getData(listContent);
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={
        "absolute top-1/3 left-11 md:left-1/3 lg:left-1/2 right-auto mr-auto"
      }
      contentLabel="Create Model"
    >
      <div className=" p-6 background_gradient_colors bg-green-50 shadow-lg shadow-gray-500 rounded flex flex-col gap-y-3">
        <h1>Create List</h1>
        <input
          type="text"
          placeholder="Add Task"
          onChange={(e) => setListContent(e.target.value)}
          className="py-2 px-3 outline-none border border-green-700 rounded"
        />
        <div className="flex justify-between">
          <button
            className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
            onClick={closeModal}
          >
            Close
          </button>
          <button
            onClick={handleAddBtn}
            className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </Modal>
  );
};

const UpdateDataList = ({
  updateModal,
  closeUpdateModal,
  updateListValue,
  listItem,
}) => {
  const [listContent, setListContent] = useState("");
  const handleInputChange = (e) => {
    setListContent(e.target.value);
  };

  const handleAddBtn = () => {
    updateListValue(listContent);

    closeUpdateModal();
  };

  useEffect(() => {
    setListContent(listItem);
  }, []);
  return (
    <div
      className={
        "w-full h-dvh fixed top-0 left-0 flex justify-center items-center bg-green-100"
      }
    >
      <div className=" p-6 background_gradient_colors bg-green-50 shadow-lg shadow-gray-500 rounded flex flex-col gap-y-3">
        <h1>Update List</h1>
        <input
          type="text"
          placeholder="Add Task"
          value={listContent}
          onChange={handleInputChange}
          className="py-2 px-3 outline-none border border-green-700 rounded"
        />
        <div className="flex justify-between">
          <button
            className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
            onClick={closeUpdateModal}
          >
            Close
          </button>
          <button
            onClick={handleAddBtn}
            className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
export default TodoList;
