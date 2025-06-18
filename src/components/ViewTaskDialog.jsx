import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Chip,
  Box,
  Divider,
  Stack,
} from '@mui/material';
import {
  CalendarMonth as CalendarIcon,
  Flag as PriorityIcon,
  TaskAlt as CompletedIcon,
  Subject as DescriptionIcon,
} from '@mui/icons-material';

const ViewTaskDialog = ({ open, onClose, task }) => {
  if (!task) return null;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getCompletedColor = (status) => {
    return status ? 'success' : 'default';
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 'bold', bgcolor: '#f3f4f6' }}>
        📋 View Task Details
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          {task.title}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={2}>
          {/* Description */}
          <Box display="flex" alignItems="flex-start">
            <DescriptionIcon sx={{ mr: 1, mt: '4px', color: 'text.secondary' }} />
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Description
              </Typography>
              <Typography variant="body1">{task.description}</Typography>
            </Box>
          </Box>

          {/* Due Date */}
          <Box display="flex" alignItems="center">
            <CalendarIcon sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2">
              <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
            </Typography>
          </Box>

          {/* Priority */}
          <Box display="flex" alignItems="center">
            <PriorityIcon sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" sx={{ mr: 1 }}>
              <strong>Priority:</strong>
            </Typography>
            <Chip
              label={task.priority}
              color={getPriorityColor(task.priority)}
              variant="outlined"
            />
          </Box>

          {/* Completed Status */}
          <Box display="flex" alignItems="center">
            <CompletedIcon sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" sx={{ mr: 1 }}>
              <strong>Completed:</strong>
            </Typography>
            <Chip
              label={task.completed ? 'Yes' : 'No'}
              color={getCompletedColor(task.completed)}
              variant="filled"
            />
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewTaskDialog;
