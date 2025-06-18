import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Box,
  useTheme,
} from '@mui/material';

const EditTaskDialog = ({ open, onClose, task, onSave }) => {
  const theme = useTheme();

  const [editedTask, setEditedTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    completed: false,
  });

  useEffect(() => {
    if (task) {
      setEditedTask(task);
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: name === 'completed' ? value === 'true' : value,
    }));
  };

  const handleSave = () => {
    onSave(editedTask);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          padding: 2,
          width: '100%',
          maxWidth: 500,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 'bold',
          fontSize: '1.5rem',
          color: theme.palette.primary.main,
          mb: 1,
        }}
      >
        ✏️ Edit Task
      </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Task Title"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Description"
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={3}
            variant="outlined"
          />
          <TextField
            label="Due Date"
            type="date"
            name="dueDate"
            value={editedTask.dueDate?.slice(0, 10)}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={editedTask.priority}
              onChange={handleChange}
              label="Priority"
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Completed</InputLabel>
            <Select
              name="completed"
              value={String(editedTask.completed)}
              onChange={handleChange}
              label="Completed"
            >
              <MenuItem value="true">Yes</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          sx={{
            borderRadius: 2,
            px: 3,
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: 1,
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskDialog;
