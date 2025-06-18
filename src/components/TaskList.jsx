import React from 'react';
import { Card, CardContent, Typography, Chip } from '@mui/material';

const tasks = [
  { title: 'Task 1', status: 'pending', priority: 'High', date: '2025-06-10' },
  { title: 'Task 2', status: 'completed', priority: 'Low', date: '2025-06-09' },
  { title: 'Task 3', status: 'pending', priority: 'Medium', date: '2025-06-11' },
];

const TaskList = ({ filter }) => {
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {filter === 'all'
          ? 'All Tasks'
          : filter === 'pending'
          ? 'Pending Tasks'
          : 'Completed Tasks'}
      </Typography>

      {filteredTasks.map((task, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Due: {task.date}
                </Typography>
              </div>
              <Chip
                label={task.priority}
                color={
                  task.priority === 'High'
                    ? 'error'
                    : task.priority === 'Medium'
                    ? 'warning'
                    : 'success'
                }
              />
            </div>
          </CardContent>
        </Card>
      ))}

      {filteredTasks.length === 0 && (
        <Typography color="text.secondary">No tasks found.</Typography>
      )}
    </>
  );
};

export default TaskList;
