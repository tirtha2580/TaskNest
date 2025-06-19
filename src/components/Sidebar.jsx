import React, { useEffect, useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Box,
  IconButton,
  Divider,
  useMediaQuery,
} from '@mui/material';
import { Home, Schedule, CheckCircle, Menu } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:768px)');
  const [mobileOpen, setMobileOpen] = useState(false);

  const [username, setUsername] = useState('Guest');
  const [firstLetter, setFirstLetter] = useState('G');

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        const data = JSON.parse(storedUser);
        const actualUser = data?.name ? data : data?.user;

        if (actualUser?.name) {
          setUsername(actualUser.name);
          setFirstLetter(actualUser.name.charAt(0).toUpperCase());
        }
      }
    } catch (error) {
      console.error('Error parsing user:', error);
    }
  }, []);

  const navItems = [
    { text: 'Dashboard', icon: <Home />, path: '/dashboard' },
    { text: 'Pending Tasks', icon: <Schedule />, path: '/pending' },
    { text: 'Completed Tasks', icon: <CheckCircle />, path: '/completed' },
  ];

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          paddingY: 3,
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Avatar
          sx={{
            bgcolor: '#81ecec',
            color: '#2d3436',
            width: 56,
            height: 56,
            fontSize: '1.5rem',
          }}
        >
          {firstLetter}
        </Avatar>
        <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 600 }}>
          {username}
        </Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map(({ text, icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <ListItem
              button
              key={text}
              onClick={() => {
                navigate(path);
                if (isMobile) setMobileOpen(false); // close on mobile
              }}
              sx={{
                backgroundColor: isActive ? '#ffebee' : 'transparent',
                color: isActive ? '#c62828' : '#37474f',
                '&:hover': {
                  backgroundColor: '#f0f4c3',
                  color: '#4e342e',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? '#c62828' : '#607d8b',
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 1300,
            bgcolor: 'white',
            boxShadow: 5,
            
          }}
        >
          <Menu />
        </IconButton>
      )}

      {/* Mobile Drawer */}
      {isMobile ? (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: 240,
              background: 'linear-gradient(to bottom right, #fdf6e3, #e0f7fa, #fce4ec)',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        // Desktop Permanent Drawer
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              background: 'linear-gradient(to bottom right, #fdf6e3, #e0f7fa, #fce4ec)',
              boxSizing: 'border-box',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
