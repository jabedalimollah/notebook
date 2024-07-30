import SidebarMenu from "@/common/SidebarMenu/SidebarMenu";
import React from "react";

const features = [
  {
    title: "Create and Edit Notes",
    text: " Effortlessly write and format your notes with our intuitive editor.",
  },
  {
    title: "Protect Your Privacy",
    text: "Keep your notes secure with password protection and encryption.",
  },
  {
    title: "Export and Share",
    text: "Export your notes to PDF or Txt, or copy them to your clipboard with ease.",
  },
  {
    title: "Manage To-Do Lists",
    text: "Stay on top of your tasks with our versatile to-do list feature",
  },
  {
    title: "Customize Your Experience",
    text: " Choose from a variety of themes and styles to personalize your notebook.",
  },
  {
    title: "Search and Sort",
    text: "Quickly find and organize your notes with our powerful search and sort functions.",
  },
  {
    title: "User Accounts",
    text: " Create an account to access your notes from any device, update your profile, and ensure your data is safe",
  },
];
const choosePoint = [
  {
    title: "User-Friendly",
    text: "Our interface is designed to be simple and intuitive, so you can focus on what matters.",
  },
  {
    title: "Secure",
    text: "We prioritize your privacy and data security, with robust protection measures in place.",
  },
  {
    title: "Flexible",
    text: "From note-taking to task management, Notebook adapts to your workflow and preferences.",
  },
  {
    title: "Beautiful Content",
    text: "With rich text formatting and media support, your notes will always look great.",
  },
];
const About = () => {
  return (
    <>
      <div className="w-full  flex flex-col box-border">
        <div className="w-full h-screen pt-10 flex ">
          <SidebarMenu />
          <div className="w-full flex justify-center  overflow-auto">
            <div className="w-11/12 mt-10">
              <h1 className="text-2xl md:text-4xl font-bold text-green-700 pl-4 md:pl-4 ">
                About Us
              </h1>
              <hr className="border border-green-800 w-full" />
              <div className="mt-3 flex flex-col md:flex-row justify-between items-centers">
                <div className="w-full md:w-6/12 lg:w-6/12 p-4 text-sm md:text-base lg:text-xl">
                  <p>
                    Welcome to Notebook, your ultimate tool for capturing
                    thoughts, organizing tasks, and creating beautiful content.
                    Whether you're a student, professional, or just someone who
                    loves to jot down ideas, Notebook is designed to meet your
                    needs with simplicity and style.
                  </p>
                  <h3 className="text-xl md:text-2xl mt-5 text-green-700">
                    Our Mission
                  </h3>
                  <hr className="border border-green-800 w-full mb-4" />
                  <p>
                    At Notebook, our mission is to provide a seamless and secure
                    environment for your notes and tasks. We believe that
                    organization and creativity go hand-in-hand, and our goal is
                    to empower you with the tools to achieve both.
                  </p>
                </div>

                <div className="w-full md:w-6/12 lg:w-5/12">
                  <img
                    src="https://cdn.pixabay.com/photo/2023/11/08/17/08/ai-generated-8375334_1280.jpg"
                    // src="https://cdn.pixabay.com/photo/2024/04/28/10/15/ai-generated-8725235_960_720.jpg"
                    // src="https://cdn.pixabay.com/photo/2016/05/30/14/46/man-1424877_1280.png"
                    // src="https://cdn.pixabay.com/photo/2023/07/30/11/39/girl-8158685_1280.jpg"
                    // src="https://cdn.pixabay.com/photo/2018/02/08/10/22/desk-3139127_960_720.jpg"
                    // src="https://cdn.pixabay.com/photo/2024/07/25/22/27/presentation-8922370_1280.jpg"
                    alt="about_us"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="mt-3 flex flex-col-reverse md:flex-col lg:flex-row items-center lg:items-start">
                <div className="w-9/12 lg:w-4/12 ">
                  <img
                    className="w-full"
                    src="https://cdn.pixabay.com/photo/2024/04/28/10/15/ai-generated-8725235_960_720.jpg"
                    alt="https://cdn.pixabay.com/photo/2024/04/28/10/15/ai-generated-8725235_960_720.jpg"
                  />
                </div>
                <div className="w-full lg:w-auto p-4 text-sm md:text-base lg:text-xl">
                  <h2 className="text-xl md:text-2xl text-green-700 font-bold">
                    Features
                  </h2>
                  <hr className="border border-green-800 w-full mb-4" />
                  <ul className="w-full ">
                    {features.map((item, index) => (
                      <li
                        key={index}
                        className="flex flex-col md:flex-row gap-x-2 my-3 text-base flex-shrink "
                      >
                        <span className="font-bold min-w-fit  ">
                          {/* 🌟 */}
                          {/* ⭐ */}✨{item.title}:{" "}
                        </span>
                        <p className="text-sm md:text-base">{item.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="w-full flex flex-col items-center justify-center pb-4">
                <h2 className="text-xl md:text-2xl font-bold text-green-700">
                  Why Choose Notebook?
                </h2>
                <hr className="border border-green-800 w-full mb-4 mt-2" />
                <ul className="">
                  {choosePoint.map((item, index) => (
                    <li
                      key={index}
                      className="flex flex-col md:flex-row gap-x-2 my-2"
                    >
                      <span className="font-bold text-green-700">
                        {item.title} :
                      </span>
                      <p className="text-sm md:text-base">{item.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <hr className="border border-green-800 w-full mb-4 mt-2" />
              <p className="text-xs md:text-base py-3 text-center">
                Thank you for choosing Notebook. We look forward to helping you
                stay organized and inspired.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
