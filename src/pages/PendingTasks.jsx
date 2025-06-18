import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Paper,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import TaskCard from '../components/TaskCard';
import { Grid, CircularProgress, Typography } from '@mui/material';
import { getAllTasks, updateTask, deleteTask } from '../api/taskApi';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';


const PendingTasks = () => {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch only incomplete tasks
  const fetchPendingTasks = async () => {
    setLoading(true);
    try {
      const response = await getAllTasks();
      const filtered = Array.isArray(response)
        ? response.filter((task) => !task.completed)
        : (response.tasks || []).filter((task) => !task.completed);

      setPendingTasks(filtered);
    } catch (error) {
      console.error('API fetch error:', error.response?.data || error.message);
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await updateTask(id, updatedData);
      toast.success('Task updated');
      fetchPendingTasks();
    } catch (err) {
      console.error('Update error:', err);
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      toast.success('Task deleted');
      fetchPendingTasks();
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Failed to delete task');
    }
  };

  useEffect(() => {
    fetchPendingTasks();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar username="Tirtha" />
      <div className="flex-1">
        <Navbar />

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
                    <Typography color="text.primary">Pending Task</Typography>
                  </Breadcrumbs>
                </Box>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Pending Tasks</h2>

          {loading ? (
            <div className="flex justify-center mt-10">
              <CircularProgress />
            </div>
          ) : pendingTasks.length === 0 ? (
            <Typography>No pending tasks available.</Typography>
          ) : (
            <Grid container spacing={2}>
              {pendingTasks.map((task) => (
                <TaskCard
                  key={task._id || task.id}
                  task={task}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              ))}
            </Grid>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingTasks;
