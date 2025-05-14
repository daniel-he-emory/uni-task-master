
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import TaskCard from '@/components/tasks/task-card';
import { PlusCircle } from 'lucide-react';

// Task interface
export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  status: 'To Do' | 'Doing' | 'Done';
  assignee: string;
  points: number;
  dueDate: string;
  subtasks: SubTask[];
}

// Sample task data
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Create project presentation',
    status: 'To Do',
    assignee: 'Casey',
    points: 5,
    dueDate: '2025-05-20',
    subtasks: [
      { id: '1-1', title: 'Research presentation tools', completed: false },
      { id: '1-2', title: 'Create outline', completed: false },
      { id: '1-3', title: 'Design slides', completed: false },
    ]
  },
  {
    id: '2',
    title: 'Research data collection methods',
    status: 'Doing',
    assignee: 'Alex',
    points: 3,
    dueDate: '2025-05-15',
    subtasks: [
      { id: '2-1', title: 'Review academic papers', completed: true },
      { id: '2-2', title: 'Compile list of methods', completed: false },
    ]
  },
  {
    id: '3',
    title: 'Design user interface mockups',
    status: 'Done',
    assignee: 'Jordan',
    points: 4,
    dueDate: '2025-05-12',
    subtasks: [
      { id: '3-1', title: 'Create wireframes', completed: true },
      { id: '3-2', title: 'Design high-fidelity mockups', completed: true },
      { id: '3-3', title: 'Get team feedback', completed: true },
    ]
  },
  {
    id: '4',
    title: 'Write literature review',
    status: 'Doing',
    assignee: 'Taylor',
    points: 5,
    dueDate: '2025-05-22',
    subtasks: []
  },
  {
    id: '5',
    title: 'Implement API endpoints',
    status: 'To Do',
    assignee: 'Alex',
    points: 4,
    dueDate: '2025-05-25',
    subtasks: []
  },
  {
    id: '6',
    title: 'Create testing plan',
    status: 'To Do',
    assignee: 'Casey',
    points: 3,
    dueDate: '2025-05-18',
    subtasks: []
  },
];

const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'subtasks'>>({
    title: '',
    status: 'To Do',
    assignee: '',
    points: 1,
    dueDate: '',
  });
  
  // Team members
  const teamMembers = ['Alex', 'Casey', 'Jordan', 'Taylor'];
  
  // Filter tasks by status
  const todoTasks = tasks.filter(task => task.status === 'To Do');
  const doingTasks = tasks.filter(task => task.status === 'Doing');
  const doneTasks = tasks.filter(task => task.status === 'Done');
  
  // Handle task creation
  const handleCreateTask = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    
    if (!newTask.title) {
      toast.error('Task title is required');
      return;
    }
    
    if (!newTask.assignee) {
      toast.error('Please assign this task to someone');
      return;
    }
    
    if (!newTask.dueDate || newTask.dueDate < currentDate) {
      toast.error('Please set a valid due date');
      return;
    }
    
    const newTaskWithId: Task = {
      ...newTask,
      id: Date.now().toString(),
      subtasks: []
    };
    
    setTasks([...tasks, newTaskWithId]);
    setDialogOpen(false);
    toast.success('Task created successfully');
    
    // Reset form
    setNewTask({
      title: '',
      status: 'To Do',
      assignee: '',
      points: 1,
      dueDate: '',
    });
  };
  
  // Handle task status change (drag and drop would be implemented in a full app)
  const handleStatusChange = (taskId: string, newStatus: 'To Do' | 'Doing' | 'Done') => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    toast.success(`Task moved to ${newStatus}`);
  };
  
  // Handle task deletion
  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast.success('Task deleted successfully');
  };
  
  // Handle subtask toggle
  const handleToggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: task.subtasks.map(subtask => 
            subtask.id === subtaskId 
              ? { ...subtask, completed: !subtask.completed } 
              : subtask
          )
        };
      }
      return task;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-unitask-primary hover:bg-unitask-secondary">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>Add a new task to your project. Fill out the details below.</DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Task Title</Label>
                <Input 
                  id="title" 
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="e.g., Create project presentation"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="assignee">Assign To</Label>
                <Select 
                  value={newTask.assignee} 
                  onValueChange={(value) => setNewTask({...newTask, assignee: value})}
                >
                  <SelectTrigger id="assignee">
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member} value={member}>
                        {member}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="points">Task Points</Label>
                  <Select 
                    value={newTask.points.toString()} 
                    onValueChange={(value) => setNewTask({...newTask, points: parseInt(value)})}
                  >
                    <SelectTrigger id="points">
                      <SelectValue placeholder="Select points" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 5, 8].map((point) => (
                        <SelectItem key={point} value={point.toString()}>
                          {point}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input 
                    id="dueDate" 
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTask}>Create Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">To Do</h2>
          <div className="task-column">
            {todoTasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onStatusChange={handleStatusChange}
                onDelete={handleDeleteTask}
                onToggleSubtask={handleToggleSubtask}
              />
            ))}
            {todoTasks.length === 0 && (
              <div className="text-center p-4 text-gray-500">
                No tasks yet
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-4">Doing</h2>
          <div className="task-column">
            {doingTasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onStatusChange={handleStatusChange}
                onDelete={handleDeleteTask}
                onToggleSubtask={handleToggleSubtask}
              />
            ))}
            {doingTasks.length === 0 && (
              <div className="text-center p-4 text-gray-500">
                No tasks in progress
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-4">Done</h2>
          <div className="task-column">
            {doneTasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onStatusChange={handleStatusChange}
                onDelete={handleDeleteTask}
                onToggleSubtask={handleToggleSubtask}
              />
            ))}
            {doneTasks.length === 0 && (
              <div className="text-center p-4 text-gray-500">
                No completed tasks
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
