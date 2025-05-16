
import React, { useEffect } from 'react';
import ReportForm from '@/components/reports/report-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ReportsPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
      toast.error('Please login to access the reports');
      navigate('/auth', { state: { redirect: '/reports' } });
    }
  }, [navigate]);
  
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-unitask-primary to-unitask-accent">Reports</h1>
      <ReportForm />
    </div>
  );
};

export default ReportsPage;
