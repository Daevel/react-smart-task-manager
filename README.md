# 🧠 SmartTask — The Intelligent Task Manager

> A modern, collaborative, and smart task management platform built with React, Redux Toolkit, Supabase, and Shadcn UI.  
> Manage, assign, and track your tasks efficiently — with a beautiful UI and real-time updates.

---

## 🚀 Live Demo  
🔗 **[smarttask.vercel.app](https://smarttask.vercel.app)** _(example link — replace with your deployment URL)_

---

## ✨ Features

### 🧱 Core Functionality
✅ **Authentication** — Sign up, login, and reset password via Supabase  
✅ **Task CRUD** — Create, edit, delete, and update tasks  
✅ **Task Assignment** — Assign tasks to team members  
✅ **Status Management** — Track tasks as “Todo”, “In Progress”, or “Done”  
✅ **Pagination** — Browse tasks with 10 / 20 / 50 rows per page  
✅ **Redux Store** — Real-time UI updates without page reload  
✅ **Form Validation** — Built-in input validation using `react-hook-form` + `zod`  
✅ **Dark / Light Mode** — Accessible, theme-aware interface  
✅ **Dialogs & Dropdowns** — Clean, animated interactions with Shadcn UI  

---

### 🤖 Smart Features (coming soon)
🧠 AI-based task suggestions *(analyzes your title to suggest due dates or priorities)*  
📊 Task analytics dashboard *(visualize progress & task distribution)*  
🔔 Reminders & notifications *(email + in-app)*  
🔄 Real-time collaboration *(live updates when someone edits a task)*  

---

## 🖼️ Screenshots

| Dashboard (Light) | Dashboard (Dark) |
|-------------------|------------------|
| ![Dashboard Light](https://via.placeholder.com/600x350.png?text=SmartTask+Light) | ![Dashboard Dark](https://via.placeholder.com/600x350.png?text=SmartTask+Dark) |

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| 🖥️ Frontend | [React 18](https://react.dev) + [Vite](https://vitejs.dev) + [TypeScript](https://www.typescriptlang.org/) |
| 🎨 UI | [Shadcn UI](https://ui.shadcn.com) + [TailwindCSS](https://tailwindcss.com) |
| 🧠 State Management | [Redux Toolkit](https://redux-toolkit.js.org) |
| 🔐 Auth & Database | [Supabase](https://supabase.io) |
| ✅ Forms & Validation | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| ☀️ Theming | Custom `ThemeProvider` with persistent dark/light mode |
| ⚙️ Deployment | [Vercel](https://vercel.com) |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/smarttask.git
cd smarttask
```

### 2️⃣ Install dependencies
```bash
npm install
# or
yarn install
```

### 3️⃣ Configure Supabase
Create a `.env` file in the root with your Supabase credentials:
```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_KEY
```

### 4️⃣ Run the app
```bash
npm run dev
```
The app will run at **http://localhost:5173**

---

## 🗄️ Database Schema (Supabase)

### `users`
| Column | Type | Description |
|---------|------|-------------|
| `id` | uuid | Unique user ID |
| `email` | text | User email |
| `created_at` | timestamp | Creation timestamp |

### `tasks`
| Column | Type | Description |
|---------|------|-------------|
| `id` | uuid | Task ID |
| `title` | text | Task title |
| `description` | text | Optional description |
| `status` | text | One of `todo`, `in_progress`, `done` |
| `created_by` | uuid | User who created the task |
| `assigned_to` | uuid | Assigned user |
| `created_at` | timestamp | Task creation date |

---

## 🧠 Architecture Overview

```
src/
 ┣ api/               # Supabase queries (CRUD)
 ┣ components/        # UI components (buttons, inputs, dialogs, etc.)
 ┣ context/           # Theme + Auth context providers
 ┣ hooks/             # Custom React hooks (useTasks, useTheme, etc.)
 ┣ pages/             # Page-level components (Login, Dashboard, etc.)
 ┣ store/             # Redux slices and store configuration
 ┣ styles/            # Tailwind + global CSS
 ┗ main.tsx           # App entry point
```

---

## 📦 Redux Store Example

Each task operation (CRUD) dispatches a Redux action:
```ts
dispatch(addTask({
  title: "New Task",
  description: "Implement pagination",
  created_by: user.id,
  assigned_to: user.id
}));
```

---

## 💻 Development Roadmap

| Feature | Status |
|----------|---------|
| User authentication | ✅ |
| Task CRUD | ✅ |
| Dark/light mode | ✅ |
| Redux state management | ✅ |
| Pagination | ✅ |
| Form validation (Zod) | ✅ |
| Assign task | ✅ |
| Task analytics dashboard | 🚧 |
| AI task suggestions | 🚧 |
| Real-time sync | 🚧 |

---

## 🧑‍💻 Author

**[@YourName](https://github.com/your-username)**  
Frontend Developer • React • TypeScript • Supabase Enthusiast 🚀

---

## 📄 License

MIT License © 2025 — _Built with ❤️ using React + Supabase_
