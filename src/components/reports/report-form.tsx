import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Report interface
interface Report {
  id: string;
  title: string;
  accomplishment: string;
  feedback: string;
  comments: string;
  date: string;
}

const ReportForm = () => {
  const [activeTab, setActiveTab] = useState('add');
  const [newReport, setNewReport] = useState<Omit<Report, 'id' | 'date'>>({
    title: '',
    accomplishment: '',
    feedback: '',
    comments: '',
  });
  
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      title: 'First Week Progress',
      accomplishment: 'Completed project planning and task distribution.',
      feedback: 'Instructor suggested adding more research components.',
      comments: 'Need to focus on literature review next week.',
      date: '2025-05-07',
    },
    {
      id: '2',
      title: 'UI Design Completed',
      accomplishment: 'Finished wireframes and mockups for all pages.',
      feedback: 'Client loved the design but requested minor color adjustments.',
      comments: 'Will refine colors and start implementation next week.',
      date: '2025-05-12',
    }
  ]);
  
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingReport, setEditingReport] = useState<Report | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Handle form submission for new report
  const handleSubmitReport = () => {
    if (!newReport.title || !newReport.accomplishment) {
      toast.error('Title and accomplishment are required fields');
      return;
    }
    
    const report: Report = {
      ...newReport,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
    };
    
    setReports([...reports, report]);
    toast.success('Report added successfully');
    
    // Reset form
    setNewReport({
      title: '',
      accomplishment: '',
      feedback: '',
      comments: '',
    });
    
    // Switch to view tab to show the new report
    setActiveTab('view');
    setSelectedReport(report);
  };
  
  // Handle edit submit
  const handleEditSubmit = () => {
    if (!editingReport) return;
    
    setReports(reports.map(report => 
      report.id === editingReport.id ? editingReport : report
    ));
    
    setEditDialogOpen(false);
    setSelectedReport(editingReport);
    toast.success('Report updated successfully');
  };
  
  // Handle delete
  const handleDeleteReport = () => {
    if (!selectedReport) return;
    
    setReports(reports.filter(report => report.id !== selectedReport.id));
    setSelectedReport(null);
    setDeleteDialogOpen(false);
    toast.success('Report deleted successfully');
  };
  
  // Format date to more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reports & Reviews</h1>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full max-w-sm mx-auto">
              <TabsTrigger value="add">Add New Record</TabsTrigger>
              <TabsTrigger value="view">View Record</TabsTrigger>
            </TabsList>
            
            <TabsContent value="add">
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Record Title</Label>
                  <Input 
                    id="title" 
                    value={newReport.title}
                    onChange={(e) => setNewReport({...newReport, title: e.target.value})}
                    placeholder="e.g., Week 3 Progress Review"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="accomplishment">Accomplishment This Week</Label>
                  <Textarea 
                    id="accomplishment" 
                    value={newReport.accomplishment}
                    onChange={(e) => setNewReport({...newReport, accomplishment: e.target.value})}
                    placeholder="Describe what the team accomplished this week"
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="feedback">Feedback from Others</Label>
                  <Textarea 
                    id="feedback" 
                    value={newReport.feedback}
                    onChange={(e) => setNewReport({...newReport, feedback: e.target.value})}
                    placeholder="Feedback from professor, client, or other stakeholders"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="comments">Any Comment & Memo from Team</Label>
                  <Textarea 
                    id="comments" 
                    value={newReport.comments}
                    onChange={(e) => setNewReport({...newReport, comments: e.target.value})}
                    placeholder="Additional comments or notes from the team"
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSubmitReport} className="w-full">
                  Submit Record
                </Button>
              </CardFooter>
            </TabsContent>
            
            <TabsContent value="view">
              <CardContent className="pt-4">
                <div className="grid md:grid-cols-5 gap-4">
                  <div className="md:col-span-2 border rounded-md overflow-hidden">
                    <ScrollArea className="h-96 p-4">
                      <div className="space-y-2">
                        <h3 className="font-medium text-sm">Select a record to view</h3>
                        {reports.map((report) => (
                          <div 
                            key={report.id}
                            onClick={() => setSelectedReport(report)}
                            className={`p-3 border rounded-md cursor-pointer ${
                              selectedReport?.id === report.id 
                                ? 'bg-unitask-primary bg-opacity-10 border-unitask-primary' 
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            <h4 className="font-medium">{report.title}</h4>
                            <p className="text-xs text-muted-foreground">{formatDate(report.date)}</p>
                          </div>
                        ))}
                        
                        {reports.length === 0 && (
                          <div className="text-center p-4 text-muted-foreground">
                            No records yet. Add your first record in the "Add New Record" tab.
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                  
                  <div className="md:col-span-3">
                    {selectedReport ? (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold">{selectedReport.title}</h2>
                          <p className="text-sm text-muted-foreground">{formatDate(selectedReport.date)}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium">Accomplishment</h3>
                          <p className="text-sm">{selectedReport.accomplishment}</p>
                        </div>
                        
                        {selectedReport.feedback && (
                          <div className="space-y-2">
                            <h3 className="text-lg font-medium">Feedback</h3>
                            <p className="text-sm">{selectedReport.feedback}</p>
                          </div>
                        )}
                        
                        {selectedReport.comments && (
                          <div className="space-y-2">
                            <h3 className="text-lg font-medium">Comments</h3>
                            <p className="text-sm">{selectedReport.comments}</p>
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              setEditingReport(selectedReport);
                              setEditDialogOpen(true);
                            }}
                          >
                            Modify Record
                          </Button>
                          <Button 
                            variant="destructive" 
                            onClick={() => setDeleteDialogOpen(true)}
                          >
                            Delete Record
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">
                          Select a record from the list to view its details
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
      
      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Record</DialogTitle>
            <DialogDescription>
              Make changes to this record
            </DialogDescription>
          </DialogHeader>
          
          {editingReport && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Record Title</Label>
                <Input 
                  id="edit-title" 
                  value={editingReport.title}
                  onChange={(e) => setEditingReport({...editingReport, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-accomplishment">Accomplishment This Week</Label>
                <Textarea 
                  id="edit-accomplishment" 
                  value={editingReport.accomplishment}
                  onChange={(e) => setEditingReport({...editingReport, accomplishment: e.target.value})}
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-feedback">Feedback from Others</Label>
                <Textarea 
                  id="edit-feedback" 
                  value={editingReport.feedback}
                  onChange={(e) => setEditingReport({...editingReport, feedback: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-comments">Any Comment & Memo from Team</Label>
                <Textarea 
                  id="edit-comments" 
                  value={editingReport.comments}
                  onChange={(e) => setEditingReport({...editingReport, comments: e.target.value})}
                  rows={3}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSubmit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this record? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteReport}>
              Delete Record
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportForm;
