
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { ChevronDown, ChevronRight, MoreHorizontal, PlusCircle } from 'lucide-react';
import { Task, SubTask } from './task-board';
import { Badge } from '@/components/ui/badge';

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, status: 'To Do' | 'Doing' | 'Done') => void;
  onDelete: (taskId: string) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
}

const TaskCard = ({ task, onStatusChange, onDelete, onToggleSubtask }: TaskCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [addSubtaskDialogOpen, setAddSubtaskDialogOpen] = useState(false);
  const [newSubtask, setNewSubtask] = useState('');
  
  // Format date to more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  // Calculate days left until due date
  const calculateDaysLeft = (dateString: string) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    
    // Set time to midnight for accurate day calculation
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  const daysLeft = calculateDaysLeft(task.dueDate);
  
  // Handle adding a new subtask
  const handleAddSubtask = () => {
    if (!newSubtask.trim()) {
      toast.error('Subtask cannot be empty');
      return;
    }
    
    const newSubtaskItem: SubTask = {
      id: `${task.id}-${Date.now()}`,
      title: newSubtask,
      completed: false,
    };
    
    // In a real app, you would update the task with the new subtask via API
    // For this demo, we'll handle it in the parent component
    // onAddSubtask(task.id, newSubtaskItem);
    
    setNewSubtask('');
    setAddSubtaskDialogOpen(false);
    toast.success('Subtask added');
    
    // Expand the task to show the new subtask
    setExpanded(true);
  };

  return (
    <Card className="task-card">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{task.title}</h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
            <span className="font-medium">Assignee: {task.assignee}</span>
            <span>•</span>
            <span>Points: {task.points}</span>
          </div>
        </div>
        
        <div className="flex">
          {task.subtasks.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="h-8 w-8 p-0"
            >
              {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAddSubtaskDialogOpen(true)}
            className="h-8 w-8 p-0"
          >
            <PlusCircle size={16} />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => onStatusChange(task.id, 'To Do')}
                disabled={task.status === 'To Do'}
              >
                Move to To Do
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onStatusChange(task.id, 'Doing')}
                disabled={task.status === 'Doing'}
              >
                Move to Doing
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onStatusChange(task.id, 'Done')}
                disabled={task.status === 'Done'}
              >
                Move to Done
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onDelete(task.id)}
                className="text-red-600"
              >
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {task.subtasks.length > 0 && expanded && (
        <div className="mt-4 space-y-2 border-t pt-2">
          {task.subtasks.map((subtask) => (
            <div key={subtask.id} className="flex items-start space-x-2">
              <Checkbox 
                id={subtask.id} 
                checked={subtask.completed}
                onCheckedChange={() => onToggleSubtask(task.id, subtask.id)}
              />
              <label 
                htmlFor={subtask.id}
                className={`text-sm ${subtask.completed ? 'line-through text-gray-400' : ''}`}
              >
                {subtask.title}
              </label>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4 flex justify-between items-center">
        <div>
          <Badge 
            className={`
              ${daysLeft < 0 ? 'bg-red-100 text-red-800' : 
                daysLeft <= 2 ? 'bg-yellow-100 text-yellow-800' : 
                'bg-green-100 text-green-800'}
              font-normal
            `}
          >
            {daysLeft < 0 
              ? `Overdue by ${Math.abs(daysLeft)} days` 
              : daysLeft === 0 
                ? 'Due Today' 
                : `${daysLeft} days left`
            }
          </Badge>
        </div>
        <div className="text-xs text-gray-500">
          {formatDate(task.dueDate)}
        </div>
      </div>
      
      {/* Add Subtask Dialog */}
      <Dialog open={addSubtaskDialogOpen} onOpenChange={setAddSubtaskDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Subtask</DialogTitle>
            <DialogDescription>
              Break down this task into smaller steps.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <Input 
              placeholder="Enter subtask"
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddSubtaskDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSubtask}>
              Add Subtask
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TaskCard;
