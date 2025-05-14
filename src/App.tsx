
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import WorkspacePage from "./pages/WorkspacePage";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/main-layout";
import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import SchedulePage from "./pages/SchedulePage";
import ReportsPage from "./pages/ReportsPage";
import AccountPage from "./pages/AccountPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/workspace" element={<WorkspacePage />} />
          
          {/* Protected routes inside the main layout */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
