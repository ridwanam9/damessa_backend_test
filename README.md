# 📦 Backend Developer Mini Project – Product Management API

This project is a **RESTful API** built with **Express.js** and **Sequelize ORM** to manage `Users`, `Categories`, and `Products`.  
The system implements **JWT authentication**, **soft delete**, and **modular architecture** for maintainability.

---

## 🚀 Installation & Setup
### 1. Clone the repository
```bash
git clone https://github.com/your-username/backend-developer-mini-project.git

cd backend-developer-mini-project
```
### 2. Install dependencies
```bash
npm install
```
### 3. Setup environment variables
Create a .env file in the project root:
```bash
DB_NAME=product_db
DB_USER=root
DB_PASS=
DB_HOST=localhost
JWT_SECRET=supersecretkey
PORT=3000

```
⚠️ Adjust DB_USER and DB_PASS according to your MySQL setup (default XAMPP: root with empty password).

### 4. Run the server
```bash
npm run dev
```
Server will start at:
```bash
http://localhost:3000
```


## 🚀 Project Structure
```
backend-developer-mini-project/
│── src/
│   ├── config/            # Database configuration
│   │   └── database.js
│   ├── models/            # Sequelize models (User, Category, Product)
│   ├── controllers/       # API controllers
│   ├── routes/            # Route definitions
│   ├── middlewares/       # JWT authentication middleware
│   ├── utils/             # Helpers (response handler, etc.)
│   ├── app.js             # Express app
│   └── server.js          # App entry point
│── .env                   # Environment variables
│── package-lock.json
│── package.json
│── README.md

```

## Tools & Libraries
- Express.js
 – Web framework for Node.js

- Sequelize ORM
 – Database ORM for MySQL

- MySQL2
 – MySQL client

- JWT (jsonwebtoken)
 – Authentication

- bcrypt
 – Password hashing

- dotenv
 – Environment variables

- uuid
 – UUID generator

- Nodemon
 – Auto-restart in development


## 🔎 Logger Middleware

Every incoming request is logged with timestamp, HTTP method, and URL.

Code (src/middlewares/logger.js):
```js
module.exports = (req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  next();
};

```
Example logs in terminal:
```bash
[2025-10-01T10:00:00.000Z] GET /health
[2025-10-01T10:01:20.000Z] POST /api/users/login
```

## 📖 API Endpoints & Examples


### Health

```bash
GET /health

```
Response:
```json
{
  "status": "ok",
  "db": "connected",
  "uptime": 120.45
}

```

### Register

```bash
POST /api/users/register

```
Body:
```bash
{
  "name": "User2",
  "email": "user2@example.com",
  "password": "123456"
}

```
Response:
```json
{
    "message": "User registered",
    "user": {
        "id": "11e28347-ca1f-4075-b011-21c8d9f5edb9",
        "name": "User2",
        "email": "user2@example.com",
        "password": "$2b$10$6aEXYVpAq4HKmmctd7rPl.9dzqykbv5UTZQXc6HP7Ri8lqIA20Fqa",
        "updatedAt": "2025-10-01T12:18:06.042Z",
        "createdAt": "2025-10-01T12:18:06.042Z"
    }

}
```
### Login

```bash
POST /api/users/login

```
Body:
```bash
{
  "name": "User2",
  "email": "user2@example.com",
  "password": "123456"
}

```
Response:
```json
{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExZTI4MzQ3LWNhMWYtNDA3NS1iMDExLTIxYzhkOWY1ZWRiOSIsImVtYWlsIjoidXNlcjJAZXhhbXBsZS5jb20iLCJpYXQiOjE3NTkzMjEyNDQsImV4cCI6MTc1OTMyNDg0NH0.maGTuCFLZDV5bWsfM8bkiifQIuasR6kahjzeniIfPww"
}
```


### Create Category (requires JWT token)
```bash
POST /api/categories
Authorization: Bearer <token>

```
Request Body:
```json
{
  "name": "Electronics"
}

```
Response:
```bash
{
    "id": "38ed5cf7-5233-475c-8825-9986b0f816cd",
    "name": "Electronics",
    "updatedAt": "2025-10-01T12:21:18.941Z",
    "createdAt": "2025-10-01T12:21:18.941Z"
}
```

### Get Categories (requires JWT token)
```bash
POST /api/categories
Authorization: Bearer <token>
```

Response:
```bash
[
    {
        "id": "c7cabfb7-a5ca-4781-a96a-a013ebc6c579",
        "name": "Electronics",
        "createdAt": "2025-10-01T11:59:02.000Z",
        "updatedAt": "2025-10-01T11:59:02.000Z",
        "deletedAt": null
    }
]
```
### Get Category by id (requires JWT token)
```bash
POST /api/categories/:id
Authorization: Bearer <token>
```

Response:
```bash
[
    {
        "id": "c7cabfb7-a5ca-4781-a96a-a013ebc6c579",
        "name": "Electronics",
        "createdAt": "2025-10-01T11:59:02.000Z",
        "updatedAt": "2025-10-01T11:59:02.000Z",
        "deletedAt": null
    }
]
```

