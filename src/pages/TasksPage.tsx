
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
      navigate('/auth', { state: { redirect: '/tasks' } });
    }
  }, [navigate]);
  
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-unitask-primary to-unitask-accent">Task Board</h1>
      <TaskBoard />
    </div>
  );
};

export default TasksPage;
