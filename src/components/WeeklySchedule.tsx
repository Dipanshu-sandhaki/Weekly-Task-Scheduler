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
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FlagIcon from '@mui/icons-material/Flag';
import LabelIcon from '@mui/icons-material/Label';
import { Task } from '../App';

const DAYS_OF_WEEK = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const PREDEFINED_CATEGORIES = [
  'Work', 'Study', 'Personal', 'Health', 'Shopping', 'Social', 'Home', 'Finance', 'Travel', 'Other'
];

const MOTIVATIONAL_QUOTES: Record<string, string> = {
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
  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'completed'>>({
    title: '',
    description: '',
    day: 'Monday',
    time: '09:00',
    priority: 'medium',
    category: 'Work',
  });

  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('time');
  const [searchQuery, setSearchQuery] = useState('');

  const handleClickOpen = () => setOpen(true);
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
    if (!newTask.title.trim()) return;
    onAddTask({ ...newTask, completed: false });
    handleClose();
  };

  const categories = Array.from(new Set([...PREDEFINED_CATEGORIES, ...tasks.map(t => t.category)])).sort();

  const getFilteredAndSortedTasksForDay = (day: string) => {
    let filtered = tasks.filter(t => t.day === day);

    if (filterPriority !== 'all') {
      filtered = filtered.filter(t => t.priority === filterPriority);
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(t => t.category === filterCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      );
    }

    return filtered.sort((a, b) => {
      if (sortBy === 'time') return a.time.localeCompare(b.time);
      if (sortBy === 'priority') {
        const order = { high: 0, medium: 1, low: 2 };
        return order[a.priority] - order[b.priority];
      }
      return a.title.localeCompare(b.title);
    });
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Weekly Schedule</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
          Add Task
        </Button>
      </Box>

      {/* Weekly Focus */}
      <Box sx={{ bgcolor: 'primary.light', color: 'white', p: 2, borderRadius: 1, mb: 3 }}>
        <Typography variant="h6">Weekly Focus</Typography>
        <Typography variant="body1">
          "The key is not to prioritize what's on your schedule, but to schedule your priorities." – Stephen Covey
        </Typography>
      </Box>

      {/* Task Stats */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
        <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, borderRadius: 1, flex: 1 }}>
          <Typography variant="h4">{totalTasks}</Typography>
          <Typography>Total Tasks</Typography>
        </Box>
        <Box sx={{ bgcolor: 'success.main', color: 'white', p: 2, borderRadius: 1, flex: 1 }}>
          <Typography variant="h4">{completedTasks}</Typography>
          <Typography>Completed</Typography>
        </Box>
        <Box sx={{ bgcolor: 'info.main', color: 'white', p: 2, borderRadius: 1, flex: 1 }}>
          <Typography variant="h4">{completionRate}%</Typography>
          <Typography>Completion Rate</Typography>
        </Box>
      </Box>

      {/* Filters */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <TextField
          fullWidth
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <TextField
          select
          label="Priority"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="low">Low</MenuItem>
        </TextField>
        <TextField
          select
          label="Category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="all">All</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
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

      {/* Task Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {DAYS_OF_WEEK.map(day => (
          <Paper key={day} sx={{ p: 2, flex: '1 1 30%', minWidth: 300 }}>
            <Typography variant="h6" color="primary">{day}</Typography>
            <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1 }}>
              {MOTIVATIONAL_QUOTES[day]}
            </Typography>
            {getFilteredAndSortedTasksForDay(day).map(task => (
              <Card
                key={task.id}
                sx={{
                  mb: 1,
                  borderLeft: `4px solid ${task.priority === 'high'
                    ? '#d32f2f'
                    : task.priority === 'medium'
                      ? '#ed6c02'
                      : '#2e7d32'}`
                }}
              >
                <CardContent sx={{ p: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox
                      checked={task.completed}
                      onChange={() => onToggleTask(task.id)}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {task.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">{task.time}</Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{task.description}</Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        <Chip icon={<FlagIcon />} size="small" label={task.priority} />
                        <Chip icon={<LabelIcon />} size="small" label={task.category} variant="outlined" />
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 1, justifyContent: 'flex-end' }}>
                  <IconButton color="error" onClick={() => onDeleteTask(task.id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
            {getFilteredAndSortedTasksForDay(day).length === 0 && (
              <Typography variant="body2" color="text.secondary">
                No tasks for {day}
              </Typography>
            )}
          </Paper>
        ))}
      </Box>

      {/* Add Task Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Title" margin="dense" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
          <TextField fullWidth label="Description" margin="dense" multiline value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
          <TextField fullWidth select label="Day" margin="dense" value={newTask.day} onChange={(e) => setNewTask({ ...newTask, day: e.target.value })}>
            {DAYS_OF_WEEK.map(day => <MenuItem key={day} value={day}>{day}</MenuItem>)}
          </TextField>
          <TextField fullWidth label="Time" type="time" margin="dense" value={newTask.time} onChange={(e) => setNewTask({ ...newTask, time: e.target.value })} InputLabelProps={{ shrink: true }} />
          <TextField fullWidth select label="Priority" margin="dense" value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'low' | 'medium' | 'high' })}>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
          <TextField fullWidth select label="Category" margin="dense" value={newTask.category} onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}>
            {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WeeklySchedule;
