import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import Logo from '@/components/ui/logo';
import { Badge } from '@/components/ui/badge';

interface Workspace {
  id: string;
  name: string;
  description: string;
  members: number;
}

const WorkspaceSelector = () => {
  const navigate = useNavigate();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newWorkspace, setNewWorkspace] = useState({ name: '', description: '' });
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);
  
  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    {
      id: '1',
      name: 'CS 370 Team Project',
      description: 'Final project for CS 370 - Software Engineering',
      members: 4,
    },
    {
      id: '2',
      name: 'MATH 201 Study Group',
      description: 'Calculus II study group',
      members: 3,
    }
  ]);
  
  const handleCreateWorkspace = () => {
    if (!newWorkspace.name) {
      toast.error('Workspace name is required');
      return;
    }
    
    const workspace: Workspace = {
      id: Date.now().toString(),
      name: newWorkspace.name,
      description: newWorkspace.description,
      members: 1,
    };
    
    setWorkspaces([...workspaces, workspace]);
    setCreateDialogOpen(false);
    setNewWorkspace({ name: '', description: '' });
    toast.success('Workspace created successfully');
    
    // Select the newly created workspace
    setSelectedWorkspace(workspace);
  };
  
  const handleInviteMember = () => {
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    if (!selectedWorkspace) {
      toast.error('Please select a workspace first');
      return;
    }
    
    toast.success(`Invitation sent to ${email}`);
    setEmail('');
    setInviteDialogOpen(false);
  };
  
  const handleEnterWorkspace = () => {
    if (!selectedWorkspace) {
      toast.error('Please select a workspace first');
      return;
    }
    
    // In a real app, we'd likely store the selected workspace in global state
    toast.success(`Entering ${selectedWorkspace.name}`);
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-white to-unitask-muted">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <Logo size="large" />
          <p className="text-muted-foreground mt-2">Team Project Management for Students</p>
        </div>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Workspaces</CardTitle>
            <CardDescription>
              Select an existing workspace or create a new one for your project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {workspaces.map((workspace) => (
                <Card 
                  key={workspace.id} 
                  className={`cursor-pointer hover:shadow-md transition-shadow ${
                    selectedWorkspace?.id === workspace.id ? 'border-unitask-primary ring-2 ring-unitask-primary ring-opacity-50' : ''
                  }`}
                  onClick={() => setSelectedWorkspace(workspace)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{workspace.name}</CardTitle>
                    <CardDescription>{workspace.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Members: {workspace.members}</p>
                  </CardContent>
                </Card>
              ))}
              
              <Card 
                className="cursor-pointer hover:shadow-md transition-shadow border-dashed flex flex-col items-center justify-center py-8"
                onClick={() => setCreateDialogOpen(true)}
              >
                <PlusCircle className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="font-medium">Create New Workspace</p>
                <p className="text-sm text-muted-foreground">Start a new project</p>
              </Card>
            </div>
            
            <div className="flex justify-between items-center pt-4">
              <Button 
                variant="outline" 
                onClick={() => setInviteDialogOpen(true)}
                disabled={!selectedWorkspace}
              >
                Manage Team
              </Button>
              
              <Button 
                className="bg-unitask-primary hover:bg-unitask-secondary" 
                disabled={!selectedWorkspace}
                onClick={handleEnterWorkspace}
              >
                {selectedWorkspace ? `Enter ${selectedWorkspace.name}` : 'Select a Workspace'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Create Workspace Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Workspace</DialogTitle>
            <DialogDescription>
              Set up a new workspace for your project.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Workspace Name</Label>
              <Input 
                id="name" 
                value={newWorkspace.name}
                onChange={(e) => setNewWorkspace({...newWorkspace, name: e.target.value})}
                placeholder="e.g., CS 101 Final Project"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input 
                id="description" 
                value={newWorkspace.description}
                onChange={(e) => setNewWorkspace({...newWorkspace, description: e.target.value})}
                placeholder="Brief description of your project"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateWorkspace}>
              Create Workspace
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Invite Members Dialog */}
      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Manage Team</DialogTitle>
            <DialogDescription>
              {selectedWorkspace ? `Invite teammates to ${selectedWorkspace.name}` : 'Select a workspace first'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="flex gap-2">
                <Input 
                  id="email" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="teammate@university.edu"
                  className="flex-1"
                />
                <Button onClick={handleInviteMember}>Invite</Button>
              </div>
            </div>
            
            {selectedWorkspace && (
              <div className="border rounded-md p-4 space-y-2">
                <h3 className="font-medium">Current Members</h3>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span>Alex Johnson (You)</span>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Owner</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Casey Smith</span>
                    <Button variant="ghost" size="sm" className="h-6 text-xs text-red-600 hover:text-red-700">Remove</Button>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Jordan Lee</span>
                    <Button variant="ghost" size="sm" className="h-6 text-xs text-red-600 hover:text-red-700">Remove</Button>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Taylor Kim</span>
                    <Button variant="ghost" size="sm" className="h-6 text-xs text-red-600 hover:text-red-700">Remove</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkspaceSelector;
