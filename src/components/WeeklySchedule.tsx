import { useState } from 'react';
import {
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Box,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Checkbox,
  Divider,
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FlagIcon from '@mui/icons-material/Flag';
import LabelIcon from '@mui/icons-material/Label';
import { Task } from '../App';

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

// Predefined task categories
const PREDEFINED_CATEGORIES = [
  'Work',
  'Study',
  'Personal',
  'Health',
  'Shopping',
  'Social',
  'Home',
  'Finance',
  'Travel',
  'Other'
];

// Motivational quotes for each day
const MOTIVATIONAL_QUOTES = {
  Monday: "The beginning is the most important part of the work. - Plato",
  Tuesday: "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  Wednesday: "The middle of the week is a great time to reflect and adjust. - Anonymous",
  Thursday: "Almost there! Keep pushing forward. - Anonymous",
  Friday: "The only way to do great work is to love what you do. - Steve Jobs",
  Saturday: "Take time to recharge and prepare for the week ahead. - Anonymous",
  Sunday: "Plan your week with intention and purpose. - Anonymous",
};

interface WeeklyScheduleProps {
  tasks: Task[];
  onAddTask: (task: Omit<Task, 'id'>) => void;
  onDeleteTask: (taskId: string) => void;
  onToggleTask: (taskId: string) => void;
}

const WeeklySchedule = ({
  tasks,
  onAddTask,
  onDeleteTask,
  onToggleTask,
}: WeeklyScheduleProps) => {
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    day: 'Monday',
    time: '09:00',
    priority: 'medium' as 'low' | 'medium' | 'high',
    category: 'Work',
  });
  
  // Filter and sort states
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('time');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewTask({
      title: '',
      description: '',
      day: 'Monday',
      time: '09:00',
      priority: 'medium',
      category: 'Work',
    });
  };

  const handleSubmit = () => {
    onAddTask({
      ...newTask,
      completed: false,
    });
    handleClose();
  };

  const getTasksForDay = (day: string) => {
    return tasks.filter((task) => task.day === day);
  };

  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const tasksByDay = DAYS_OF_WEEK.reduce((acc, day) => {
    acc[day] = getTasksForDay(day).length;
    return acc;
  }, {} as Record<string, number>);

  // Get unique categories from tasks and combine with predefined categories
  const categories = Array.from(new Set([
    ...PREDEFINED_CATEGORIES,
    ...tasks.map(task => task.category)
  ])).sort();

  // Filter and sort tasks for a specific day
  const getFilteredAndSortedTasksForDay = (day: string) => {
    let filteredTasks = tasks.filter(task => task.day === day);
    
    // Apply priority filter
    if (filterPriority !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.priority === filterPriority);
    }
    
    // Apply category filter
    if (filterCategory !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.category === filterCategory);
    }
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filteredTasks = filteredTasks.filter(task => 
        task.title.toLowerCase().includes(query) || 
        task.description.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    return [...filteredTasks].sort((a, b) => {
      if (sortBy === 'time') {
        return a.time.localeCompare(b.time);
      } else if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  return (
    <>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Weekly Schedule
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add Task
        </Button>
      </Box>

      <Box sx={{ mb: 4, p: 2, bgcolor: 'primary.light', color: 'white', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          Weekly Focus
        </Typography>
        <Typography variant="body1">
          "The key is not to prioritize what's on your schedule, but to schedule your priorities." - Stephen Covey
        </Typography>
      </Box>

      <Box sx={{ mb: 4, p: 2, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
        <Typography variant="h6" gutterBottom>
          Task Statistics
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ flex: '1 1 200px', p: 2, bgcolor: 'primary.main', color: 'white', borderRadius: 1 }}>
            <Typography variant="h4">{totalTasks}</Typography>
            <Typography variant="body2">Total Tasks</Typography>
          </Box>
          <Box sx={{ flex: '1 1 200px', p: 2, bgcolor: 'success.main', color: 'white', borderRadius: 1 }}>
            <Typography variant="h4">{completedTasks}</Typography>
            <Typography variant="body2">Completed Tasks</Typography>
          </Box>
          <Box sx={{ flex: '1 1 200px', p: 2, bgcolor: 'info.main', color: 'white', borderRadius: 1 }}>
            <Typography variant="h4">{completionRate}%</Typography>
            <Typography variant="body2">Completion Rate</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mb: 4, p: 2, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
        <Typography variant="h6" gutterBottom>
          Filter & Sort Tasks
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField
            label="Search Tasks"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or description..."
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="Priority"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="all">All Priorities</MenuItem>
            <MenuItem value="high">High Priority</MenuItem>
            <MenuItem value="medium">Medium Priority</MenuItem>
            <MenuItem value="low">Low Priority</MenuItem>
          </TextField>
          
          <TextField
            select
            label="Category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="all">All Categories</MenuItem>
            {categories.map(category => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </TextField>
          
          <TextField
            select
            label="Sort By"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="time">Time</MenuItem>
            <MenuItem value="priority">Priority</MenuItem>
            <MenuItem value="title">Title</MenuItem>
          </TextField>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {DAYS_OF_WEEK.map((day) => (
          <Box key={day} sx={{ flex: '1 1 30%', minWidth: '300px' }}>
            <Paper 
              sx={{ 
                p: 2, 
                height: '100%', 
                borderRadius: 2,
                boxShadow: 3,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                },
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)',
              }}
            >
              <Box 
                sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  height: '4px',
                  background: 'linear-gradient(to right, #1976d2, #64b5f6)',
                }} 
              />
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  color: 'primary.main',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  pb: 1,
                  mb: 2,
                }}
              >
                {day}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  mb: 2, 
                  fontStyle: 'italic',
                  p: 1,
                  bgcolor: 'rgba(25, 118, 210, 0.05)',
                  borderRadius: 1,
                  fontSize: '0.85rem',
                }}
              >
                {MOTIVATIONAL_QUOTES[day as keyof typeof MOTIVATIONAL_QUOTES]}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography 
                variant="subtitle2" 
                color="primary" 
                gutterBottom
                sx={{ 
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  '&::before': {
                    content: '""',
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    mr: 1,
                  }
                }}
              >
                Today's Tasks
              </Typography>
              {getFilteredAndSortedTasksForDay(day).map((task) => (
                <Card 
                  key={task.id} 
                  sx={{ 
                    mb: 1,
                    borderRadius: 1.5,
                    boxShadow: 1,
                    transition: 'all 0.2s',
                    '&:hover': {
                      boxShadow: 3,
                    },
                    borderLeft: '3px solid',
                    borderColor: task.priority === 'high' ? 'error.main' : 
                                task.priority === 'medium' ? 'warning.main' : 'success.main',
                  }}
                >
                  <CardContent sx={{ p: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Checkbox
                        checked={task.completed}
                        onChange={() => onToggleTask(task.id)}
                        sx={{ 
                          color: task.priority === 'high' ? 'error.main' : 
                                 task.priority === 'medium' ? 'warning.main' : 'success.main',
                          '&.Mui-checked': {
                            color: task.priority === 'high' ? 'error.main' : 
                                   task.priority === 'medium' ? 'warning.main' : 'success.main',
                          }
                        }}
                      />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            textDecoration: task.completed ? 'line-through' : 'none',
                            fontWeight: 'medium',
                            color: task.completed ? 'text.disabled' : 'text.primary',
                          }}
                        >
                          {task.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            mt: 0.5,
                            '&::before': {
                              content: '""',
                              display: 'inline-block',
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              bgcolor: 'text.secondary',
                              mr: 1,
                            }
                          }}
                        >
                          {task.time}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            mt: 0.5,
                            color: 'text.secondary',
                            fontSize: '0.85rem',
                          }}
                        >
                          {task.description}
                        </Typography>
                        <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          <Chip 
                            icon={<FlagIcon />} 
                            label={task.priority} 
                            size="small" 
                            color={
                              task.priority === 'high' ? 'error' : 
                              task.priority === 'medium' ? 'warning' : 'success'
                            }
                            sx={{ 
                              borderRadius: '12px',
                              fontWeight: 'medium',
                            }}
                          />
                          <Chip 
                            icon={<LabelIcon />} 
                            label={task.category} 
                            size="small" 
                            variant="outlined" 
                            sx={{ 
                              borderRadius: '12px',
                              borderColor: 'primary.light',
                              color: 'primary.main',
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ p: 0.5, justifyContent: 'flex-end' }}>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onDeleteTask(task.id)}
                      sx={{ 
                        '&:hover': {
                          bgcolor: 'error.light',
                          color: 'white',
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              ))}
              {getFilteredAndSortedTasksForDay(day).length === 0 && (
                <Box 
                  sx={{ 
                    textAlign: 'center', 
                    py: 3,
                    bgcolor: 'rgba(0, 0, 0, 0.02)',
                    borderRadius: 1,
                    border: '1px dashed',
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    No tasks scheduled for {day}
                  </Typography>
                </Box>
              )}
            </Paper>
          </Box>
        ))}
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            fullWidth
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={2}
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <TextField
            select
            margin="dense"
            label="Day"
            fullWidth
            value={newTask.day}
            onChange={(e) => setNewTask({ ...newTask, day: e.target.value })}
          >
            {DAYS_OF_WEEK.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Time"
            type="time"
            fullWidth
            value={newTask.time}
            onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            select
            margin="dense"
            label="Priority"
            fullWidth
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
          <TextField
            select
            margin="dense"
            label="Category"
            fullWidth
            value={newTask.category}
            onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WeeklySchedule; 