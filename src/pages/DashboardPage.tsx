
import React, { useState } from 'react';
import DashboardCharts from '@/components/dashboard/dashboard-charts';
import TaskTable from '@/components/dashboard/task-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('visual');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-[400px]">
          <TabsList>
            <TabsTrigger value="visual">Data Visual</TabsTrigger>
            <TabsTrigger value="table">Table Task</TabsTrigger>
          </TabsList>

          <TabsContent value="visual" className="mt-6">
            <DashboardCharts />
          </TabsContent>
          
          <TabsContent value="table" className="mt-6">
            <TaskTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;
