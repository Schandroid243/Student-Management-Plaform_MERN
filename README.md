<h1 align="center">
    SCHOOL MANAGEMENT SYSTEM
</h1>

<h3 align="center">
Streamline school management, class organization, and add students and faculty.<br>
Seamlessly track attendance, assess performance, and provide feedback. <br>
Access records, view marks, and communicate effortlessly.
</h3>

<br>

# About

The School Management System is a web-based application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It aims to streamline school management, class organization, and facilitate communication between students, teachers, and administrators.

## Features

- **User Roles:** The system supports three user roles: Admin, Teacher, and Student. Each role has specific functionalities and access levels.

- **Admin Dashboard:** Administrators can add new students and teachers, create classes and subjects, manage user accounts, and oversee system settings.

- **Attendance Tracking:** Teachers can easily take attendance for their classes, mark students as present or absent, and generate attendance reports.

- **Performance Assessment:** Teachers can assess students' performance by providing marks and feedback. Students can view their marks and track their progress over time.

- **Data Visualization:** Students can visualize their performance data through interactive charts and tables, helping them understand their academic performance at a glance.

- **Communication:** Users can communicate effortlessly through the system. Teachers can send messages to students and vice versa, while admins can access the communications across all platforms promoting effective communication and collaboration.

## Technologies Used

- Frontend: React.js, Material UI, Redux
- Backend: Node.js, Express.js
- Database: MongoDB

<br>

# Installation

```sh
git clone https://github.com/Yogndrr/MERN-School-Management-System.git
```
Open 2 terminals in separate windows/tabs.

Terminal 1: Setting Up Backend 
```sh
cd backend
npm install
npm start
```

Terminal 2: Setting Up Frontend
```sh
cd frontend
npm install
npm start
```
Now, navigate to `localhost:3000` in your browser. 
The Backend API will be running at `localhost:5000`.

<br>

# Deployment
* Currenly running the application Locally
  
# Security Features
 1. A password Validator. 
 In the platform the Admin registers themselves and a school.
 They then enroll Teachers and students
To ensure the Admins set strong password, I am suing a password validator creteria and a retype password confirmation
https://github.com/WahomeKezia/Student-Management-Plaform_MERN/blob/main/images/CodeSnippet.png  I also tested the same on Postman here : https://github.com/WahomeKezia/Student-Management-Plaform_MERN/blob/main/images/PostmanAPItesting.png

# Main Interfaces 
1. Home page
   https://github.com/WahomeKezia/Student-Management-Plaform_MERN/blob/main/images/HomePage.png
2. Choose Login according to role
   https://github.com/WahomeKezia/Student-Management-Plaform_MERN/blob/main/images/InterfacesforLogin.png
3.Database from Mongo
  https://github.com/WahomeKezia/Student-Management-Plaform_MERN/blob/main/images/Database.png

For more of the UserInterface , find the screenshots in the images folder
   


