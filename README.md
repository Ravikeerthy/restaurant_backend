# Keerthy's Kitchen Backend README

## Overview

This is the backend for **Keerthy's Kitchen**, built with **Node.js**, **Express**, **MongoDB**, and **Mongoose**.

It provides:
- authentication
- role-based authorization
- menu APIs
- table APIs
- order APIs
- payment APIs
- staff management APIs

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Stripe
- CORS

## Folder Structure

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
Fields:
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
Fields:
- name
- description
- price
- category
- image
- isAvailable

### Table
Fields:
- tableNumber
- capacity
- status
- currentOrder

### Order
Fields:
- orderType
- table
- items
- totalAmount
- status
- paymentStatus
- paymentMethod
- customer
- notes

## Authentication

### Public Register
Public registration should create only:
- `customer`

### Login
Returns:
- JWT token
- logged-in user info

### Get Current User
Protected route that returns current user details.

## Middleware

### `protect`
- verifies JWT token
- loads user from database
- attaches user to `req.user`

### `authorize(...roles)`
- allows route access only for specific roles

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

## Environment Variables

Create a `.env` file in the backend root.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
JWT_EXPIRE=1d
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## Install and Run

```bash
npm install
npm run dev
```

```

## Deployment on Render

- deploy as a web service
- add env vars in Render dashboard
- use the Render API URL in frontend

```

```env
VITE_API_URL=https://restaurant-backend-a9ca.onrender.com/api
```


