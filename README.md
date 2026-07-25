# Modern Full-Stack Personal Portfolio (MERN Stack)

A production-ready, fully responsive, and feature-rich Personal Portfolio Website designed to showcase skills, projects, certificates, experience, and handle visitor contact messages with an interactive Admin Dashboard.

![Portfolio Banner](https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200)

## 🚀 Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion, Lucide Icons, Axios, React Router v6
- **Backend**: Node.js, Express.js, JWT Authentication, Bcrypt.js, CORS
- **Database**: MongoDB & Mongoose Schemas (with robust in-memory fallback)
- **Styling**: Modern Glassmorphism UI, Dark & Light Mode Toggle, Custom CSS Glow Effects
- **Deployment Ready**: Vercel (Frontend) & Render / Railway (Backend)

---

## 🌟 Key Features

1. **Home Section**:
   - Animated typing role loop (`Full Stack MERN Developer`, `React & Node.js Specialist`, etc.)
   - Glowing hero card with avatar and float tech badges
   - Call-to-Action (CTA) buttons: *View Projects*, *Contact Me*, *Download Resume*
   - Social media links with glass hover effects

2. **About Me**:
   - Tabbed navigation: *Biography*, *Work Experience Timeline*, *Education History*
   - Interactive key stats counter (Years of Exp, Projects Finished, Happy Clients)

3. **Skills Section**:
   - Category filtering pills: *All*, *Frontend*, *Backend*, *Database*, *Tools*
   - Skill cards featuring Lucide icons, proficiency level badges, and animated progress bars

4. **Projects Section**:
   - Real-time search filter bar & category filter pills (*Full Stack*, *Frontend*, *Backend*, *AI & ML*)
   - Project cards with tech stack tags, live demo & GitHub repository links
   - Full detailed Project View Modal

5. **Certificates & Achievements**:
   - Verified credential gallery grid
   - Zoom preview modal for full-resolution certificate image inspection & credential validation

6. **Contact Form**:
   - Glassmorphic form with client & server-side email validation
   - Submits messages directly to backend database
   - Toast notification alerts for user feedback

7. **Admin Dashboard & Management**:
   - Secure JWT token authentication
   - Seed credentials pre-configured for instant demo: `admin@portfolio.com` / `admin123`
   - Complete CRUD capabilities for Projects, Skills, and Certificates
   - Visitor Contact Messages Inbox with read/unread toggle and delete actions
   - Analytics Overview metrics

8. **Extra Features**:
   - GitHub activity stats component
   - Dynamic site visitor counter
   - Dark / Light mode toggle
   - Custom 404 page & Scroll-to-top floating action button
   - Production bundle ready

---

## 📁 Folder Structure

```
portfolio/
├── backend/
│   ├── config/
│   │   └── db.js                 # Mongoose connection & fallback logic
│   ├── controllers/
│   │   ├── authController.js     # JWT auth & login handler
│   │   ├── profileController.js  # Profile data
│   │   ├── projectController.js  # Projects CRUD
│   │   ├── skillController.js    # Skills CRUD
│   │   ├── certificateController.js # Certificates CRUD
│   │   ├── messageController.js  # Contact messages
│   │   └── statsController.js    # Visitor statistics
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT protection & admin role check
│   ├── models/
│   │   ├── User.js
│   │   ├── Profile.js
│   │   ├── Project.js
│   │   ├── Skill.js
│   │   ├── Certificate.js
│   │   ├── Message.js
│   │   └── Visitor.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── profileRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── skillRoutes.js
│   │   ├── certificateRoutes.js
│   │   ├── messageRoutes.js
│   │   └── statsRoutes.js
│   ├── seed/
│   │   └── seedData.js           # Automated database seeder
│   ├── .env.example
│   ├── package.json
│   └── server.js                 # Express server entrypoint
├── frontend/
│   ├── public/
│   │   ├── favicon.ico
│   │   └── resume.pdf
│   ├── src/
│   │   ├── components/           # UI components (Navbar, Hero, About, Skills, Projects, etc.)
│   │   ├── context/              # ThemeContext & AuthContext
│   │   ├── pages/                # Home, AdminLogin, AdminDashboard, NotFound
│   │   ├── services/             # Axios API client with resilient fallbacks
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── package.json                  # Root script manager
└── README.md
```

