import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import TaskOverviewMain from '../components/TaskOverviewMain';
import TaskStatsSidebar from '../components/TaskStatsSidebar';
import { getAllTasks } from '../api/taskApi';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getAllTasks();
      if (Array.isArray(data)) {
        setTasks(data);
      } else if (data.tasks) {
        setTasks(data.tasks);
      } else {
        setTasks([]);
      }
    } catch (error) {
      toast.error('Failed to load tasks');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar username="Tirtha" />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-8/12">
              <TaskOverviewMain tasks={tasks} onStatusChange={fetchTasks} />
            </div>
            <div className="w-full md:w-4/12">
              <TaskStatsSidebar tasks={tasks} onStatusChange={fetchTasks} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