### Update Category (requires JWT token)
```bash
PUT /api/categories/:id
Authorization: Bearer <token>

```
Body:
```bash
{
  "name": "Furnitures Edited"
}

```
Response:
```bash
{
    "id": "38ed5cf7-5233-475c-8825-9986b0f816cd",
    "name": "Furnitures Edited",
    "createdAt": "2025-10-01T12:21:18.000Z",
    "updatedAt": "2025-10-01T12:23:57.105Z",
    "deletedAt": null
}
```

### Delete Category (Soft Delete)

```bash
DELETE /api/categories/:id
Authorization: Bearer <token>

```
Response:
```json
{
    "message": "Category deleted"
}
```


### Create Product (requires JWT token)
```bash
POST /api/products
Authorization: Bearer <token>

```
Request Body:
```json
{
  "name": "iPhone 15",
  "price": 1500,
  "stock": 10,
  "categoryId": "<category_id>"
}

```
Response:
```bash
{
    "id": "6261b308-7517-437c-90d5-f68a64459ffd",
    "name": "iPhone 15",
    "price": 1500,
    "stock": 10,
    "categoryId": "c7cabfb7-a5ca-4781-a96a-a013ebc6c579",
    "updatedAt": "2025-10-01T12:37:56.744Z",
    "createdAt": "2025-10-01T12:37:56.744Z"
}
```

### Get Products (requires JWT token)
```bash
GET /api/products
Authorization: Bearer <token>
```
Response:
```bash
[
    {
        "id": "6261b308-7517-437c-90d5-f68a64459ffd",
        "name": "redmi 13",
        "price": "1500",
        "stock": 10,
        "createdAt": "2025-10-01T12:37:56.000Z",
        "updatedAt": "2025-10-01T12:37:56.000Z",
        "deletedAt": null,
        "categoryId": "c7cabfb7-a5ca-4781-a96a-a013ebc6c579",
        "Category": {
            "id": "c7cabfb7-a5ca-4781-a96a-a013ebc6c579",
            "name": "Electronics",
            "createdAt": "2025-10-01T11:59:02.000Z",
            "updatedAt": "2025-10-01T11:59:02.000Z",
            "deletedAt": null
        }
    },
    {
        "id": "dcfc0297-1d00-460a-ba47-59c969d70867",
        "name": "iPhone 15",
        "price": "1500",
        "stock": 10,
        "createdAt": "2025-10-01T12:07:20.000Z",
        "updatedAt": "2025-10-01T12:07:20.000Z",
        "deletedAt": null,
        "categoryId": "c7cabfb7-a5ca-4781-a96a-a013ebc6c579",
        "Category": {
            "id": "c7cabfb7-a5ca-4781-a96a-a013ebc6c579",
            "name": "Electronics",
            "createdAt": "2025-10-01T11:59:02.000Z",
            "updatedAt": "2025-10-01T11:59:02.000Z",
            "deletedAt": null
        }
    }
]
```
### Get Product by Id (requires JWT token)
```bash
GET /api/products/:id
Authorization: Bearer <token>
```
Response:
```bash
[
    {
        "id": "6261b308-7517-437c-90d5-f68a64459ffd",
        "name": "redmi 13",
        "price": "1500",
        "stock": 10,
        "createdAt": "2025-10-01T12:37:56.000Z",
        "updatedAt": "2025-10-01T12:37:56.000Z",
        "deletedAt": null,
        "categoryId": "c7cabfb7-a5ca-4781-a96a-a013ebc6c579",
        "Category": {
            "id": "c7cabfb7-a5ca-4781-a96a-a013ebc6c579",
            "name": "Electronics",
            "createdAt": "2025-10-01T11:59:02.000Z",
            "updatedAt": "2025-10-01T11:59:02.000Z",
            "deletedAt": null
        }
    }
]
```

### Update Product (requires JWT token)
```bash
PUT /api/products/:id
Authorization: Bearer <token>
```
Body:
```bash
{
  "price": 1800,
  "stock": 15
}
```
Response:
```bash
{
    "id": "e3a99490-b021-4aa8-8442-53e24471eef9",
    "name": "redmi 12 edited",
    "price": 1800,
    "stock": 15,
    "createdAt": "2025-10-01T12:27:29.000Z",
    "updatedAt": "2025-10-01T12:29:16.106Z",
    "deletedAt": null,
    "categoryId": "c7cabfb7-a5ca-4781-a96a-a013ebc6c579"
}
```

### Delete Product (Soft Delete)

```bash
DELETE /api/products/:id
Authorization: Bearer <token>

```
Response:
```json
{
    "message": "Product deleted"
}
```

### 🔹 Product API (extended features)
#### Get Products (with filter & pagination)
```http
GET /api/products?category=Electronics&page=1&limit=10
Authorization: Bearer <token>
```

## ✅ Notes

All Category and Product deletions are soft delete (deletedAt timestamp is set).

Use Postman/Thunder Client for testing, or import the provided Postman Collection.