import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewTaskDialog from './ViewTaskDialog';
import EditTaskDialog from './EditTaskDialog';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleView = (task) => {
    setSelectedTask(task);
    setViewOpen(true);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setEditOpen(true);
  };

  const handleSaveEdit = async (updatedTaskData) => {
    if (onUpdate && task._id) {
      await onUpdate(task._id, updatedTaskData);
    }
    setEditOpen(false);
  };

  const handleDelete = async (taskId) => {
    if (onDelete) {
      await onDelete(taskId);
    }
  };

  return (
    <>
      <Grid item size={{ xs: 12, md: 4 }}>
        <Card sx={{ mb: 2,boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <div className="flex justify-between items-start gap-4">
              {/* Task Info */}
              <div>
                <Typography className="font-bold text-lg" style={{fontSize:'20px',fontWeight:"600"}}>{task.title}</Typography>
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

              {/* Icon Buttons */}
              <div className="flex flex-col gap-1 items-end">
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
                  <IconButton color="error" onClick={() => handleDelete(task._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>

      {/* Dialogs */}
      <ViewTaskDialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        task={selectedTask}
      />

      <EditTaskDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        task={selectedTask}
        onSave={handleSaveEdit}
      />
    </>
  );
};

export default TaskCard;
