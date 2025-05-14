
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Sample task data
const taskData = [
  {
    id: 1,
    title: 'Create project presentation',
    status: 'To Do',
    assignee: 'Casey',
    points: 5,
    dueDate: '2025-05-20',
  },
  {
    id: 2,
    title: 'Research data collection methods',
    status: 'Doing',
    assignee: 'Alex',
    points: 3,
    dueDate: '2025-05-15',
  },
  {
    id: 3,
    title: 'Design user interface mockups',
    status: 'Done',
    assignee: 'Jordan',
    points: 4,
    dueDate: '2025-05-12',
  },
  {
    id: 4,
    title: 'Write literature review',
    status: 'Doing',
    assignee: 'Taylor',
    points: 5,
    dueDate: '2025-05-22',
  },
  {
    id: 5,
    title: 'Implement API endpoints',
    status: 'To Do',
    assignee: 'Alex',
    points: 4,
    dueDate: '2025-05-25',
  },
  {
    id: 6,
    title: 'Create testing plan',
    status: 'To Do',
    assignee: 'Casey',
    points: 3,
    dueDate: '2025-05-18',
  },
];

const TaskTable = () => {
  // Function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'To Do':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'Doing':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'Done':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };
  
  // Format date to more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Tasks</CardTitle>
        <CardDescription>Complete overview of all project tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Points</TableHead>
              <TableHead>Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {taskData.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(task.status)} font-normal`}>
                    {task.status}
                  </Badge>
                </TableCell>
                <TableCell>{task.assignee}</TableCell>
                <TableCell>{task.points}</TableCell>
                <TableCell>{formatDate(task.dueDate)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TaskTable;
