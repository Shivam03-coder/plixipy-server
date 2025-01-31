# Node.js Server with TypeScript for Sentuo

## 📌 Project Overview
This project is a **Node.js** server built using **TypeScript** for **Sentuo**. It provides a robust and scalable backend with modern best practices, including environment variables, error handling, and structured code organization.

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
- **Redis (Optional)**

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
   git clone https://github.com/your-repo/sentuo-node-server.git
   cd sentuo-node-server
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Create a `.env` file and configure environment variables:**
   ```env
   PORT=5000
   DATABASE_URL=your-database-url
   JWT_SECRET=your-secret-key
   ```

4. **Run the development server:**
   ```sh
   npm run dev
   ```

5. **Build for production:**
   ```sh
   npm run build
   npm start
   ```

## 📡 API Endpoints
| Method | Endpoint      | Description              |
|--------|-------------|--------------------------|
| GET    | `/api/ping`  | Health check endpoint   |
| POST   | `/api/login` | User authentication     |

## 🛡️ Authentication
The project uses **JWT-based authentication**. Secure your routes using middleware like:
```ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access Denied' });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};
```

## 📝 License
This project is licensed under the **MIT License**.

---

### 💡 Need Help?
Feel free to open an **issue** or **contribute** to improve this project!

