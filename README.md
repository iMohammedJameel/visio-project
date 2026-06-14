# VisioCreate. 🛍️

A modern e-commerce storefront for a golf & furniture store, built with React + Vite and connected to a RESTful backend API.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter&logoColor=white)

---

## ✨ Features

- 🏠 **Home Page** — Hero section, featured products, categories, promo banner, collections, articles, newsletter & Instagram feed
- 🛒 **Shop Page** — Product grid/list layouts, filter by category & price range, sort options, load more pagination
- 📦 **Product Page** — Image gallery, countdown timer, color selector, quantity control, reviews tab, add to cart
- 🛍️ **Cart** — Full cart management with quantity controls, coupon code, shipping options & order summary
- 💳 **Checkout** — Multi-step checkout (Cart → Details → Complete) with contact info, shipping address & card payment
- 🔐 **Authentication** — Register & Login with JWT stored in localStorage, protected account page
- 👤 **My Account** — User account dashboard
- 🎨 **Responsive Design** — Fully responsive across mobile, tablet & desktop

---

## 🗂️ Project Structure

```
src/
├── api/
│   ├── api.js              # API call functions (products, categories, auth)
│   └── axiosInstance.js    # Axios instance with base URL & JWT interceptor
├── components/             # Home page sections
│   ├── HeroSection.jsx
│   ├── FeaturedSection.jsx
│   ├── CategoriesSection.jsx
│   ├── CollectionSection.jsx
│   ├── PromoBanner.jsx
│   ├── ArticlesSection.jsx
│   ├── Newsletter.jsx
│   └── InstagramSection.jsx
├── context/
│   ├── AuthContext.jsx     # Auth state (login, logout, token)
│   └── CartContext.jsx     # Cart state (add, remove, update qty)
├── Layout/
│   └── MainLayout.jsx      # Shared layout with Navbar, Footer & CartDrawer
├── pages/
│   ├── Home.jsx
│   ├── Shop.jsx
│   ├── ProductPage.jsx
│   ├── CartPage.jsx
│   ├── CheckoutPage.jsx
│   ├── OrderComplete.jsx
│   ├── MyAccount.jsx
│   ├── Login.jsx
│   └── SignUp.jsx
├── Router/
│   └── AppRouter.jsx       # All app routes
└── shared/
    ├── Navbar.jsx
    ├── Footer.jsx
    ├── Topbar.jsx
    └── CartDrawer.jsx      # Slide-in cart sidebar
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- Backend API running on `http://localhost:4000`

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-username/visio-project.git
cd visio-project

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

App will be available at **http://localhost:5173**

### Build for Production

```bash
npm run build
```

---

## 🔌 API Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login & receive JWT |
| GET | `/api/products` | Get all products (paginated) |
| GET | `/api/products/:id` | Get single product |
| GET | `/api/categories` | Get all categories |
| GET | `/api/categories/:id` | Get single category |

> Base URL: `http://localhost:4000/api`  
> JWT token is automatically attached to all requests via Axios interceptor.

---

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| React Router 6 | Client-side routing |
| Bootstrap 5.3 | Styling & responsive layout |
| Bootstrap Icons | Icon library |
| Axios | HTTP client |
| Context API | Global state (auth & cart) |

---

## 📸 Pages Overview

| Page | Route |
|------|-------|
| Home | `/` |
| Shop | `/shop` |
| Product Details | `/product/:id` |
| Cart | `/cart` |
| Checkout | `/checkout` |
| Order Complete | `/order-complete` |
| My Account | `/account` |
| Login | `/login` |
| Sign Up | `/signup` |

---

## 📄 License

This project is for educational/portfolio purposes.
