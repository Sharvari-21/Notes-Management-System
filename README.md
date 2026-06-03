# Notes Management System

A full-stack Notes Management System developed as part of a Trainee Developer Assessment.

This submission includes:

* Task 1: Debugging and fixing the provided buggy JavaScript code
* Task 2: Building a complete Notes Management System with authentication and CRUD operations

---

## Project Overview

The application allows users to securely manage personal notes through a modern web interface.

### Features

* User Registration and Login
* JWT Authentication
* Create Notes
* View Notes
* Edit Notes
* Delete Notes
* Search Notes
* Protected Routes
* Responsive User Interface
* MongoDB Database Integration

---

## Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs

---

# Task 1: Bug Fixing Assignment

The provided debugging assignment contained multiple logical and implementation issues.

### Work Completed

* Identified bugs in the supplied code
* Corrected logic errors
* Fixed incorrect outputs
* Improved code reliability
* Verified expected behavior after fixes

### Location

```text
core/buggy-code/debugging-assignment.js
```

---

# Task 2: Notes Management System

## Authentication

Users can:

* Register an account
* Login securely
* Access protected routes using JWT authentication

---

## Notes Features

### Create Note

Users can create notes with:

* Title
* Content
* Tags

### View Notes

* Display all notes
* View note details

### Update Note

* Edit existing notes

### Delete Note

* Remove notes permanently

### Search Notes

* Search notes quickly by keywords

---

## Project Structure

```text
Notes-Management-System
│
├── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── context/
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── config/
│
└── core/
    └── buggy-code/
```

---

# API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

---

## Notes

### Get All Notes

```http
GET /api/notes
```

### Get Note By ID

```http
GET /api/notes/:id
```

### Create Note

```http
POST /api/notes
```

### Update Note

```http
PUT /api/notes/:id
```

### Delete Note

```http
DELETE /api/notes/:id
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Sharvari-21/Notes-Management-System.git
```

---

## Backend Setup

```bash
cd server
npm install
```

Create a `.env` file using `.env.example`.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

Run backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

---

# Screenshots

## Login Page

<img width="1388" height="842" alt="image" src="https://github.com/user-attachments/assets/3d3a03b0-2167-47eb-9c5c-6c92ce396d6d" />


---

## Registration Page

<img width="1408" height="1145" alt="image" src="https://github.com/user-attachments/assets/9f79dbfe-0e4d-43c5-ab8b-4856d838cc0a" />


---

## Notes Dashboard

<img width="1342" height="824" alt="image" src="https://github.com/user-attachments/assets/8a23a299-bd7f-4d12-8a7e-e0fe620d7317" />


---

## Create Note

<img width="1701" height="1190" alt="image" src="https://github.com/user-attachments/assets/eccbcb18-329c-4554-8546-62860125302d" />


---

## Edit Note

<img width="1701" height="1237" alt="image" src="https://github.com/user-attachments/assets/b20b97ec-2fd2-4dea-973c-af290fe0fc44" />


---

## Delete Note
<img width="1330" height="736" alt="image" src="https://github.com/user-attachments/assets/6a3ea6b7-9d4a-4d33-9d35-43a6580aa029" />
<img width="1358" height="772" alt="image" src="https://github.com/user-attachments/assets/e45a8a2e-6ef7-4526-afbd-c6b3e826e402" />




# Improvements With More Time

* Note categories and folders
* Rich text editor support
* Pagination for notes
* File attachments
* User profile management
* Unit and integration testing
* Docker deployment

---

# Learning Outcomes

Through this assignment I strengthened my understanding of:

* React application architecture
* REST API development
* MongoDB and Mongoose
* JWT Authentication
* Frontend-backend integration
* Debugging and troubleshooting existing codebases

---

# Author

**Sharvari More**

* GitHub: https://github.com/Sharvari-21

---

# Repository

GitHub Repository:

https://github.com/Sharvari-21/Notes-Management-System
