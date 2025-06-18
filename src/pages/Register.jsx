import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { registerUser } from '../api/authApi';
import toast from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';


const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
 const [loading, setLoading] = useState(false);



const handleSubmit = async (e) => {
  e.preventDefault();
  const { name, email, password, confirmPassword } = formData;

  if (password !== confirmPassword) {
    toast.error('Passwords do not match!');
    return;
  }

  try {
    setLoading(true); // 🔄 Start loading
    const data = await registerUser({ name, email, password });
    toast.success(data.message || 'Registered successfully!');
    navigate('/');
  } catch (err) {
    toast.error(err?.response?.data?.message || 'Registration failed!');
  } finally {
    setLoading(false); // ✅ Stop loading
  }
};


  return (
    <Box
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      sx={{
        background: 'linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6)',
        backgroundSize: '180% 180%',
        animation: 'gradient-move 6s ease infinite',
        '@keyframes gradient-move': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      }}
    >
      {/* Glow blobs */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-purple-300 opacity-30 blur-3xl"
        style={{ top: '-80px', left: '-80px' }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-green-300 opacity-30 blur-3xl"
        style={{ bottom: '-80px', right: '-80px' }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, -360, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="w-full max-w-md"
      >
        <Box
          sx={{
            p: 5,
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 5,
            backdropFilter: 'blur(14px)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: 'bold', color: '#1e3a8a', mb: 1 }}
          >
            Create Account
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ color: 'text.secondary', mb: 4 }}
          >
            Sign up to get started
          </Typography>

          <form onSubmit={handleSubmit}>
            {[
              {
                label: 'Full Name',
                value: formData.name,
                onChange: (e) => setFormData({ ...formData, name: e.target.value }),
                icon: <PersonOutlineIcon />,
                type: 'text',
              },
              {
                label: 'Email',
                value: formData.email,
                onChange: (e) => setFormData({ ...formData, email: e.target.value }),
                icon: <EmailOutlinedIcon />,
                type: 'email',
              },
              {
                label: 'Password',
                value: formData.password,
                onChange: (e) => setFormData({ ...formData, password: e.target.value }),
                icon: <LockOutlinedIcon />,
                type: 'password',
              },
              {
                label: 'Confirm Password',
                value: formData.confirmPassword,
                onChange: (e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value }),
                icon: <LockOutlinedIcon />,
                type: 'password',
              },
            ].map(({ label, value, onChange, icon, type }, i) => (
              <TextField
                key={i}
                label={label}
                type={type}
                fullWidth
                required
                variant="filled"
                value={value}
                onChange={onChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">{icon}</InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  backgroundColor: '#f9fafb',
                  borderRadius: 2,
                  '& .MuiFilledInput-root': {
                    backgroundColor: 'transparent',
                    color: '#111827',
                  },
                  '& .MuiInputLabel-root': { color: '#374151', fontWeight: 600 },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#22c55e' },
                  '& .MuiFilledInput-root.Mui-focused': {
                    backgroundColor: 'rgba(34, 197, 94, 0.08)',
                  },
                }}
              />
            ))}

        <Button
  type="submit"
  fullWidth
  variant="contained"
  disabled={loading}
  sx={{
    background: 'linear-gradient(90deg, #10b981, #3b82f6)',
    paddingY: 1.5,
    fontWeight: 'bold',
    fontSize: '1.05rem',
    borderRadius: 3,
    boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)',
    '&:hover': {
      background: 'linear-gradient(90deg, #3b82f6, #10b981)',
    },
  }}
>
  {loading ? (
    <CircularProgress size={24} sx={{ color: '#fff' }} />
  ) : (
    'Sign Up'
  )}
</Button>


          </form>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Already have an account?{' '}
            <Link
              to="/"
              className="text-blue-700 underline font-semibold hover:text-blue-900"
            >
              Sign In
            </Link>
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Register;
