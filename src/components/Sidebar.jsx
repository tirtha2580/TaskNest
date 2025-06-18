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
} from '@mui/material';
import { Home, Schedule, CheckCircle } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          background: 'linear-gradient(to bottom right, #fdf6e3, #e0f7fa, #fce4ec)', // Light pastel gradient
          color: '#333',
          borderRight: '1px solid #ddd',
        },
      }}
    >
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

      <List>
        {navItems.map(({ text, icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <ListItem
              button
              key={text}
              onClick={() => navigate(path)}
              sx={{
                cursor: 'pointer',
                backgroundColor: isActive ? '#ffebee' : 'transparent',
                color: isActive ? '#c62828' : '#37474f',
                fontWeight: isActive ? 'bold' : 'normal',
                '&:hover': {
                  backgroundColor: '#f0f4c3',
                  color: '#4e342e',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? '#c62828' : '#607d8b',
                  minWidth: 40,
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
