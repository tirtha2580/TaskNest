import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  Paper,
  Grid,
   Breadcrumbs,
    Link as MuiLink,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, updateProfile, updatePassword } from '../api/userApi';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data.user);
        setName(data.user.name);
        setEmail(data.user.email);
      } catch (error) {
        toast.error('Failed to fetch user details');
      }
    };
    fetchUser();
  }, []);

  const handleProfileUpdate = async () => {
    try {
      await updateProfile({ name, email });
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }

    try {
      await updatePassword({ currentPassword, newPassword });
      toast.success('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error('Failed to update password');
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />

      <Box sx={{ ml: 30, mt: 4, p: 3, backgroundColor: '#f1f5f9', minHeight: '100vh' }}>
        <Box sx={{ marginTop:'-30px',padding: 2, bgcolor: '#f3f4f6' }}>
                  <Breadcrumbs aria-label="breadcrumb">
                    <MuiLink
                      component={Link}
                      underline="hover"
                      color="inherit"
                      to="/dashboard"
                    >
                      Dashboard
                    </MuiLink>
                    <Typography color="text.primary">Add Task</Typography>
                  </Breadcrumbs>
                </Box>
        
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
            👤 Account Settings
          </Typography>

          <Paper
            elevation={4}
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 3,
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Typography variant="h6" gutterBottom color="text.secondary">
              📝 Personal Information
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Box mt={3}>
              <Button
                variant="contained"
                onClick={handleProfileUpdate}
                sx={{
                  background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
                  color: '#fff',
                  px: 4,
                  py: 1,
                  borderRadius: 2,
                  '&:hover': {
                    background: 'linear-gradient(to right, #7c3aed, #a78bfa)',
                  },
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Paper>

          <Divider sx={{ my: 4 }} />

          <Paper
            elevation={4}
            sx={{
              p: 4,
              borderRadius: 3,
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Typography variant="h6" gutterBottom color="text.secondary">
              🔒 Change Password
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Current Password"
                  type="password"
                  fullWidth
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="New Password"
                  type="password"
                  fullWidth
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Confirm New Password"
                  type="password"
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Box mt={3}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handlePasswordUpdate}
                sx={{
                  px: 4,
                  py: 1,
                  borderRadius: 2,
                }}
              >
                Update Password
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default ProfilePage;
