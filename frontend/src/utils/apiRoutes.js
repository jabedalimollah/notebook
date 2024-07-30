const apiRoutes = {
  signupURI: `${import.meta.env.VITE_APP_API_KEY}/user/signup`,
  loginURI: `${import.meta.env.VITE_APP_API_KEY}/user/login`,
  resetpasswordURI: `${import.meta.env.VITE_APP_API_KEY}/user/resetpassword`,
  userprofileURI: `${import.meta.env.VITE_APP_API_KEY}/user/userprofile`,
  updateUserProfileURI: `${import.meta.env.VITE_APP_API_KEY}/user/updateuser`,
  deleteUserProfileURI: `${import.meta.env.VITE_APP_API_KEY}/user/deleteuser`,

  createNotesURI: `${import.meta.env.VITE_APP_API_KEY}/notes/postdata`,
  getNotesURI: `${import.meta.env.VITE_APP_API_KEY}/notes/getdata`,
  findNotesURI: `${import.meta.env.VITE_APP_API_KEY}/notes/findnotes`,
  updateNotesURI: `${import.meta.env.VITE_APP_API_KEY}/notes/updatedata`,
  deleteNotesURI: `${import.meta.env.VITE_APP_API_KEY}/notes/deletedata`,
};

// const apiRoutes = {
//   signupURI: "http://localhost:8000/api/v1/user/signup",
//   loginURI: "http://localhost:8000/api/v1/user/login",
//   resetpasswordURI: "http://localhost:8000/api/v1/user/resetpassword",
//   userprofileURI: "http://localhost:8000/api/v1/user/userprofile",
//   updateUserProfileURI: "http://localhost:8000/api/v1/user/updateuser",
//   deleteUserProfileURI: "http://localhost:8000/api/v1/user/deleteuser",

//   createNotesURI: "http://localhost:8000/api/v1/notes/postdata",
//   getNotesURI: "http://localhost:8000/api/v1/notes/getdata",
//   findNotesURI: "http://localhost:8000/api/v1/notes/findnotes",
//   updateNotesURI: "http://localhost:8000/api/v1/notes/updatedata",
//   deleteNotesURI: "http://localhost:8000/api/v1/notes/deletedata",
// };

export { apiRoutes };
