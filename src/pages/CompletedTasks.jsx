import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Paper,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import { Grid, CircularProgress, Typography } from '@mui/material';
import { getAllTasks, updateTask, deleteTask } from '../api/taskApi';
import { toast } from 'react-hot-toast';

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompletedTasks = async () => {
    setLoading(true);
    try {
      const response = await getAllTasks();
      const filtered = Array.isArray(response)
        ? response.filter((task) => task.completed)
        : (response.tasks || []).filter((task) => task.completed);

      setCompletedTasks(filtered);
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
      fetchCompletedTasks(); // Refresh after update
    } catch (err) {
      console.error('Update error:', err);
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      toast.success('Task deleted');
      fetchCompletedTasks(); // Refresh after delete
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Failed to delete task');
    }
  };

  useEffect(() => {
    fetchCompletedTasks();
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
                            <Typography color="text.primary">Completed Task</Typography>
                          </Breadcrumbs>
                        </Box>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Completed Tasks</h2>

          {loading ? (
            <div className="flex justify-center mt-10">
              <CircularProgress />
            </div>
          ) : completedTasks.length === 0 ? (
            <Typography>No completed tasks available.</Typography>
          ) : (
            <Grid container spacing={2}>
              {completedTasks.map((task) => (
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

export default CompletedTasks;
