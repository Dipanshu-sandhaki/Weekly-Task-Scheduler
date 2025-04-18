import { useState, useEffect } from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { Container, Box } from '@mui/material'
import WeeklySchedule from './components/WeeklySchedule'
import Header from './components/Header'
import Footer from './components/Footer'

export interface Task {
  id: string
  title: string
  description: string
  day: string
  time: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  category: string
}

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const savedTasks = localStorage.getItem('tasks')
      return savedTasks ? JSON.parse(savedTasks) : []
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error)
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error)
    }
  }, [tasks])

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
    }
    setTasks(prevTasks => [...prevTasks, newTask])
  }

  const deleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
  }

  const toggleTask = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: 'background.default' 
      }}>
        <Header />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
          <WeeklySchedule
            tasks={tasks}
            onAddTask={addTask}
            onDeleteTask={deleteTask}
            onToggleTask={toggleTask}
          />
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default App
