
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/ui/logo';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Navbar = () => {
  const navigate = useNavigate();
  const [linksDialogOpen, setLinksDialogOpen] = useState(false);
  const [newLink, setNewLink] = useState({ title: '', url: '' });
  const [links, setLinks] = useState([
    { title: 'Group Google Drive', url: 'https://drive.google.com' },
    { title: 'Project Github Repository', url: 'https://github.com' },
    { title: 'Course Website', url: 'https://university.edu' },
  ]);

  const addNewLink = () => {
    if (newLink.title && newLink.url) {
      setLinks([...links, newLink]);
      setNewLink({ title: '', url: '' });
      toast.success('Link added successfully!');
    }
  };
  
  const removeLink = (index: number) => {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
    toast.success('Link removed successfully!');
  };

  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/auth');
  };

  const handleChangeWorkspace = () => {
    navigate('/workspace');
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-unitask-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <Logo />
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setLinksDialogOpen(true)}>
            Hyperlinks
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">CS 370 Team Project</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleChangeWorkspace}>
                  Change Workspace
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Dialog open={linksDialogOpen} onOpenChange={setLinksDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Project Hyperlinks</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-end gap-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link-title">Link Title</Label>
                <Input 
                  id="link-title" 
                  value={newLink.title}
                  onChange={(e) => setNewLink({...newLink, title: e.target.value})}
                  placeholder="Google Drive"
                />
              </div>
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link-url">URL</Label>
                <Input 
                  id="link-url" 
                  value={newLink.url}
                  onChange={(e) => setNewLink({...newLink, url: e.target.value})}
                  placeholder="https://drive.google.com"
                />
              </div>
              <Button type="submit" onClick={addNewLink}>Add</Button>
            </div>
            
            <ScrollArea className="h-72">
              <div className="space-y-2">
                {links.map((link, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-unitask-primary hover:underline"
                    >
                      {link.title}
                    </a>
                    <Button variant="ghost" size="sm" onClick={() => removeLink(index)}>
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          <DialogFooter className="sm:justify-end">
            <Button type="button" variant="secondary" onClick={() => setLinksDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Navbar;
