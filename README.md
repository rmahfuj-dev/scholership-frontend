<div align="center">

  <img src="https://via.placeholder.com/150" alt="Logo" width="100" height="100" />
  
  # 🎓 ScholarStream
  ### The Ultimate Scholarship Management Platform

  <p>
    ScholarStream is a full-stack MERN application connecting students with financial opportunities while streamlining application management for administrators.
  </p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react" />
    <img src="https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=nodedotjs" />
    <img src="https://img.shields.io/badge/MongoDB-Native-green?style=flat-square&logo=mongodb" />
    <img src="https://img.shields.io/badge/Stripe-Payments-635BFF?style=flat-square&logo=stripe" />
    <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwindcss" />
    <img src="https://img.shields.io/badge/Firebase-Auth-FFCA28?style=flat-square&logo=firebase" />
  </p>

  <!-- Quick Links -->
  <p>
    <a href="https://scholarstream-web.netlify.app"><strong>🔗 View Live Site</strong></a> •
    <a href="https://github.com/rmahfuj-dev/scholership-frontend"><strong>📂 Client Repo</strong></a> •
    <a href="https://github.com/rmahfuj-dev/scholership-backend"><strong>📂 Server Repo</strong></a>
  </p>
</div>

---

## 🎯 Project Purpose

Finding scholarships and managing applications is often complex and scattered. **ScholarStream** centralizes the entire process by allowing students to discover, apply, pay, and review scholarships while enabling moderators and admins to manage applications, users, and analytics efficiently.

👉 **Check it out here:** [https://scholarstream-web.netlify.app](https://scholarstream-web.netlify.app)

---

## 👥 User Roles & Features

### 👨‍🎓 Student

- **Auth:** Register & Login via Email/Password or Google Social Login.
- **Discovery:** Browse, search (by name/degree/university), filter, and sort scholarships.
- **Applications:** Apply for scholarships using **Stripe** for secure fee payments.
- **Management:** Track status, retry failed payments, and manage reviews.

### 🧑‍💼 Moderator

- **Workflow:** View all applications and update statuses (Pending → Processing → Completed).
- **Feedback:** Provide feedback on applications and reject unqualified candidates.
- **Moderation:** Monitor and delete inappropriate reviews.

### 🛠️ Admin

- **CMS:** Add, update, and delete scholarship listings.
- **User Management:** Manage users and promote/demote roles (Admin/Moderator/User).
- **Analytics:** Visualize data (Total Users, Fees, Category distribution) using **Recharts**.

---

## 🧱 Tech Stack

| Type              | Technologies                                                 |
| :---------------- | :----------------------------------------------------------- |
| **Frontend**      | React 19, React Router, Tailwind CSS, DaisyUI, Framer Motion |
| **State/Data**    | TanStack Query, React Hook Form, Axios                       |
| **Backend**       | Node.js, Express.js, JWT, Cookie-Parser                      |
| **Database**      | MongoDB (Native Driver)                                      |
| **Services**      | Firebase Auth, Stripe API                                    |
| **Visualization** | Recharts, Lottie React                                       |

---

## 🔐 Security & Best Practices

- **JWT & Cookies:** Secure HTTP-only cookie-based authentication.
- **Role-Based Access Control (RBAC):** Middleware (`verifyAdmin`, `verifyModerator`) protects sensitive routes.
- **Environment Variables:** All sensitive keys (Firebase, Stripe, MongoDB) are hidden.
- **CORS Policies:** Configured for secure cross-origin resource sharing.

---

## 🧪 Deployment Checklist

- ✅ Frontend deployed on Netlify (React Router fixes applied).
- ✅ Backend live on Vercel/Render.
- ✅ Firebase authorized domains configured.
- ✅ Stripe payment working in production mode.
- ✅ Private routes persist after page refresh.

---

<div align="center">
  <p>Made with ❤️ by Muhammad Mahfuj</p>
</div>
