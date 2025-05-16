
import React, { useEffect } from 'react';
import MeetingCalendar from '@/components/calendar/meeting-calendar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const SchedulePage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
      toast.error('Please login to access the meeting scheduler');
      navigate('/auth');
    }
  }, [navigate]);
  
  return <MeetingCalendar />;
};

export default SchedulePage;
