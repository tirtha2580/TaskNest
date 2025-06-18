import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Grid,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DoneIcon from '@mui/icons-material/Done';
import { updateTaskStatus } from '../api/taskApi';
import { toast } from 'react-hot-toast';

const TaskStatsSidebar = ({ tasks = [], onStatusChange }) => {
  const [loadingTaskId, setLoadingTaskId] = useState(null);

  const handleToggleCompleted = async (task) => {
    setLoadingTaskId(task._id); // ensure this matches your DB ID field
    try {
      const updated = {
        completed: !task.completed,
      };
      await updateTaskStatus(task._id, updated);
      toast.success(`Marked as ${updated.completed ? 'completed' : 'pending'}`);
      onStatusChange?.(); // Optional refetch
    } catch (err) {
      toast.error('Failed to update status');
    } finally {
      setLoadingTaskId(null);
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    { label: 'Total Tasks', value: totalTasks },
    { label: 'Completed', value: completedTasks },
    { label: 'Pending', value: pendingTasks },
    { label: 'Completion Rate', value: `${completionRate}%` },
  ];

  // ✅ Filter tasks from the last 24 hours
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const recentTasks = tasks
    .filter((task) => new Date(task.createdAt) >= oneDayAgo)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="flex flex-col gap-4">
      {/* Stats Section */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Task Statistics
          </Typography>

       <Grid container spacing={2}>
  {stats.map(({ label, value }, index) => {
    const gradients = [
      'linear-gradient(to right, #fceabb, #f8b500)',  // soft yellow
      'linear-gradient(to right, #e0c3fc, #8ec5fc)',  // light purple-blue
      'linear-gradient(to right, #fbd3e9, #bbd2c5)',  // soft pink-green
      'linear-gradient(to right, #d4fc79, #96e6a1)',  // minty green
      'linear-gradient(to right, #ffecd2, #fcb69f)',  // peach
      'linear-gradient(to right, #c2e9fb, #a1c4fd)',  // sky blue
    ];

    return (
      <Grid item size={{ xs: 12, md: 6}}key={index}>
        <Card
          variant="outlined"
          sx={{
            background: gradients[index % gradients.length],
            borderRadius: 2,
            height: '100%',
            color: '#333', // readable on light gradients
            boxShadow: 2,
          }}
        >
          <CardContent sx={{ textAlign: 'center', p: 3 }}>
            <Typography variant="h5" fontWeight={700}>
              {value}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8 }}>
              {label}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  })}
</Grid>


          <Typography sx={{ mt: 3, fontWeight: 500 }}>Task Progress</Typography>
          <LinearProgress
            variant="determinate"
            value={completionRate}
            sx={{ mt: 1, height: 8, borderRadius: 5 }}
          />
        </CardContent>
      </Card>

      {/* Recent Activity Section (24hrs only) */}
      <Card sx={{ width: '100%' }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Recent Activity (Last 24 Hours)
          </Typography>

          {recentTasks.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No recent tasks.
            </Typography>
          ) : (
            recentTasks.map((task) => (
              <Box
                key={task._id}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <Box>
                  <Typography fontWeight={500}>{task.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <Tooltip title="View">
                    <IconButton size="small">
                      {/* <VisibilityIcon sx={{ color: 'primary.main' }} /> */}
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Toggle Completed">
                    <span>
                      <IconButton
                        size="small"
                        onClick={() => handleToggleCompleted(task)}
                        disabled={loadingTaskId === task._id}
                      >
                        <DoneIcon
                          sx={{
                            color: task.completed ? 'success.main' : 'text.disabled',
                          }}
                        />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Box>
              </Box>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskStatsSidebar;
