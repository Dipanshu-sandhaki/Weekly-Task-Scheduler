import { Box, Typography, Container, Divider } from '@mui/material';
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
          
          <Divider sx={{ width: '100%', my: 1 }} />

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

          {/* ✅ Simple copyright text */}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
            © {new Date().getFullYear()} Weekly Task Scheduler. All rights reserved. Created by <strong>Dipanshu Sandhaki</strong>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
