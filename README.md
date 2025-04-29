# Multi Vendor E-commerce Platform

This is a **multi-vendor e-commerce platform** built with **Next.js, Prisma, MongoDB, and Tailwind CSS**. The project is structured as a **monorepo** using **TurboRepo** and **pnpm-workspaces** to manage multiple applications efficiently.

The backend follows **OOP principles**, reducing code duplication with a **BaseRepository** and **BaseService** pattern. Dependency injection is managed using **Tsyringe**, ensuring a clean and maintainable codebase.

A custom Error Library is implemented to handle errors effectively, and an **Error Handler** is used to catch unhandled exceptions.

We use [landingfolio](https://www.landingfolio.com/) for inspiration for the landing page design.

## Features and Status

### Admin Panel

| Feature             | Status  |
| ------------------- | ------- |
| Dashboard Analytics | ✅ Done |
| Manage Products     | ✅ Done |
| Manage Categories   | ✅ Done |
| Manage Banners      | ✅ Done |
| Manage Coupons      | ✅ Done |
| Farmer Management   | ✅ Done |
| Staff Management    | ✅ Done |
| User Management     | ✅ Done |
| Sales Reports       | ✅ Done |
| Community Features  | ✅ Done |
| Order Management    | ✅ Done |

### Farmer/Vendor Panel

| Feature              | Status  |
| -------------------- | ------- |
| Product Management   | ✅ Done |
| Order Fulfillment    | ✅ Done |
| Sales Analytics      | ✅ Done |
| Customizable Profile | ✅ Done |

### Customer Panel

| Feature                   | Status  |
| ------------------------- | ------- |
| Browse Products & Markets | ✅ Done |
| Shopping Cart             | ✅ Done |
| Checkout Process          | ✅ Done |
| Order Tracking            | ✅ Done |
| Apply Coupons             | ✅ Done |
| User Profiles             | ✅ Done |
| Community Engagement      | ✅ Done |

### Upcoming Features

| Feature                            | Status         |
| ---------------------------------- | -------------- |
| Payment Gateway Integration        | 🔄 In Progress |
| Advanced Product Reviews & Ratings | 📅 Planned     |
| Real-time Chat Feature             | 📅 Planned     |
| Push Notifications                 | 📅 Planned     |
| Role-Based Access Control (RBAC)   | 📅 Planned     |
| Permission-Based Access            | 📅 Planned     |
| Policy-Based Access                | 📅 Planned     |
| Hierarchical RBAC                  | 📅 Planned     |

## Technologies Used

- **Frontend:**

  - Next.js 15.x
  - Tailwind CSS
  - Redux Toolkit
  - React Hook Form
  - Shadcn UI Components
  - Lucide Icons

- **Backend:**

  - TypeScript
  - Prisma ORM
  - MongoDB
  - Next.js API Routes

- **Architecture:**
  - OOP
  - Tsyringe (Dependency Injection)
  - TurboRepo (Monorepo)
  - pnpm-workspaces

## Project Structure

```
apps/
  web/             # Next.js frontend application
packages/
  backend-repository/  # Repository layer for database access
  backend-services/    # Business logic services
  common/              # Shared utilities and error handling
  core/                # Core abstractions (BaseRepository, BaseService)
  database/            # Prisma schema and client
  email-service/       # Email functionality
  smtp-email-service/  # SMTP email implementation
  redux/               # Redux store and slices
  types/               # TypeScript type definitions
  utils/               # Utility functions
tooling/               # Shared configuration
  eslint-config/       # ESLint configuration
  typescript-config/   # TypeScript configuration
```

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

### **4. Set up environment variables**

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL="mongodb://username:password@localhost:27017/ecommerce?authSource=admin"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
# Add other required environment variables
```

### **5. Generate Prisma client**

```bash
pnpm db:generate
```

### **6. Push database schema to MongoDB**

```bash
pnpm db:push
```

### **7. Run the development server**

```bash
pnpm dev
```

### **8. Build for production**

```bash
pnpm build
```

## Development Workflow

- Use `pnpm dev` to start the development server with turborepo
- Use `pnpm db:studio` to open Prisma Studio for database management
- Use `pnpm build` to build all packages and applications
- Use `pnpm lint` to run linting across the workspace

## Challenges Overcome

- **Monorepo Management:** Ensuring smooth coordination between different packages
- **OOP in Backend:** Structuring BaseRepository & BaseService effectively
- **Dependency Injection:** Automating DI using `tsyringe` for better maintainability
- **State Management:** Leveraging Redux Toolkit for efficient global state

## Contribution

If you want to contribute, feel free to fork the repository and submit a pull request.

---

🚀 **This project is under active development. Check the feature tables above for current status!**
