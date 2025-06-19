import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
  Paper,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { createTask } from '../api/taskApi';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const AddTask = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    completed: 'No',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createTask(formData);
      toast.success(response?.message || 'Task created!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Error creating task!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f9fafb' }}>
      {/* Sidebar */}
      <Box sx={{ width: '240px', bgcolor: '#1f2937', color: 'white' }}>
        <Sidebar />
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1}}>
        <Navbar />

        {/* Breadcrumbs */}
        <Box sx={{ padding: 2, bgcolor: '#f3f4f6' }}>
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

        {/* Form Section */}
        <Box
          sx={{
            maxWidth: 800,
            mx: 'auto',
            mt: 4,
            px: 3,
          }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 5,
              borderRadius: 4,
              background: 'white',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            }}
          >
            <Typography
              variant="h4"
              align="center"
              fontWeight="600"
              sx={{ color: '#1f2937', mb: 3 }}
            >
              📝 Add New Task
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                label="Title"
                name="title"
                fullWidth
                required
                value={formData.title}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />
              <TextField
                label="Description"
                name="description"
                fullWidth
                required
                multiline
                minRows={3}
                value={formData.description}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />
              <TextField
                select
                label="Priority"
                name="priority"
                fullWidth
                value={formData.priority}
                onChange={handleChange}
                sx={{ mb: 3 }}
              >
                {['Low', 'Medium', 'High'].map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Due Date"
                name="dueDate"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.dueDate}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />
              {/* <TextField
                select
                label="Completed"
                name="completed"
                fullWidth
                value={formData.completed}
                onChange={handleChange}
                sx={{ mb: 4 }}
              >
                <MenuItem value="No">No</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
              </TextField> */}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  background: 'linear-gradient(to right, #6366f1, #3b82f6)',
                  fontWeight: 'bold',
                  py: 1.5,
                  fontSize: '1rem',
                  borderRadius: 2,
                  boxShadow: 2,
                  '&:hover': {
                    background: 'linear-gradient(to right, #4f46e5, #2563eb)',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Create Task'}
              </Button>
            </form>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default AddTask;
