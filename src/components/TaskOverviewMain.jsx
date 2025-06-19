// src/pages/TaskOverviewMain.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Button,
  Chip,
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Tooltip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { purple, green, orange, red } from '@mui/material/colors';

import ViewTaskDialog from '../components/ViewTaskDialog';
import EditTaskDialog from '../components/EditTaskDialog';
import { getAllTasks, deleteTask, updateTask } from '../api/taskApi';

const TaskOverviewMain = () => {
  const [tabValue, setTabValue] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await getAllTasks();
      const liveTasks = res.tasks || [];
      setTasks(liveTasks);
      setFilteredTasks(liveTasks);
    } catch (err) {
      console.error('Failed to load tasks:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
    const now = new Date();

    const filtered = tasks.filter((task) => {
      const due = new Date(task.dueDate);
      switch (newValue) {
        case 1: return due.toDateString() === now.toDateString(); // Today
        case 2: {
          const weekFromNow = new Date();
          weekFromNow.setDate(now.getDate() + 7);
          return due >= now && due <= weekFromNow;
        }
        case 3: return task.priority === 'High';
        case 4: return task.priority === 'Medium';
        case 5: return task.priority === 'Low';
        default: return true; // All
      }
    });

    setFilteredTasks(filtered);
  };

  const handleView = (task) => {
    setSelectedTask(task);
    setViewOpen(true);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setEditOpen(true);
  };

  const handleSaveEdit = async (updatedTask) => {
    try {
      await updateTask(updatedTask._id, updatedTask);
      await fetchTasks();
      showSnackbar('Task updated successfully!', 'success');
    } catch (err) {
      console.error('Failed to update task:', err.message);
      showSnackbar('Failed to update task.', 'error');
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteTask(taskToDelete);
      await fetchTasks();
      showSnackbar('Task deleted successfully!', 'warning');
    } catch (err) {
      console.error('Delete failed:', err.message);
      showSnackbar('Failed to delete task.', 'error');
    } finally {
      setConfirmOpen(false);
      setTaskToDelete(null);
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: 'success' });
  };

  const taskStats = [
    { label: 'Total Tasks', count: tasks.length, color: purple[500] },
    { label: 'Low Priority', count: tasks.filter((t) => t.priority === 'Low').length, color: green[500] },
    { label: 'Medium Priority', count: tasks.filter((t) => t.priority === 'Medium').length, color: orange[500] },
    { label: 'High Priority', count: tasks.filter((t) => t.priority === 'High').length, color: red[500] },
  ];

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Task Overview</h1>
          <p className="text-gray-500">Manage your tasks efficiently</p>
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/Addtask')}
          sx={{
            backgroundColor: purple[500],
            '&:hover': { backgroundColor: purple[700] },
            fontWeight: 600,
            px: 3,
            py: 1.2,
            borderRadius: 2,
          }}
        >
          Add New Task
        </Button>
      </div>

      {/* Stats */}
      <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', mb: 4 }}>
        <Grid container spacing={2}>
          {taskStats.map(({ label, count, color }) => (
            <Grid item size={{ xs: 12, md: 3 }} key={label}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent sx={{ py: 2, px: 3 }}>
                  <Typography variant="h4" sx={{ fontWeight: 600, color }}>
                    {count}
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'gray.700' }}>
                    {label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Tabs */}
      <Card>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="h6">All Tasks</Typography>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            sx={{ minHeight: 'auto', '& .MuiTab-root': { minHeight: '36px', padding: '6px 12px' } }}
          >
            <Tab label="All" />
            <Tab label="Today" />
            <Tab label="Week" />
            <Tab label="High" />
            <Tab label="Medium" />
            <Tab label="Low" />
          </Tabs>
        </CardContent>
      </Card>

      {/* Task List */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {filteredTasks.map((task) => (
              <Grid item size={{ xs: 12, md: 6 }} key={task._id}>
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}  variant="outlined">
                  <CardContent>
                    <div className="flex justify-between items-start">
                      <div>
                        <Typography className="font-bold text-lg">{task.title}</Typography>
                        <Typography className="text-gray-500">{task.description}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </Typography>
                        <Chip
                          label={task.priority}
                          color={
                            task.priority === 'High'
                              ? 'error'
                              : task.priority === 'Low'
                              ? 'success'
                              : 'warning'
                          }
                          sx={{ mt: 1 }}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Tooltip title="View">
                          <IconButton color="primary" onClick={() => handleView(task)}>
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton color="secondary" onClick={() => handleEdit(task)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            color="error"
                            onClick={() => {
                              setTaskToDelete(task._id);
                              setConfirmOpen(true);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* View / Edit Dialogs */}
      <ViewTaskDialog open={viewOpen} onClose={() => setViewOpen(false)} task={selectedTask} />
      <EditTaskDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        task={selectedTask}
        onSave={handleSaveEdit}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Alert */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TaskOverviewMain;
