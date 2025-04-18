import { Box, Typography, Container, Divider } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import ComputerIcon from '@mui/icons-material/Computer';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CodeIcon color="primary" />
            <Typography variant="h6" color="text.primary">
              Web Developer | MCA Student
            </Typography>
          </Box>
          
          <Divider sx={{ width: '100%', my: 1 }} />
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SchoolIcon color="primary" />
              <Typography variant="body2" color="text.secondary">
                Pursuing Master of Computer Applications
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ComputerIcon color="primary" />
              <Typography variant="body2" color="text.secondary">
                Full Stack Development Enthusiast
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
              <CalendarTodayIcon color="primary" />
              <Typography variant="body2" color="text.secondary">
                Weekly Scheduler - Organize Your Week Efficiently
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Plan your tasks, set priorities, and track your progress throughout the week.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 