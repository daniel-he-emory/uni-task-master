
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const AccountForm = () => {
  const navigate = useNavigate();
  
  const currentUser = {
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@university.edu',
    workspace: 'CS 370 Team Project',
  };
  
  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/auth');
  };
  
  const handleChangeWorkspace = () => {
    navigate('/workspace');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Account</h1>
      </div>
      
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <Avatar className="h-24 w-24 mx-auto">
            <AvatarFallback className="text-3xl bg-unitask-primary text-white">
              {currentUser.firstName.charAt(0)}{currentUser.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4">{`${currentUser.firstName} ${currentUser.lastName}`}</CardTitle>
          <CardDescription>{currentUser.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-md p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Current Workspace</h3>
              <p className="font-medium">{currentUser.workspace}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline" onClick={handleChangeWorkspace}>
            Change Workspace
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            Log Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AccountForm;
