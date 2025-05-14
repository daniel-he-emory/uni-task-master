
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Sample data for charts
const taskCompletionData = [
  { name: 'Week 1', tasks: 2 },
  { name: 'Week 2', tasks: 5 },
  { name: 'Week 3', tasks: 7 },
  { name: 'Week 4', tasks: 10 },
  { name: 'Week 5', tasks: 15 },
];

const personalTaskData = [
  { name: 'Week 1', tasks: 1 },
  { name: 'Week 2', tasks: 3 },
  { name: 'Week 3', tasks: 2 },
  { name: 'Week 4', tasks: 4 },
  { name: 'Week 5', tasks: 5 },
];

const teamContributionData = [
  { name: 'Alex', value: 35 },
  { name: 'Jordan', value: 30 },
  { name: 'Taylor', value: 20 },
  { name: 'Casey', value: 15 },
];

const COLORS = ['#4361EE', '#3F37C9', '#4895EF', '#7209B7'];

const DashboardCharts = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Team Progress */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Project Progress</CardTitle>
          <CardDescription>Overall completion: 62%</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={62} className="h-2" />
        </CardContent>
      </Card>
      
      {/* Task Completion Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Team Task Completion</CardTitle>
          <CardDescription>Tasks completed over time</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={taskCompletionData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="tasks" 
                name="Completed Tasks"
                stroke="#4361EE"
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Personal Task Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Your Task Completion</CardTitle>
          <CardDescription>Your completed tasks over time</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={personalTaskData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="tasks" 
                name="Your Completed Tasks"
                stroke="#4895EF" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Team Contribution Chart */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Team Contribution</CardTitle>
          <CardDescription>Distribution of task points by team member</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={teamContributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {teamContributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;
