import React, { useState } from 'react';
import {
  TextField, Button, Typography, InputAdornment, Box
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/authApi';
import { toast } from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const credentials = { email, password };
    const userData = await loginUser(credentials);

    // console.log('🔓 Login Response:', userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
    toast.success('Login successful!');
    navigate('/dashboard');
  } catch (err) {
    toast.error(err.response?.data?.message || 'Login failed!');
  } finally {
    setLoading(false);
  }
};


  return (
    <Box
      className="min-h-screen flex items-center justify-center px-4"
      sx={{
        background: 'linear-gradient(135deg, #7c3aed, #ec4899, #f43f5e)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >

       
        <Box
          sx={{
            p: 5,
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 5,
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#4c1d95' }}
          >
            Welcome Back 👋
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 3, color: 'text.secondary' }}
          >
            Sign in to continue
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              variant="filled"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2, backgroundColor: '#f3f4f6', borderRadius: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              variant="filled"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3, backgroundColor: '#f3f4f6', borderRadius: 2 }}
            />

          <Button
  type="submit"
  variant="contained"
  fullWidth
  disabled={loading}
  sx={{
    background: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
    paddingY: 1.3,
    fontWeight: 'bold',
    fontSize: '1.05rem',
    borderRadius: 3,
    textTransform: 'none',
    boxShadow: '0 4px 20px rgba(236, 72, 153, 0.4)',
    '&:hover': {
      background: 'linear-gradient(90deg, #ec4899, #8b5cf6)',
    },
  }}
>
  {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Sign In'}
</Button>

          </form>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-purple-700 underline font-semibold">
              Sign Up
            </Link>
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Login;
