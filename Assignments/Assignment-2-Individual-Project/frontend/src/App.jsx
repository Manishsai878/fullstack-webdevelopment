import React, { useState, useEffect } from 'react'
import './App.css'

/**
 * StudyMate - Student Assignment Tracker
 * A beginner-friendly React application for managing college assignments.
 * Uses plain React hooks (useState, useEffect) and browser localStorage.
 */
function App() {
  // -------------------------------------------------------------
  // STATE MANAGEMENT (useState)
  // -------------------------------------------------------------

  // 1. tasks: Stores the list of all student assignments
  const [tasks, setTasks] = useState([])

  // 2. isLoading: Shows loading status when fetching initial sample data
  const [isLoading, setIsLoading] = useState(true)

  // 3. Form input states for creating a new assignment
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [deadline, setDeadline] = useState('')
  const [priority, setPriority] = useState('Medium') // Default to Medium

  // 4. Filter and search states
  const [activeFilter, setActiveFilter] = useState('All') // 'All' | 'Pending' | 'Completed'
  const [searchQuery, setSearchQuery] = useState('')

  // 5. Validation error & temporary toast feedback message
  const [formError, setFormError] = useState('')
  const [toastMessage, setToastMessage] = useState('')

  // -------------------------------------------------------------
  // LOCAL STORAGE HELPER
  // -------------------------------------------------------------
  // Helper function to keep localStorage in sync with our tasks state
  const saveToLocalStorage = (updatedTasks) => {
    localStorage.setItem('studymate_tasks', JSON.stringify(updatedTasks))
  }

  // Helper function to trigger a temporary popup alert
  const showNotification = (msg) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage('')
    }, 3000)
  }

  // -------------------------------------------------------------
  // INITIAL DATA LOADING (useEffect)
  // Connects to Express Backend (/api/tasks) with localStorage fallback
  // -------------------------------------------------------------
  useEffect(() => {
    // Attempt to fetch live tasks from the Express backend
    fetch('/api/tasks')
      .then((res) => {
        if (!res.ok) throw new Error('Backend not available')
        return res.json()
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTasks(data)
          saveToLocalStorage(data)
          setIsLoading(false)
        } else {
          loadFromLocalFallback()
        }
      })
      .catch((err) => {
        console.warn('Backend unavailable, using local storage fallback:', err.message)
        loadFromLocalFallback()
      })
  }, [])

  // Fallback function when running without backend server
  const loadFromLocalFallback = () => {
    const savedData = localStorage.getItem('studymate_tasks')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTasks(parsed)
          setIsLoading(false)
          return
        }
      } catch (e) {
        console.error('Error reading localStorage:', e)
      }
    }

    fetch('./tasks.json')
      .then((r) => r.json())
      .then((initialTasks) => {
        setTasks(initialTasks)
        saveToLocalStorage(initialTasks)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }

  // -------------------------------------------------------------
  // HANDLER FUNCTIONS (CRUD OPERATIONS)
  // -------------------------------------------------------------

  /**
   * handleAddTask:
   * Sends POST /api/tasks to backend, updates state and localStorage
   */
  const handleAddTask = async (e) => {
    e.preventDefault()

    if (!title.trim()) {
      setFormError('Please enter an assignment title.')
      return
    }
    if (!subject.trim()) {
      setFormError('Please select or enter a subject.')
      return
    }
    if (!deadline) {
      setFormError('Please choose a submission deadline date.')
      return
    }

    setFormError('')

    const taskPayload = {
      title: title.trim(),
      subject: subject.trim(),
      deadline: deadline,
      priority: priority
    }

    try {
      // 1. Send POST request to backend
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskPayload)
      })

      if (res.ok) {
        const createdTask = await res.json()
        const updated = [createdTask, ...tasks]
        setTasks(updated)
        saveToLocalStorage(updated)
      } else {
        throw new Error('Server returned error')
      }
    } catch {
      // Fallback: create locally
      const newTask = {
        id: Date.now(),
        ...taskPayload,
        completed: false
      }
      const updated = [newTask, ...tasks]
      setTasks(updated)
      saveToLocalStorage(updated)
    }

    // Reset inputs
    setTitle('')
    setSubject('')
    setDeadline('')
    setPriority('Medium')
    showNotification('✨ New assignment added successfully!')
  }

  /**
   * handleToggleComplete:
   * Sends PUT /api/tasks/:id to backend, toggles complete state
   */
  const handleToggleComplete = async (taskId) => {
    const target = tasks.find((t) => t.id === taskId)
    const nextState = !target?.completed

    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: nextState })
      })
    } catch (err) {
      console.warn('Backend sync failed, updated locally:', err)
    }

    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        if (nextState) {
          showNotification('🎉 Great job! Assignment marked as completed.')
        } else {
          showNotification('↩ Assignment moved back to pending.')
        }
        return { ...task, completed: nextState }
      }
      return task
    })

    setTasks(updatedTasks)
    saveToLocalStorage(updatedTasks)
  }

  /**
   * handleDeleteTask:
   * Sends DELETE /api/tasks/:id to backend, removes assignment
   */
  const handleDeleteTask = async (taskId, taskTitle) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${taskTitle}"?`
    )
    if (!confirmDelete) return

    try {
      await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' })
    } catch (err) {
      console.warn('Backend sync failed, deleted locally:', err)
    }

    const updatedTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(updatedTasks)
    saveToLocalStorage(updatedTasks)
    showNotification('🗑️ Assignment deleted.')
  }

  /**
   * handleResetDemoData:
   * Sends POST /api/tasks/reset to restore initial 6 sample tasks
   */
  const handleResetDemoData = async () => {
    const confirmReset = window.confirm(
      'Reset all assignments to original demo data from tasks.json? Any custom assignments will be replaced.'
    )
    if (!confirmReset) return

    try {
      const res = await fetch('/api/tasks/reset', { method: 'POST' })
      if (res.ok) {
        const resetTasks = await res.json()
        setTasks(resetTasks)
        saveToLocalStorage(resetTasks)
        setSearchQuery('')
        setActiveFilter('All')
        showNotification('🔄 Demo assignments successfully restored!')
        return
      }
    } catch (e) {
      console.warn('Backend reset failed, using local reset:', e)
    }

    // Local fallback
    fetch('./tasks.json')
      .then((res) => res.json())
      .then((initialTasks) => {
        setTasks(initialTasks)
        saveToLocalStorage(initialTasks)
        setSearchQuery('')
        setActiveFilter('All')
        showNotification('🔄 Demo assignments successfully restored!')
      })
  }

  // -------------------------------------------------------------
  // CALCULATIONS FOR DASHBOARD
  // -------------------------------------------------------------
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((t) => t.completed).length
  const pendingTasks = totalTasks - completedTasks
  const completionPercentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)

  // -------------------------------------------------------------
  // FILTERING & SEARCHING
  // -------------------------------------------------------------
  const filteredTasks = tasks.filter((task) => {
    // 1. Filter by status (All / Pending / Completed)
    const matchesFilter =
      activeFilter === 'All'
        ? true
        : activeFilter === 'Completed'
        ? task.completed
        : !task.completed

    // 2. Filter by search query (checks Title or Subject)
    const query = searchQuery.toLowerCase().trim()
    const matchesSearch =
      task.title.toLowerCase().includes(query) ||
      task.subject.toLowerCase().includes(query)

    return matchesFilter && matchesSearch
  })

  // Format date helper (e.g., "2026-10-25" -> "Oct 25, 2026")
  const formatDate = (dateString) => {
    if (!dateString) return 'No date'
    const [year, month, day] = dateString.split('-')
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
    const monthIndex = parseInt(month, 10) - 1
    return `${months[monthIndex]} ${day}, ${year}`
  }

  // Check if a task is overdue (deadline earlier than today and not completed)
  const isOverdue = (deadlineStr, isCompleted) => {
    if (isCompleted || !deadlineStr) return false
    const today = new Date().toISOString().split('T')[0]
    return deadlineStr < today
  }

  // -------------------------------------------------------------
  // RENDER (JSX)
  // -------------------------------------------------------------
  return (
    <div className="app-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. HEADER SECTION */}
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-icon">🎓</div>
          <div>
            <h1 className="brand-title">StudyMate</h1>
            <p className="brand-subtitle">
              Organize your assignments, one task at a time.
            </p>
          </div>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="btn-reset"
            onClick={handleResetDemoData}
            title="Reset to original sample tasks"
          >
            🔄 Reset Demo Data
          </button>
        </div>
      </header>

      {/* 2. DASHBOARD SUMMARY CARDS */}
      <section className="summary-section">
        <div className="summary-card card-total">
          <div className="card-info">
            <span className="card-label">Total Assignments</span>
            <span className="card-number">{totalTasks}</span>
          </div>
          <div className="card-icon">📚</div>
        </div>

        <div className="summary-card card-completed">
          <div className="card-info">
            <span className="card-label">Completed Tasks</span>
            <span className="card-number">{completedTasks}</span>
          </div>
          <div className="card-icon">✅</div>
        </div>

        <div className="summary-card card-pending">
          <div className="card-info">
            <span className="card-label">Pending Tasks</span>
            <span className="card-number">{pendingTasks}</span>
          </div>
          <div className="card-icon">⏳</div>
        </div>
      </section>

      {/* 6. PROGRESS SECTION */}
      <section className="progress-section">
        <div className="progress-header">
          <div className="progress-title-wrap">
            <span className="progress-badge-icon">📊</span>
            <div>
              <h3 className="progress-title">Overall Study Progress</h3>
              <p className="progress-caption">
                {totalTasks === 0
                  ? 'No assignments added yet.'
                  : completedTasks === totalTasks
                  ? 'Awesome work! You have finished all assignments! 🎉'
                  : `${completedTasks} of ${totalTasks} assignments completed (${completionPercentage}%)`}
              </p>
            </div>
          </div>
          <div className="progress-percent-display">{completionPercentage}%</div>
        </div>

        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </section>

      {/* MAIN TWO-COLUMN CONTENT GRID */}
      <main className="dashboard-grid">
        {/* 3. ASSIGNMENT FORM (LEFT COLUMN) */}
        <section className="form-card">
          <div className="section-header">
            <h2>➕ Add New Assignment</h2>
            <p>Enter details of your upcoming college assignment.</p>
          </div>

          {formError && <div className="form-alert">{formError}</div>}

          <form onSubmit={handleAddTask} className="assignment-form">
            {/* Title */}
            <div className="form-group">
              <label htmlFor="task-title">
                Assignment Title <span className="required">*</span>
              </label>
              <input
                id="task-title"
                type="text"
                placeholder="e.g. Implement Binary Search Tree in Python"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
              />
            </div>

            {/* Subject */}
            <div className="form-group">
              <label htmlFor="task-subject">
                Subject <span className="required">*</span>
              </label>
              <select
                id="task-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="form-input"
              >
                <option value="">-- Choose Subject --</option>
                <option value="React JS">React JS</option>
                <option value="DBMS">DBMS</option>
                <option value="Python Programming">Python Programming</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="HTML & Web Tech">HTML & Web Tech</option>
                <option value="CSS Styling">CSS Styling</option>
                <option value="Operating Systems">Operating Systems</option>
                <option value="Computer Networks">Computer Networks</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Other">Other / General</option>
              </select>
            </div>

            {/* Deadline & Priority Row */}
            <div className="form-row">
              <div className="form-group form-group-half">
                <label htmlFor="task-deadline">
                  Deadline Date <span className="required">*</span>
                </label>
                <input
                  id="task-deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group form-group-half">
                <label htmlFor="task-priority">Priority Level</label>
                <select
                  id="task-priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="form-input"
                >
                  <option value="High">🔴 High Priority</option>
                  <option value="Medium">🟡 Medium Priority</option>
                  <option value="Low">🟢 Low Priority</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-primary">
              ➕ Add Assignment
            </button>
          </form>
        </section>

        {/* 4. ASSIGNMENTS LIST & 5. FILTER/SEARCH (RIGHT COLUMN) */}
        <section className="tasks-card">
          {/* Controls: Search and Filter Tabs */}
          <div className="tasks-controls">
            {/* Search Input */}
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by title or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  ✖
                </button>
              )}
            </div>

            {/* Filter Buttons */}
            <div className="filter-tabs">
              <button
                type="button"
                className={`filter-btn ${activeFilter === 'All' ? 'active' : ''}`}
                onClick={() => setActiveFilter('All')}
              >
                All ({totalTasks})
              </button>
              <button
                type="button"
                className={`filter-btn ${activeFilter === 'Pending' ? 'active' : ''}`}
                onClick={() => setActiveFilter('Pending')}
              >
                Pending ({pendingTasks})
              </button>
              <button
                type="button"
                className={`filter-btn ${activeFilter === 'Completed' ? 'active' : ''}`}
                onClick={() => setActiveFilter('Completed')}
              >
                Completed ({completedTasks})
              </button>
            </div>
          </div>

          {/* Task List / Empty State */}
          <div className="tasks-content">
            {isLoading ? (
              <div className="state-message">
                <div className="loader-spinner"></div>
                <p>Loading assignments...</p>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="state-message empty-state">
                <span className="empty-emoji">📝</span>
                <h3>No assignments found</h3>
                <p>
                  {searchQuery || activeFilter !== 'All'
                    ? 'No tasks match your current filter or search criteria.'
                    : 'Your assignment list is currently empty. Use the form to add one!'}
                </p>
                {(searchQuery || activeFilter !== 'All') && (
                  <button
                    type="button"
                    className="btn-outline-small"
                    onClick={() => {
                      setSearchQuery('')
                      setActiveFilter('All')
                    }}
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="tasks-list">
                {filteredTasks.map((task) => {
                  const overdue = isOverdue(task.deadline, task.completed)

                  return (
                    <div
                      key={task.id}
                      className={`task-item ${
                        task.completed ? 'task-item-completed' : ''
                      }`}
                    >
                      {/* Left: Quick Checkbox Toggle */}
                      <button
                        type="button"
                        className={`checkbox-btn ${
                          task.completed ? 'checked' : ''
                        }`}
                        onClick={() => handleToggleComplete(task.id)}
                        title={
                          task.completed
                            ? 'Mark as pending'
                            : 'Mark as completed'
                        }
                      >
                        {task.completed ? '✓' : ''}
                      </button>

                      {/* Middle: Details */}
                      <div className="task-details">
                        <div className="task-meta-top">
                          <span className="subject-tag">{task.subject}</span>
                          <span
                            className={`priority-badge priority-${task.priority.toLowerCase()}`}
                          >
                            {task.priority} Priority
                          </span>
                          {overdue && (
                            <span className="badge-overdue">⚠️ Overdue</span>
                          )}
                        </div>

                        <h3
                          className={`task-title ${
                            task.completed ? 'completed-text' : ''
                          }`}
                        >
                          {task.title}
                        </h3>

                        <div className="task-meta-bottom">
                          <span className="deadline-text">
                            📅 Due: <strong>{formatDate(task.deadline)}</strong>
                          </span>
                          <span
                            className={`status-pill ${
                              task.completed ? 'status-done' : 'status-wait'
                            }`}
                          >
                            {task.completed ? 'Completed' : 'Pending'}
                          </span>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="task-actions">
                        <button
                          type="button"
                          className={`btn-action ${
                            task.completed ? 'btn-undo' : 'btn-complete'
                          }`}
                          onClick={() => handleToggleComplete(task.id)}
                          title={
                            task.completed
                              ? 'Move back to pending'
                              : 'Mark as completed'
                          }
                        >
                          {task.completed ? '↩ Undo' : '✔ Complete'}
                        </button>

                        <button
                          type="button"
                          className="btn-action btn-delete"
                          onClick={() => handleDeleteTask(task.id, task.title)}
                          title="Delete assignment"
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        <p>
          <strong>StudyMate</strong> • Beginner College Full Stack Project •
          Built with React & LocalStorage
        </p>
      </footer>
    </div>
  )
}

export default App
