import { AppBar, Toolbar, Typography } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <CalendarTodayIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Weekly Task Scheduler
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 