# 💼 OnlyJob

![Node.js](https://img.shields.io/badge/Node.js-v14+-green?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-4.x-black?logo=express)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?logo=mysql)
![License: ISC](https://img.shields.io/badge/License-ISC-yellow)
![Status](https://img.shields.io/badge/Status-Inactive-critical)

> **OnlyJob** — a modern job board platform built with **Node.js**, **Express**, and **MySQL**, designed for candidates, recruiters, and administrators.  
> Developed as part of the **Epitech Toulouse MSc Pro Program**.

---

## 📚 Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Database Overview](#database-overview)
- [Security](#security)
- [Test Accounts](#test-accounts)
- [Contributors](#contributors)
- [License](#license)
- [Notes](#notes)

---

## 🧩 Introduction
**OnlyJob** is a full-stack web application that connects job seekers and recruiters in a secure, efficient way.  
The platform provides:
- Candidate registration and job application management  
- Company account creation and job posting  
- Administrative dashboard for moderation and platform control  

Built on an **MVC architecture**, ensuring a clear separation between logic, data, and presentation.

---

## ✨ Features

### 👤 Candidates
- Sign up and log in securely  
- Browse and filter job offers  
- Apply with a CV and cover letter  
- Track applications and statuses  

### 🏢 Recruiters
- Company registration with **SIRET verification**  
- Post and manage job listings  
- View received applications  

### 🧰 Administrators
- Centralized admin dashboard  
- Validate company accounts manually  
- Manage users and job listings  

---

## ⚙️ Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL (via mysql2) |
| **Authentication** | JWT, bcrypt |
| **Security** | Cookies (`httpOnly`, `SameSite=Strict`), SQL protection |
| **Architecture** | MVC Pattern |

---

## 🧱 Requirements

Before installation, ensure the following are installed:

- [Node.js](https://nodejs.org/) — v14 or higher  
- [MySQL](https://www.mysql.com/) — v8.0 or higher  
- npm (included with Node.js)

---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/EpitechMscProPromo2028/T-WEB-501-TLS_10.git
cd T-WEB-501-TLS_10

# Install dependencies
npm install

# Import the database schema
mysql -u root -p < database/OnlyJob.sql
```

Then create a `.env` file (see below).

---

## ⚙️ Configuration

### `.env` Example
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=OnlyJob
PORT=3000
JWT_SECRET=supersecuresecret
```

> ⚠️ **Do not commit your `.env` file** — it contains sensitive information.

---

## ▶️ Usage

Start the server:
```bash
npm start
```

Then open your browser:
- Home → `http://localhost:3000/`  
- Login → `http://localhost:3000/login`  
- Register → `http://localhost:3000/register`  
- Dashboard → `http://localhost:3000/dashboard`

---

## 🧭 Project Structure

```
T-WEB-501-TLS_10/
├── css/                      # Stylesheets
├── node_modules/             # Dependencies
├── login                     # Login page
├── dashboard                 # Dashboard
├── index                     # Home page
├── register                  # Registration
├── dashboard.js              # Dashboard logic
├── script.js                 # Frontend logic
├── package.json              # NPM config
└── .env                      # Environment variables (to create)
```

---

## 🗃️ Database Overview

### Main Tables

| Table | Description |
|--------|-------------|
| **Roles** | Stores roles (`candidate`, `recruiter`, `admin`) |
| **Users** | Candidate info (hashed passwords, contact) |
| **Company** | Recruiter accounts |
| **Advertisement** | Job offers linked to companies |
| **Applications** | Candidate applications and statuses |

SQL schema and relationships are defined in `database/schema.sql`.

---

## 🔐 Security

- Passwords hashed with **bcrypt**  
- **JWT** used for authentication  
- Cookies secured with `httpOnly` and `SameSite=Strict`  
- **Server-side validation** of inputs  
- **SQL injection prevention** via `mysql2`  
- **HTTPS required in production**

---

## 🧪 Test Accounts

| Role | Email | Password |
|------|--------|-----------|
| Candidate | `candidate1@test.com` | (see database) |
| Recruiter | `recruiter1@test.com` | (see database) |
| Admin | `admin@test.com` | (see database) |

Credentials are included in the initial database seed.

---

## 👥 Contributors

| Name | Role |
|------|------|
| **Gabriel** | Frontend & Database |
| **Franck** | Backend & Security |
| **Mehdi** | Backend & Architecture |

> 🎓 MSc Pro — Epitech Toulouse


© 2025 OnlyJob Team  


---

## 💡 Notes

- 🔒 Never commit your `.env` file  
- 🌐 Use **HTTPS** in production  
- 🧾 Validate company SIRET on backend  
- 🗄️ Backup your MySQL database regularly  
- 🚀 For deployment, configure environment variables properly

---

Made by the OnlyJob Team —
