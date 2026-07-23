# 🍽️ HomeBite Admin Panel

**Backend REST API for HomeBite Admin Dashboard** - A premium home-chef food delivery network admin management system.

> Built with Node.js, Express.js, MongoDB, and modern authentication to dynamically manage restaurant menus, categories, items, stock status, and customer orders in real-time.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Project](#-running-the-project)
- [API Endpoints](#-api-endpoints)
- [Authentication](#-authentication)
- [Database Models](#-database-models)
- [Default Admin Credentials](#-default-admin-credentials)
- [File Structure](#-file-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- **🔐 Secure Admin Authentication** - JWT token-based login system with bcrypt password hashing
- **📝 Menu Management** - Create, read, update, delete menu items with image upload support
- **🏪 Stock Management** - Real-time toggle for menu item availability status
- **📦 Order Tracking** - View and manage customer orders
- **💬 Contact Messages** - Manage customer inquiries and feedback
- **🖼️ Image Upload** - Cloudinary integration for menu item images
- **⚡ Real-time API** - RESTful API endpoints for seamless integration
- **🛡️ CORS Enabled** - Support for cross-origin requests from frontend applications
- **🌐 Static File Serving** - Serve HTML admin dashboard files directly
- **📊 Database Persistence** - MongoDB for reliable data storage

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | Latest | JavaScript runtime |
| **Express.js** | ^5.2.1 | Web framework & REST API |
| **MongoDB** | - | NoSQL database |
| **Mongoose** | ^9.7.3 | MongoDB object modeling |
| **JWT** | ^9.0.3 | Authentication tokens |
| **bcryptjs** | ^3.0.3 | Password hashing & security |
| **Cloudinary** | ^2.5.1 | Image upload & storage |
| **Multer** | ^1.4.5-lts.1 | File upload middleware |
| **CORS** | ^2.8.6 | Cross-origin resource sharing |
| **dotenv** | ^17.4.2 | Environment configuration |
| **nodemon** | ^3.1.9 | Auto-reload (development only) |

---

## 📁 Project Structure

```
homebite-admin/
│
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection configuration
│   ├── models/
│   │   └── adminModel.js         # Admin user schema
│   ├── controllers/
│   │   ├── menuController.js     # Menu CRUD operations
│   │   ├── adminController.js    # Admin operations
│   │   └── orderController.js    # Order management
│   └── routes/
│       ├── menuRoutes.js         # Menu endpoints (/api/menu)
│       ├── adminRoutes.js        # Admin endpoints (/api/admin)
│       ├── orderRoutes.js        # Order endpoints (/api/orders)
│       └── contactRoutes.js      # Contact endpoints (/api/contacts)
│
├── login.html                    # Admin login page (frontend)
├── restaurant-dashboard.html     # Admin dashboard (frontend)
├── package.json                  # Dependencies & scripts
├── server.js                     # Main server entry point
├── .env                          # Environment variables (not in repo)
├── .gitignore                    # Git ignore file
└── README.md                     # This file

```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (Local or Cloud) - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Cloudinary Account** - [Sign Up](https://cloudinary.com/) (for image uploads)
- **Git** - [Download](https://git-scm.com/)

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/Sonamkumari-git/homebite-admin.git
cd homebite-admin
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all packages from `package.json`:
- Express.js
- MongoDB (Mongoose)
- JWT & bcryptjs for authentication
- Cloudinary for image uploads
- CORS and other utilities

### Step 3: Create Environment File

Create a `.env` file in the root directory (see [Environment Variables](#-environment-variables) section).

---

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/homebite-admin

# JWT Secret
JWT_SECRET=homebite_super_secret_key_2026

# Cloudinary Configuration (for image uploads)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# CORS Configuration (Optional)
CORS_ORIGIN=http://localhost:3000
```

### How to Get These Values:

**MongoDB URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and database
3. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/dbname`

**Cloudinary Credentials:**
1. Sign up at [Cloudinary.com](https://cloudinary.com/)
2. Go to Dashboard → Settings
3. Copy `Cloud Name`, `API Key`, and `API Secret`

---

## ▶️ Running the Project

### Development Mode (with auto-reload)

```bash
npm run dev
```

The server will start and watch for file changes using `nodemon`.

### Production Mode

```bash
npm start
```

### Expected Output

```
✅ MongoDB Connected Successfully: ac-xxxxx.mongodb.net
ℹ️ Default Admin Created: admin@homebite.com / admin123
🚀 Server is running on port 5000
```

Then visit: **http://localhost:5000**

---

## 🔗 API Endpoints

### **Admin Authentication**

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/api/admin/login` | Admin login | `{ email, password }` |

**Login Example:**
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@homebite.com","password":"admin123"}'
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### **Menu Management**

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/api/menu/` | Get all menu items | - |
| POST | `/api/menu/` | Add new menu item | `{ name, price, category, image, description }` |
| PUT | `/api/menu/:id` | Update menu item | `{ name, price, category, image, description }` |
| DELETE | `/api/menu/:id` | Delete menu item | - |
| PATCH | `/api/menu/toggle-stock/:id` | Toggle item availability | - |

**Add Menu Item Example:**
```bash
curl -X POST http://localhost:5000/api/menu/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Butter Chicken",
    "price": 350,
    "category": "Main Course",
    "description": "Creamy butter chicken",
    "image": "https://cloudinary.com/..."
  }'
```

---

### **Order Management**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders/` | Get all orders |
| GET | `/api/orders/:id` | Get order details |

---

### **Contact/Messages**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contacts/` | Get all messages |
| POST | `/api/contacts/` | Save contact message |
| DELETE | `/api/contacts/:id` | Delete message |

---

## 🔐 Authentication

### How Authentication Works

1. **Admin Login** - Sends email & password to `/api/admin/login`
2. **Password Verification** - Password compared with bcrypt hash
3. **JWT Token Generation** - Token created with 30-day expiration
4. **Token Storage** - Token saved in LocalStorage as `adminToken`
5. **Protected Routes** - Include token in Authorization header for API requests

### Using the Token

```javascript
// Get token from localStorage
const token = localStorage.getItem('adminToken');

// Use in API requests
fetch('/api/menu/', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
```

---

## 🗄️ Database Models

### Admin Model

```javascript
{
  email: String (required, unique),
  password: String (required, hashed),
  resetOtp: String (optional),
  otpExpires: Date (optional),
  timestamps: { createdAt, updatedAt }
}
```

---

## 👤 Default Admin Credentials

When the server starts for the first time, a default admin account is automatically created:

| Field | Value |
|-------|-------|
| **Email** | `admin@homebite.com` |
| **Password** | `admin123` |

⚠️ **Security Tip:** Change these credentials immediately in production!

---

## 📝 File Structure Details

### `server.js`
Main entry point that:
- Initializes Express app
- Connects to MongoDB
- Sets up middleware (CORS, JSON parsing)
- Defines routes
- Starts the server

### `backend/config/db.js`
MongoDB connection configuration using Mongoose with error handling.

### `backend/models/adminModel.js`
Mongoose schema for admin users with email, password, and OTP fields.

### `backend/routes/`
API route handlers:
- `menuRoutes.js` - Menu CRUD endpoints
- `adminRoutes.js` - Authentication endpoints
- `orderRoutes.js` - Order management endpoints
- `contactRoutes.js` - Contact form endpoints

### `login.html`
Beautiful dark-themed login page with:
- Email/password input fields
- Form validation
- JWT token storage in LocalStorage
- Responsive design with gradient buttons

### `restaurant-dashboard.html`
Main admin dashboard for managing:
- Menu items
- Orders
- Stock status
- Customer messages

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
```
❌ MongoDB Connection Error
```
**Solution:** Check `MONGO_URI` in `.env` file and ensure MongoDB cluster is running.

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution:** Change `PORT` in `.env` or kill the process on port 5000.

### Token Expired
```json
{ "success": false, "message": "Invalid token" }
```
**Solution:** Re-login to get a fresh token. Tokens expire in 30 days.

### CORS Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution:** Ensure `CORS_ORIGIN` in `.env` matches your frontend URL.

---

## 🚀 Deployment

### Deploy to Render.com

1. Push code to GitHub
2. Connect repository to Render.com
3. Set environment variables in Render dashboard
4. Deploy

**Live Admin Dashboard:** https://homebite-admin.onrender.com

### Deploy to Heroku

```bash
heroku login
heroku create homebite-admin
git push heroku main
heroku config:set MONGO_URI=mongodb+srv://...
```

---

## 📧 Support & Contact

- **Issues:** Open an issue on [GitHub Issues](https://github.com/Sonamkumari-git/homebite-admin/issues)
- **Questions:** Discuss in [GitHub Discussions](https://github.com/Sonamkumari-git/homebite-admin/discussions)

---

## 📄 License

This project is licensed under the ISC License - see the `package.json` file for details.

---

## 🎯 Future Enhancements

- [ ] Two-factor authentication (2FA)
- [ ] Email OTP verification
- [ ] Admin role-based access control
- [ ] Analytics dashboard
- [ ] Order status notifications
- [ ] Inventory management system
- [ ] Payment gateway integration
- [ ] API documentation (Swagger/OpenAPI)

---

## 👨‍💻 Author

**Sonam Kumari**
- GitHub: [@Sonamkumari-git](https://github.com/Sonamkumari-git)

---

## ⭐ Support

If you find this project helpful, please star it! ⭐

```bash
# Star the repo by clicking the star icon on GitHub
# Share with friends & colleagues
# Report bugs and suggest features
```

---

**Happy Coding! 🚀**

*Last Updated: July 8, 2026*
