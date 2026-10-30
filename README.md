# Full Stack Web Development – Lab Records, Assignments and Projects

## 🎓 Academic Portfolio & Coursework Repository

- **Student Name**: B. Manish Sai
- **Roll Number**: `A24126552129`
- **GitHub Username**: [@Manishsai878](https://github.com/Manishsai878)
- **Course**: Full Stack Web Development
- **Repository URL**: [https://github.com/Manishsai878/fullstack-webdevelopment.git](https://github.com/Manishsai878/fullstack-webdevelopment.git)

---

## 📖 Introduction

This repository serves as the unified, centralized submission for the **Full Stack Web Development** laboratory and coursework requirements. In accordance with faculty instructions, all academic components—including weekly lab observation records, the comprehensive electronic laboratory record (E-Record), theoretical/practical assignments, the individual full-stack web project, and the collaborative group project—are organized systematically into a single repository.

Every module within this repository is completely authentic, self-contained, and runnable with clean dependency specifications and documentation.

---

## 📌 Repository Overview

| Directory / Component | Description | File / Asset Link |
|---|---|---|
| **`Observation/`** | Weekly lab session observations and handwritten experiment documentation. | [`Observation/PDFs/A24126552129 obs.pdf`](Observation/PDFs/A24126552129%20obs.pdf) |
| **`E-Record/`** | Official completed electronic laboratory record manual for all syllabus experiments. | [`E-Record/PDFs/Lab_Record_complete_A24126552129.pdf`](E-Record/PDFs/Lab_Record_complete_A24126552129.pdf) |
| **`Assignments/Assignment-1/`** | Academic Assignment 1 submission document. | [`Assignments/Assignment-1/Assignment-1.pdf`](Assignments/Assignment-1/Assignment-1.pdf) |
| **`Assignments/Assignment-2-Individual-Project/`** | **StudyMate** – Full-stack student assignment tracker with React, CSS, and Express. | [`Assignments/Assignment-2-Individual-Project/`](Assignments/Assignment-2-Individual-Project/) |
| **`Group-Project/`** | **CivicFix** – Smart public civic issue reporting, tracking, and resolution platform. | [`Group-Project/`](Group-Project/) |

---

## 📁 Repository Folder Structure

```text
fullstack-webdevelopment/
├── README.md                                          # Master repository documentation
├── .gitignore                                         # Global git ignore rules (node_modules, .env, etc.)
│
├── Observation/                                       # Course lab observation submissions
│   └── PDFs/
│       └── A24126552129 obs.pdf                       # Lab observation document
│
├── E-Record/                                          # Official comprehensive lab record
│   └── PDFs/
│       └── Lab_Record_complete_A24126552129.pdf       # Complete lab record PDF
│
├── Assignments/
│   ├── Assignment-1/                                  # Assignment 1 coursework
│   │   └── Assignment-1.pdf                           # Assignment 1 PDF
│   │
│   └── Assignment-2-Individual-Project/               # Individual Project: StudyMate
│       ├── README.md                                  # In-depth project documentation
│       ├── package.json                               # Workspace runner scripts
│       ├── package-lock.json                          # Dependency lockfile
│       ├── .gitignore                                 # Project git ignore
│       ├── screenshots/                               # Application UI captures
│       │   ├── studymate-dashboard.png                # Desktop dashboard preview
│       │   └── studymate-mobile.png                   # Mobile responsive preview
│       ├── frontend/                                  # React 18 + Vite client
│       │   ├── index.html                             # Single page HTML entry
│       │   ├── vite.config.js                         # Bundler configuration
│       │   ├── package.json                           # Frontend dependencies
│       │   ├── public/tasks.json                      # Starter sample dataset
│       │   └── src/                                   # Application source code
│       │       ├── main.jsx                           # Application entry point
│       │       ├── App.jsx                            # Main dashboard component & logic
│       │       ├── App.css                            # Dashboard styling
│       │       └── index.css                          # Global design tokens
│       └── backend/                                   # Express REST API server
│           ├── server.js                              # REST endpoints and static serving
│           ├── package.json                           # Backend dependencies
│           └── server/tasks.json                      # Persistent tasks backup
│
└── Group-Project/                                     # Group Project: CivicFix
    ├── README.md                                      # Comprehensive project guide & viva notes
    ├── .gitignore                                     # Group project git ignore
    ├── screenshots/                                   # Real running application previews
    │   ├── 01-home.png                                # Citizen landing & stats
    │   ├── 02-report-form.png                         # Issue reporting interface
    │   ├── 03-track-complaint.png                     # Complaint tracking panel
    │   ├── 04-public-issues.png                       # Filterable issues catalog
    │   └── README.md                                  # Screenshot capture guide
    ├── client/                                        # React 18 + Vite SPA
    │   ├── index.html                                 # HTML template
    │   ├── vite.config.js                             # Vite configuration with /api proxy
    │   ├── package.json                               # Client dependencies
    │   └── src/                                       # Components, pages, hooks, contexts
    └── server/                                        # Node.js + Express REST API
        ├── server.js                                  # Server bootstrap
        ├── package.json                               # Server dependencies
        ├── .env.example                               # Safe environment variable template
        ├── src/                                       # API controllers, models, routes, auth
        ├── uploads/                                   # Uploaded report photo directory
        └── data/                                      # Atomic JSON persistence directory
```

---

## 📝 Detailed Component Overviews

### 1. Observation
- **File**: [`Observation/PDFs/A24126552129 obs.pdf`](Observation/PDFs/A24126552129%20obs.pdf)
- **Description**: Contains documented laboratory observations, exercise analyses, and practical execution logs performed during laboratory sessions throughout the semester.
- **Roll Number**: `A24126552129`

### 2. E-Record / Lab Record
- **File**: [`E-Record/PDFs/Lab_Record_complete_A24126552129.pdf`](E-Record/PDFs/Lab_Record_complete_A24126552129.pdf)
- **Description**: Complete and verified electronic laboratory record covering all scheduled practical experiments, code implementations, outputs, and viva questions.
- **Roll Number**: `A24126552129`

### 3. Assignment-1
- **File**: [`Assignments/Assignment-1/Assignment-1.pdf`](Assignments/Assignment-1/Assignment-1.pdf)
- **Description**: First evaluated coursework assignment document covering foundational full-stack concepts, semantic HTML5, modern CSS3 styling, and client-side scripting.

### 4. Assignment-2: StudyMate Individual Project
- **Location**: [`Assignments/Assignment-2-Individual-Project/`](Assignments/Assignment-2-Individual-Project/)
- **Original GitHub Repository**: [https://github.com/Manishsai878/StudyMate](https://github.com/Manishsai878/StudyMate)
- **Live Deployed Application**: [https://studymate-m1d0.onrender.com/](https://studymate-m1d0.onrender.com/)
- **Description**: **StudyMate** is a clean, single-page application built with React 18 (Vite), pure CSS3, and Node.js/Express. It helps students track, organize, and complete academic coursework with zero unnecessary bloat.
- **Key Features**:
  - Live metric summary cards (Total, Completed, Pending).
  - Dynamic visual progress bar (0% to 100%) with motivational status updates.
  - Real-time live search across title and subject.
  - Status filter tabs (**All**, **Pending**, **Completed**).
  - Automatic overdue deadline alerts (`⚠️ Overdue`).
  - Dual persistence: browser `localStorage` + optional Node.js Express REST API synchronization.
  - Reset to default starter dataset with a single click.

### 5. Group Project: CivicFix Platform
- **Location**: [`Group-Project/`](Group-Project/)
- **Description**: **CivicFix** is a full-stack civic issue reporting and resolution platform enabling citizens to report municipal issues (potholes, garbage, streetlights, drainage) with photos and geolocation, while providing administrators with a secure dashboard to manage and resolve complaints.
- **Key Features**:
  - Citizen issue reporting with validation, photo upload (via Multer), and duplicate detection.
  - Unique complaint tracking ID generation (`CF-YYYYMMDD-XXXXX`) with email verification.
  - Public issue listing with multi-criteria filtering, search, and OpenStreetMap geolocation links.
  - Administrator dashboard with password hashing (Bcrypt), session management, status updates, and audit activity history.
  - Fully articulated MongoDB migration and configuration guide included in the project documentation.

---

## 🛠️ Technologies Used Across the Repository

| Domain | Technologies & Libraries |
|---|---|
| **Frontend Development** | HTML5, CSS3 (Custom Variables, Flexbox, Grid), JavaScript (ES6+), React.js 18, Vite |
| **Backend & APIs** | Node.js, Express.js 4 & 5, RESTful API architecture, CORS middleware |
| **Data & Storage** | Browser `localStorage`, Multer (multipart file handling), Atomic JSON file database, MongoDB / Mongoose schema ready |
| **Security & Utilities** | Bcrypt.js (password hashing), HTTP-only cookies, Rate limiting, Input validation |
| **DevOps & Tooling** | Git, GitHub, Render cloud hosting, Vercel deployment support |

---

## 🚀 Project Setup and Execution Instructions

### Prerequisites
Make sure **Node.js** (v18.0.0 or higher) and **npm** are installed:
```bash
node -v
npm -v
```

---

### Running Assignment-2: StudyMate (Individual Project)

1. Open your terminal and change into the StudyMate folder:
   ```bash
   cd Assignments/Assignment-2-Individual-Project
   ```

2. Install dependencies:
   ```bash
   npm install --prefix frontend
   npm install --prefix backend
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```
   Open your browser at **`http://localhost:5173`**.

4. (Optional) Run the unified backend server:
   ```bash
   npm run server
   ```
   The backend API runs on **`http://localhost:5000`**.

---

### Running Group-Project: CivicFix

1. Open your terminal and change into the Group Project folder:
   ```bash
   cd Group-Project
   ```

2. **Start the Backend Server (Terminal 1)**:
   ```bash
   cd server
   npm install
   # Create your local .env file from the provided example
   copy .env.example .env     # On Windows PowerShell: copy .env.example .env
   ```
   Open `server/.env` and set `ADMIN_PASSWORD` (e.g., `AdminPass123`). Then start the server:
   ```bash
   npm run dev
   ```
   The CivicFix API will run at **`http://localhost:5000`**. Verify via `http://localhost:5000/api/health`.

3. **Start the Frontend Client (Terminal 2)**:
   ```bash
   cd Group-Project/client
   npm install
   npm run dev
   ```
   Open your browser at **`http://localhost:5173`**.

---

## 👨‍🎓 Student Declaration

I hereby declare that the assignments, lab observation records, electronic laboratory record, and project implementations contained in this repository represent my genuine coursework submitted for the Full Stack Web Development course.

- **Student Name**: B. Manish Sai
- **Roll Number**: `A24126552129`
- **Institution**: Full Stack Web Development Department
