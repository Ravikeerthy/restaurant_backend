# Keerthy's Kitchen Backend

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express-API-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![Render](https://img.shields.io/badge/Render-Deployed-6C63FF)

## Overview

Keerthy's Kitchen backend powers authentication, role-based access control, menu and table management, orders, Stripe payment flow, and admin staff creation.

## Live API

Add your deployed backend URL here.

```text
https://restaurant-backend-a9ca.onrender.com
```

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Stripe
- CORS

## Project Structure

```text
server/
  config/
  controller/
  middleware/
  models/
  routes/
  server.js
```

## Models

### User
- name
- email
- password
- role

Roles:
- customer
- admin
- waiter
- kitchen

### Menu
- name
- description
- price
- category
- image
- isAvailable

### Table
- tableNumber
- capacity
- status
- currentOrder

### Order
- orderType
- table
- items
- totalAmount
- status
- paymentStatus
- paymentMethod
- customer
- notes

## API Routes

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Menus
- `GET /api/menus`
- `GET /api/menus/:id`
- `POST /api/menus`
- `PUT /api/menus/:id`
- `DELETE /api/menus/:id`

### Tables
- `GET /api/tables`
- `GET /api/tables/:id`
- `POST /api/tables`
- `PUT /api/tables/:id`
- `DELETE /api/tables/:id`

### Orders
- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/:id`
- `PUT /api/orders/:id/status`
- `PUT /api/orders/:id/payment`
- `DELETE /api/orders/:id`

### Payments
- `POST /api/payments/create-payment-intent`
- `POST /api/payments/confirm-payment`

### Staff
- `POST /api/users/staff`
- `GET /api/users/staff`
- `PUT /api/users/:id/role`
- `DELETE /api/users/:id`

## Example Request

### Login
```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "email": "admin@test.com",
  "password": "123456"
}
```

### Create Staff
```http
POST /api/users/staff
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "name": "Kitchen User",
  "email": "kitchen@test.com",
  "password": "123456",
  "role": "kitchen"
}
```

## Environment Variables

Create a `.env` file in the backend root.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
JWT_EXPIRE=1d
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## Installation

```bash
npm install
npm run dev
```

## CORS

Allow both localhost and the deployed frontend URL.

```js
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://keerthyrestaurantportfolio.netlify.app/"
  ],
  credentials: true,
}));
```

## Deployment
```
https://restaurant-backend-a9ca.onrender.com
```