---

## ⚙️ Installation & Setup Instructions

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (Local instance or MongoDB Atlas URI)

### 2. Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/your-username/portfolio.join
cd portfolio

# Install dependencies for both backend and frontend
npm run install:all
```

### 3. Environment Variables Configuration

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio
JWT_SECRET=supersecretkey_portfolio_jwt_token_2026
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=admin123
NODE_ENV=development
```

### 4. Database Seeding

Run the seed script to populate sample projects, skills, certificates, profile info, and default admin user:

```bash
cd backend
npm run seed
```

### 5. Running the Application Locally

#### Terminal 1: Start Backend Server
```bash
cd backend
npm run dev
# Server running at http://localhost:5000
```

#### Terminal 2: Start Frontend Application
```bash
cd frontend
npm run dev
# React app running at http://localhost:5173
```

---

## 🔐 Admin Dashboard Access

- **Login URL**: `http://localhost:5173/admin/login`
- **Default Email**: `admin@portfolio.com`
- **Default Password**: `admin123`

---

## 📡 REST API Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticate admin & return JWT token | No |
| `GET` | `/api/auth/me` | Get logged in user details | Yes (JWT) |
| `GET` | `/api/profile` | Fetch portfolio owner profile | No |
| `PUT` | `/api/profile` | Update profile information | Yes (Admin) |
| `GET` | `/api/projects` | Fetch projects (supports `?category=` & `?search=`) | No |
| `POST` | `/api/projects` | Create a new project | Yes (Admin) |
| `PUT` | `/api/projects/:id` | Update an existing project | Yes (Admin) |
| `DELETE` | `/api/projects/:id` | Delete a project | Yes (Admin) |
| `GET` | `/api/skills` | Fetch skills list (supports `?category=`) | No |
| `POST` | `/api/skills` | Create a new skill | Yes (Admin) |
| `PUT` | `/api/skills/:id` | Update a skill | Yes (Admin) |
| `DELETE` | `/api/skills/:id` | Delete a skill | Yes (Admin) |
| `GET` | `/api/certificates` | Fetch certificates list | No |
| `POST` | `/api/certificates` | Add a new certificate | Yes (Admin) |
| `PUT` | `/api/certificates/:id` | Update a certificate | Yes (Admin) |
| `DELETE` | `/api/certificates/:id` | Delete a certificate | Yes (Admin) |
| `POST` | `/api/messages` | Submit a contact form message | No |
| `GET` | `/api/messages` | View all contact messages | Yes (Admin) |
| `PATCH` | `/api/messages/:id/read` | Toggle read/unread status | Yes (Admin) |
| `DELETE` | `/api/messages/:id` | Delete a message | Yes (Admin) |
| `GET` | `/api/stats/visitor` | Get total visitor count | No |
| `POST` | `/api/stats/visitor` | Increment visitor count | No |

---

## 🌐 Deployment Instructions

### Deploy Backend (Render / Railway)
1. Push your repository to GitHub.
2. Create a new Web Service on Render or Railway pointing to the `/backend` directory.
3. Set environment variables (`MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`).
4. Set Build Command: `npm install` and Start Command: `npm start`.

### Deploy Frontend (Vercel)
1. Import your GitHub project into Vercel.
2. Select Root Directory as `frontend`.
3. Framework Preset: `Vite`.
4. Set Environment Variable `VITE_API_URL` to your deployed backend URL (e.g. `https://your-backend.onrender.com/api`).
5. Click **Deploy**.

---

## 📄 License
This project is open-source under the MIT License.
