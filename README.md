### ✅ `README.md`

```markdown
# 📅 Weekly Task Scheduler

A **modern, responsive task scheduling web app** built using **React + TypeScript** and **Material UI (MUI)**. The app helps users organize their weekly tasks efficiently with persistent local storage support.

---

## 🔗 Live Demo

🌐 **Check it out here**:  
[https://weekly-task-scheduler.vercel.app](https://weekly-task-scheduler.vercel.app)

---

## 🚀 Features

- 📝 Add new tasks with:
  - Weekday selection
  - Priority (Low, Medium, High)
  - Optional category
- ✅ Mark tasks as completed or incomplete
- 🗑️ Delete tasks
- 📅 View tasks organized by each weekday
- 🔄 Persistent storage using `localStorage`
- 🎨 Beautiful and clean Material UI design
- ⚡ Fast performance with Vite

---

## 🧪 Tech Stack

| Tech             | Description                              |
|------------------|------------------------------------------|
| **React**        | Frontend library                         |
| **TypeScript**   | Static typing                            |
| **Material UI**  | UI framework for React                   |
| **Vite**         | Lightning-fast frontend build tool       |
| **LocalStorage** | For persistent task saving in browser    |
| **Vercel**       | Deployment platform                      |

---

## 📁 Folder Structure

```

Weekly-Task-Scheduler/
├── public/
│   └── vite.svg
├── src/
│   ├── components/       # Reusable React components
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── ...
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md

````

---

## 💻 Run Locally

Follow these steps to set it up on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/Dipanshu-sandhaki/Weekly-Task-Scheduler.git
cd Weekly-Task-Scheduler
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Now visit `http://localhost:5173` in your browser.

---

## 🧩 Usage Instructions

1. Click the **“Add Task”** button.
2. Fill in the task details:

   * Select the **weekday**
   * Choose a **priority level**
   * Optionally, set a **category**
3. Your task will appear in the corresponding day's section.
4. You can **mark it as complete**, or **delete it** anytime.
5. All your tasks are saved in **localStorage**.

---

## 📦 Build for Production

To create a production-ready build:

```bash
npm run build
```

This will generate a `dist/` folder containing optimized static files.

---

## 🌍 Deployment on Vercel

The app is deployed using **[Vercel](https://vercel.com)**. To deploy your own version:

1. Push your project to GitHub.
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **“New Project”** and import your GitHub repo.
4. Vercel will auto-detect Vite + React setup.
5. Click **“Deploy”** and your app will go live!

---

## 👨‍💻 Author

**Dipanshu Sandhaki**
📍 Kolkata, India
🎓 MCA Student | MERN Stack Developer
🌐 [LinkedIn](https://www.linkedin.com/in/dipanshu-sandhaki)
💼 [Portfolio](https://dipanshusandhaki-portfolio.vercel.app)

---

## ⭐ Support

If you find this project useful, consider giving it a ⭐ star and sharing it with others!

---

## 📃 License

This project is licensed under the [MIT License](LICENSE).
