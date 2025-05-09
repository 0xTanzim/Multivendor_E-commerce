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

### Security & Access Control

| Feature                          | Status  |
| -------------------------------- | ------- |
| Role-Based Access Control (RBAC) | ✅ Done |
| Permission-Based Access          | ✅ Done |
| Policy-Based Access              | ✅ Done |
| Hierarchical RBAC                | ✅ Done |

### Upcoming Features

| Feature                            | Status         |
| ---------------------------------- | -------------- |
| Payment Gateway Integration        | 🔄 In Progress |
| Advanced Product Reviews & Ratings | 📅 Planned     |
| Real-time Chat Feature             | 📅 Planned     |
| Push Notifications                 | 📅 Planned     |

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

- **Security:**
  - JWT Authentication
  - Role-based Authorization
  - Permission Validation
  - Policy Enforcement
  - Access Control Lists

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
  authentication/      # Authentication & authorization services
  rbac/                # Role-based access control implementation
tooling/               # Shared configuration
  eslint-config/       # ESLint configuration
  typescript-config/   # TypeScript configuration
```

## Installation & Setup

### **1. Clone the repository**

```bash
git clone https://github.com/0xTanzim/Multivendor_E-commerce
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
JWT_SECRET="your-secret-key-here"
JWT_EXPIRY="7d"
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

## Access Control System

Our platform implements a comprehensive access control system:

- **Role-Based Access Control (RBAC)**: Users are assigned roles (Admin, Vendor, Customer) with predefined permissions
- **Permission-Based Access**: Granular control over specific actions and resources
- **Policy-Based Access**: Dynamic rules that consider context and conditions beyond just roles
- **Hierarchical RBAC**: Inheritance of permissions through role hierarchies (e.g., SuperAdmin → Admin → Staff)

This multi-layered approach ensures secure and flexible access management throughout the application.

## Challenges Overcome

- **Monorepo Management**: Ensuring smooth coordination between different packages
- **OOP in Backend**: Structuring BaseRepository & BaseService effectively
- **Dependency Injection**: Automating DI using `tsyringe` for better maintainability
- **State Management**: Leveraging Redux Toolkit for efficient global state
- **Access Control**: Implementing a flexible yet powerful RBAC system with hierarchical roles and policy enforcement

## Contribution

If you want to contribute, please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows our coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

🚀 **This project is under active development with all core features now implemented!**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![TurboRepo](https://img.shields.io/badge/TurboRepo-Latest-purple?style=flat&logo=turborepo)](https://turbo.build/)
