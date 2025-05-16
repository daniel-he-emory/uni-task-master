
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
      navigate('/auth');
    }
  }, [navigate]);
  
  return <ReportForm />;
};

export default ReportsPage;
