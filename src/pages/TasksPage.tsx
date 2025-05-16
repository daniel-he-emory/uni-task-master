
import React, { useEffect } from 'react';
import TaskBoard from '@/components/tasks/task-board';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const TasksPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
      toast.error('Please login to access the task board');
      navigate('/auth');
    }
  }, [navigate]);
  
  return <TaskBoard />;
};

export default TasksPage;
