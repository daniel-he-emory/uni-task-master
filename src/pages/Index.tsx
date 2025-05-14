
import React from 'react';
import { Navigate } from 'react-router-dom';

// Redirect from the index page to the auth page
const Index = () => {
  return <Navigate to="/auth" replace />;
};

export default Index;
