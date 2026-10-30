import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Setup directory name for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use(cors()) // Enable Cross-Origin Resource Sharing
app.use(express.json()) // Parse JSON request bodies

// Path to our server JSON database
const DATA_FILE = path.join(__dirname, 'server', 'tasks.json')

// Default 6 Demo tasks for resetting
const DEFAULT_TASKS = [
  {
    id: 1,
    title: "Build Responsive College Event Portfolio Website",
    subject: "HTML & Web Tech",
    deadline: "2026-10-20",
    priority: "High",
    completed: true
  },
  {
    id: 2,
    title: "Design CSS Grid Layout for Student Dashboard",
    subject: "CSS Styling",
    deadline: "2026-10-25",
    priority: "Medium",
    completed: false
  },
  {
    id: 3,
    title: "Create Student Assignment Tracker Component using Hooks",
    subject: "React JS",
    deadline: "2026-10-28",
    priority: "High",
    completed: true
  },
  {
    id: 4,
    title: "Write SQL Queries for Library Management System Schema",
    subject: "DBMS",
    deadline: "2026-11-02",
    priority: "High",
    completed: false
  },
  {
    id: 5,
    title: "Implement File Handling and Exception Handling Script",
    subject: "Python Programming",
    deadline: "2026-11-08",
    priority: "Medium",
    completed: false
  },
  {
    id: 6,
    title: "Supervised Classification Lab on Iris Dataset using Scikit-Learn",
    subject: "Machine Learning",
    deadline: "2026-11-15",
    priority: "Low",
    completed: false
  }
]

// Helper function: Read tasks from server/tasks.json
function readTasks() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_TASKS, null, 2), 'utf8')
      return DEFAULT_TASKS
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading tasks file:', error)
    return DEFAULT_TASKS
  }
}

// Helper function: Write tasks to server/tasks.json
function writeTasks(tasks) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf8')
  } catch (error) {
    console.error('Error writing tasks file:', error)
  }
}

// ============================================================
// REST API ROUTES (BACKEND)
// ============================================================

// 1. GET /api/tasks - Retrieve all assignments
app.get('/api/tasks', (req, res) => {
  const tasks = readTasks()
  res.json(tasks)
})

// 2. POST /api/tasks - Add a new assignment
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'StudyMate backend is running!' })
})

app.post('/api/tasks', (req, res) => {
  const { title, subject, deadline, priority } = req.body

  if (!title || !subject || !deadline) {
    return res.status(400).json({ error: 'Title, subject, and deadline are required.' })
  }

  const tasks = readTasks()
  const newTask = {
    id: Date.now(),
    title: title.trim(),
    subject: subject.trim(),
    deadline: deadline,
    priority: priority || 'Medium',
    completed: false
  }

  const updatedTasks = [newTask, ...tasks]
  writeTasks(updatedTasks)

  res.status(201).json(newTask)
})

// 3. PUT /api/tasks/:id - Toggle task completed status
app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10)
  const tasks = readTasks()

  let found = false
  const updatedTasks = tasks.map((task) => {
    if (task.id === taskId) {
      found = true
      // If completed boolean is provided in body, use it; otherwise toggle
      const newStatus = req.body.completed !== undefined ? req.body.completed : !task.completed
      return { ...task, completed: newStatus }
    }
    return task
  })

  if (!found) {
    return res.status(404).json({ error: 'Task not found' })
  }

  writeTasks(updatedTasks)
  const modified = updatedTasks.find((t) => t.id === taskId)
  res.json(modified)
})

// 4. DELETE /api/tasks/:id - Delete an assignment
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10)
  const tasks = readTasks()

  const updatedTasks = tasks.filter((t) => t.id !== taskId)
  if (tasks.length === updatedTasks.length) {
    return res.status(404).json({ error: 'Task not found' })
  }

  writeTasks(updatedTasks)
  res.json({ message: 'Task deleted successfully', id: taskId })
})

// 5. POST /api/tasks/reset - Restore initial demo tasks
app.post('/api/tasks/reset', (req, res) => {
  writeTasks(DEFAULT_TASKS)
  res.json(DEFAULT_TASKS)
})

// ============================================================
// COMBINED FRONTEND SERVING (STATIC ASSETS)
// ============================================================
// Check if compiled React build exists (e.g., in production)
const distPath = path.join(__dirname, '..', 'frontend', 'dist')
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath))
  app.use((req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.json({
      status: 'online',
      message: 'StudyMate Express Backend API is running.',
      endpoints: {
        health: 'GET /api/health',
        tasks: 'GET /api/tasks',
        addTask: 'POST /api/tasks',
        toggleTask: 'PUT /api/tasks/:id',
        deleteTask: 'DELETE /api/tasks/:id',
        reset: 'POST /api/tasks/reset'
      }
    })
  })
}

// Start unified server
app.listen(PORT, () => {
  console.log(`🚀 StudyMate Full Stack Server running on http://localhost:${PORT}`)
})
