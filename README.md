# Multi Vendor E-commerce Platform

This is a **multi-vendor e-commerce platform** built with **Next.js, Prisma, MongoDB, and Tailwind CSS**. The project is structured as a **monorepo** using **TurboRepo** and **pnpm-workspaces** to manage multiple applications efficiently.

The backend follows **OOP principles**, reducing code duplication with a **BaseRepository** and **BaseService** pattern. Dependency injection is managed using **Tsyringe**, ensuring a clean and maintainable codebase.

A custom Error Library is implemented to handle errors effectively, and an **Error Handler** is used to catch unhandled exceptions.

## Features

- **Admin Panel:**
  - Manage Banners
  - Manage Categories
  - Manage Products
  - Manage Coupons
  - Community Features
  - Farmer Management
  - Staff Management
  - User Management
- **Customer Panel:**
  - Browse Products & Markets
  - Apply Coupons
  - Community Engagement

## Technologies Used

- **Frontend:** Next.js, Tailwind CSS
- **Backend:** TypeScript, Prisma, MongoDB
- **Architecture:** OOP, Tsyringe (DI), TurboRepo (Monorepo), pnpm-workspaces

## Challenges Faced

- **Monorepo Management:** Ensuring smooth coordination between different packages.
- **OOP in Backend:** Structuring BaseRepository & BaseService effectively.
- **Dependency Injection:** Automating DI using `tsyringe` for better maintainability.

## Future Enhancements

- **Payment Gateway Integration**
- **Order Management System**
- **Product Reviews & Ratings**

- **Real-time Chat Feature**
- **Push Notifications**

## Installation & Setup

### **1. Clone the repository**

```bash
 git clone https://github.com/TanzimHossain2/Multivendor_E-commerce
```

### **2. Change to the project directory**

```bash
 cd Multivendor_E-commerce
```

### **3. Install dependencies**

```bash
 pnpm install
```

### **4. Run the project**

```bash
 pnpm dev
```

## Contribution

If you want to contribute, feel free to fork the repository and submit a pull request.

---

🚀 **This project is under active development. Stay tuned for more updates!**
