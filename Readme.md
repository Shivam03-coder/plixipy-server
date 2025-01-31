# Node.js Server with TypeScript for Plixipy

## 📌 Project Overview

This project is a **Node.js** server built using **TypeScript** for **Plixipy**. It provides a robust and scalable backend with modern best practices, including environment variables, error handling, and structured code organization.

## 🚀 Features

- **Express.js** for API development
- **TypeScript** for type safety and maintainability
- **ESLint & Prettier** for code quality and formatting
- **Dotenv** for environment variables management
- **Prisma** for database interaction
- **JWT Authentication** for secure API endpoints

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **PostgreSQL**
- **JWT (JSON Web Token)**
- **Twilio**
- **Prisma ORM**
- **Multer**
- **Cloudinary**

## 📂 Folder Structure

```
📦 project-root
 ┣ 📂 assets
 ┣ 📂 node_modules
 ┣ 📂 prisma
 ┣ 📂 src
 ┃ ┣ 📂 configs
 ┃ ┣ 📂 controller
 ┃ ┣ 📂 db
 ┃ ┣ 📂 helpers
 ┃ ┣ 📂 libs
 ┃ ┣ 📂 middleware
 ┃ ┣ 📂 routes
 ┃ ┣ 📂 types
 ┃ ┣ 📂 uploads
 ┃ ┣ 📂 utils
 ┃ ┣ 📜 app.ts
 ┃ ┗ 📜 index.ts
 ┣ 📜 .env
 ┣ 📜 .env.example
 ┣ 📜 .gitignore
 ┣ 📜 debug.log
 ┣ 📜 package.json
 ┣ 📜 pnpm-lock.yaml
 ┣ 📜 Readme.md
 ┗ 📜 tsconfig.json
```

## 🛠 Setup & Installation

1. **Clone the repository:**

   ```sh
   https://github.com/Shivam03-coder/plixipy-server.git
   cd plixipy-server
   ```

2. **Install dependencies:**

   ```sh
   pnpm install
   ```

3. **Run the development server:**
```sh
pnpm run dev
````

4. **Build for production:**
   ```sh
   npm run build
   npm start
   ```

## 📡 API Endpoints

| Method | Endpoint          | Description                  |
| ------ | ----------------- | ---------------------------- |
| POST   | `/contact-verify` | Verify user phone number     |
| POST   | `/otp-verify`     | Verify OTP                   |
| POST   | `/user-signup`    | User signup with file upload |
| POST   | `/user-login`     | User login                   |
| GET    | `/user-profile`   | Get user profile (protected) |
