
import React, { useState } from 'react';
import DashboardCharts from '@/components/dashboard/dashboard-charts';
import TaskTable from '@/components/dashboard/task-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('visual');
  
  return (
    <div className="container mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full max-w-[400px] mx-auto">
          <TabsTrigger value="visual" className="flex-1">Data Visual</TabsTrigger>
          <TabsTrigger value="table" className="flex-1">Table Task</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visual" className="mt-6">
          <DashboardCharts />
        </TabsContent>
        
        <TabsContent value="table" className="mt-6">
          <TaskTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
