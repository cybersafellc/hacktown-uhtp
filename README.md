# Hacktown Project

## Introduction

"Sekolah Aman" is a backend application that serves as the foundation of a system focused on **simplifying reporting and consultation related to bullying** within educational environments. It offers secure data processing, real-time chatbot communication, and seamless integration with other system modules to support an efficient and safe reporting workflow for students and school staff.

---

## Project Resources

- **Database Design:** [https://dbdiagram.io/d/Hacktown-67121f1b97a66db9a36feca3](https://dbdiagram.io/d/Hacktown-67121f1b97a66db9a36feca3)
- **API Documentation (Postman):** [https://www.postman.com/test00-9480/hacktown-kelompok-3/collection/35522357-5f886e6e-5eda-43eb-95eb-52b63cf4db75?action=share&creator=35522357](https://www.postman.com/test00-9480/hacktown-kelompok-3/collection/35522357-5f886e6e-5eda-43eb-95eb-52b63cf4db75?action=share&creator=35522357)

---

## Tech Stack

| Technology                      | Role                                |
| ------------------------------- | ----------------------------------- |
| **Express.js**                  | Backend web server                  |
| **Prisma ORM**                  | Database ORM & query builder        |
| **WebSocket**                   | Real-time communication for chatbot |
| **JSON Web Token (JWT)**        | Secure user authorization           |
| **NodeMailer**                  | Email notification service          |
| **Ollama**                      | Local chatbot AI engine             |
| **Joi**                         | Input validation                    |
| **BCrypt**                      | Password hashing                    |
| **Winston + Daily Rotate File** | Logging system                      |
| **Multer**                      | File uploading                      |

---

## Features

- 🔐 Secure JWT-based authentication
- 🤖 Real-time chatbot interaction
- 📩 Automated email notifications
- 📁 File upload support
- 📝 Structured API endpoints with validation
- 🧾 Centralized logging for monitoring & debugging

---

## Getting Started

```bash
# install dependencies
npm install

# run development server
npm run dev

# generate prisma client
npx prisma generate
```

---
