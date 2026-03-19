# PBL1 [ KRUSHIBOT ] — A Semi-Autonomous 4G-Enabled Smart Agricultural Rover for Precision Ploughing, Seeding, and Irrigation

## Overview

PBL1 is a full-stack web application designed to deliver a responsive, visually immersive interface combined with a secure and efficient authentication system. The platform integrates modern frontend rendering techniques with a robust backend architecture to ensure both performance and reliability.

The system emphasizes minimal latency, clean authentication flow, and structured scalability, making it suitable for real-world deployment scenarios.



## Core Features

### 1. Secure Operator Authentication

* Operator-based login system using **operator ID and password**
* Passwords securely hashed using **bcrypt**
* Stateless authentication via **JWT**
* Protected routes using middleware
* Automatic redirection for unauthorized access



### 2. User Lifecycle Management

* Dedicated **signup flow** for new users
* Persistent storage of user credentials in **MySQL**
* Validation for duplicate users (operator ID / email)
* Seamless transition between signup and login



### 3. Performance-Oriented Architecture

* Optimized backend queries using indexed fields
* Non-blocking asynchronous request handling
* Reduced authentication latency (no OTP overhead)
* Clean separation of concerns (routes, controllers, middleware)



### 4. Interactive Frontend Experience

* Fullscreen responsive layout
* Integrated **3D model rendering using Three.js**
* Smooth scroll based transitions
* Minimal and focused UI design



### 5. Structured Backend Design

* RESTful API architecture
* Modular folder structure:

  ```
  server/
    ├── controllers/
    ├── routes/
    ├── middleware/
    ├── db.js
    └── server.js
  ```
* Clear separation between business logic and routing

---

## Technology Stack

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript
* Three.js (3D rendering)
* GSAP (animations)

### Backend

* Node.js
* Express.js

### Database

* MySQL

### Security

* bcrypt (password hashing)
* JSON Web Tokens (JWT)

---

## Authentication Flow

```
New User
→ Signup
→ Stored in MySQL

Existing User
→ Login (operator_id + password)
→ Credentials Verified
→ JWT Generated
→ Access Dashboard
```

---

## Project Structure

```
pbl1/
 ├── public/
 │    ├── login.html
 │    ├── signup.html
 │    ├── dashboard.html
 │    ├── js/
 │    └── css/
 │
 ├── server/
 │    ├── controllers/
 │    ├── routes/
 │    ├── middleware/
 │    ├── db.js
 │    └── server.js
 │
 ├── assets/
 │    └── model.glb
 │
 ├── package.json
 └── .env
```

---

## Setup Instructions

### 1. Clone Repository

```
git clone https://github.com/<your-username>/pbl1.git
cd pbl1
```

### 2. Install Dependencies

```
npm install
```

### 3. Configure Environment Variables

Create `.env`:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=pbl1
JWT_SECRET=your_secret_key
```

### 4. Run Server

```
node server/server.js
```

### 5. Launch Frontend

Use Live Server or open `login.html`.



## Design Principles

* Deterministic authentication flow (no ambiguity in access control)
* Minimal latency and reduced blocking operations
* Clear separation of frontend and backend responsibilities
* Scalable architecture for future expansion
* Security-first implementation



## Future Enhancements

* Role-based access control (RBAC)
* Audit logging and monitoring
* API rate limiting and advanced security hardening
* Deployment with containerization (Docker)
* Cloud-based database integration



## Authors

Nilesh Sethi |
Sai Randive  |
Yash Samtani |
Vaishnovi Bhosle 

BTech Computer Science Engineering

---

## License

This project is intended for academic and development purposes.
