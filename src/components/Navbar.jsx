import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
  Tooltip, // ✅ Import Tooltip
} from '@mui/material';
import { AccountCircle, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';

// Slide transition for dialog
const Transition = React.forwardRef((props, ref) => (
  <Slide direction="down" ref={ref} {...props} />
));

const Navbar = () => {
  const navigate = useNavigate();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(to right, #7c3aed, #a78bfa)',
          color: '#fff',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Left Spacer */}
          <Box sx={{ flex: 1 }} />

          {/* Centered Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <OfflineBoltIcon sx={{ fontSize: 32 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', letterSpacing: 0.5 ,fontFamily:"fantasy"}}>
              TaskNest
            </Typography>
          </Box>

          {/* Right Icons with Tooltips */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Tooltip title="Profile" arrow>
              <IconButton sx={{ color: 'white' }} onClick={handleProfileClick}>
                <AccountCircle />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout" arrow>
              <IconButton sx={{ color: 'white' }} onClick={() => setLogoutDialogOpen(true)}>
                <Logout />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setLogoutDialogOpen(false)}
      >
        <DialogTitle>{"Confirm Logout"}</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="error" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;
