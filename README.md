# 📓 Notebook - Secure Note-Taking Platform

Notebook is a secure, full-featured note-taking platform built with the MERN stack. It offers robust features for managing, securing, and organizing your notes, making it an ideal tool for both personal and professional use.


## 🔗 Live Demo

Check out the live demo of the Notebook project [here](https://notebook7.netlify.app/).


## 🚀 Features

- Secure User Authentication: Register and login with secure authentication to protect your notes.
- Note Management: Easily create, update, and delete notes.
- Export Options: Export your notes as PDF or TXT files for sharing or backup.
- Clipboard Copy: Copy notes directly to your clipboard with a single click.
- File Import: Import notes seamlessly from TXT files.
- Advanced Search & Sorting: Quickly find and organize notes with powerful search and sorting tools.
- Checklist Functionality: Create and manage tasks within your notes using checklists.


## 🛠️ Technologies Used

**Client:** React, Redux, TailwindCSS, Axios

**Server:** Node, Express

**Database:** MongoDB


## 🖥️ Installation

### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB installed and running locally or have access to a MongoDB Atlas cluster.


### Clone the Repository
```bash
 git clone https://github.com/jabedalimollah/notebook.git
 cd notebook
```
### Backend Setup
- Navigate to the backend directory:

    ```bash
    cd backend
    ```
- Install the required dependencies:
    ```bash
    npm install
    ```
- Create a .env file in the backend directory and add your environment variables:
    ```bash
    MONGO_URI=<your_mongo_db_connection_string>
    JWT_SECRET=<your_jwt_secret_key>
    PORT=5000
    DB_NAME=<your_database_name>
    CORS_ORIGIN=<cors_origin>
    ```
- Start the backend server
    ```bash
    npm run dev
    ```

### Frontend Setup
- Navigate to the frontend directory:

    ```bash
    cd frontend
    ```
- Install the required dependencies:

    ```bash
    npm install
    ```
- Create a .env file in the frontend directory and add your environment variables:
    ```bash
    VITE_APP_CONTACT_URL=<contact form url>
    VITE_APP_API_KEY=http://localhost:5000/api
    ```
- Start the frontend development server:
    ```bash
    npm run dev
    ```

### Running the Application
- Ensure both the frontend and backend servers are running.
- Open your browser and navigate to http://localhost:5173.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
### Frontend

`VITE_APP_CONTACT_URL`

`VITE_APP_API_KEY`

### Backend

`PORT`

`MONGODB_URI`

`DB_NAME`

`JWT_SECRET_KEY`

`CORS_ORIGIN`


![Logo](https://github.com/jabedalimollah/notebook/blob/d2eb6e6e0c363afdf0d4aa2ac688d296af7f3a9a/frontend/public/notebook.png?raw=true)


## Screenshots

![App Screenshot](https://media.licdn.com/dms/image/v2/D5622AQEb7iH27v0FZA/feedshare-shrink_800/feedshare-shrink_800/0/1723743354251?e=2147483647&v=beta&t=fWQgzRzGRMW2KoqFS6o6ShwLNuD3ZZmVzGF7-aGfRKc)

![App Screenshot](https://media.licdn.com/dms/image/v2/D5622AQHipsjZyfty6w/feedshare-shrink_800/feedshare-shrink_800/0/1723743350107?e=2147483647&v=beta&t=Zfp0AeVH0It7jp5bvbkeSUh49awq5IgYDbgj_G4Wi00)

![App Screenshot](https://media.licdn.com/dms/image/v2/D5622AQFlv6Wcn9HQoA/feedshare-shrink_800/feedshare-shrink_800/0/1723743357484?e=2147483647&v=beta&t=Xv9HzG0u3SMjGjWjjITRJ3vQWQNe_EsXYvexlUp5dO0)




## 📧 Contact

- Email: jabedalimollah7@gmail.com
- LinkedIn: [Jabed Ali Mollah](https://www.linkedin.com/in/jabedalimollah)
- GitHub: [Jabed Ali Mollah](https://github.com/jabedalimollah)

#

If you find this project useful, don't forget to star the repository! ⭐

#


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://jabedalimollah.netlify.app/)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jabedalimollah/)

[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/JabedAliMollah7)

