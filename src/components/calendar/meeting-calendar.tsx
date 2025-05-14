
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

// TimeSlot type
interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  selected: boolean;
}

// Event type
interface Event {
  id: string;
  title: string;
  day: string;
  startTime: string;
  endTime: string;
}

const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeLabels = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', 
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', 
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', 
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM'
];

// Generate time slots
const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  
  dayLabels.forEach(day => {
    for (let i = 0; i < timeLabels.length - 1; i++) {
      slots.push({
        id: `${day}-${i}`,
        day,
        startTime: timeLabels[i],
        endTime: timeLabels[i + 1],
        selected: false
      });
    }
  });
  
  return slots;
};

// Sample common available times (green slots)
const commonAvailableTimes: string[] = [
  'Monday-3', 'Monday-4', 'Monday-5',
  'Wednesday-7', 'Wednesday-8', 'Wednesday-9',
  'Thursday-10', 'Thursday-11'
];

// Sample events
const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Weekly Sync',
    day: 'Monday',
    startTime: '11:00 AM',
    endTime: '12:00 PM'
  },
  {
    id: '2',
    title: 'Design Review',
    day: 'Wednesday',
    startTime: '2:00 PM',
    endTime: '3:00 PM'
  }
];

const MeetingCalendar = () => {
  const [activeTab, setActiveTab] = useState('group-schedule');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(generateTimeSlots());
  const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([]);
  const [events, setEvents] = useState<Event[]>(sampleEvents);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [createEventDialogOpen, setCreateEventDialogOpen] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(true);
  
  // Toggle time slot selection
  const toggleTimeSlot = (slotId: string) => {
    setTimeSlots(timeSlots.map(slot => {
      if (slot.id === slotId) {
        const newSlot = { ...slot, selected: !slot.selected };
        
        // Add or remove from selected slots
        if (newSlot.selected) {
          setSelectedSlots([...selectedSlots, newSlot]);
        } else {
          setSelectedSlots(selectedSlots.filter(s => s.id !== slotId));
        }
        
        return newSlot;
      }
      return slot;
    }));
  };
  
  // Clear all selections
  const clearSelections = () => {
    setTimeSlots(timeSlots.map(slot => ({ ...slot, selected: false })));
    setSelectedSlots([]);
    toast.success('All selections cleared');
  };
  
  // Confirm selection
  const confirmSelection = () => {
    if (selectedSlots.length === 0) {
      toast.error('Please select at least one time slot');
      return;
    }
    
    toast.success('Your availability has been saved');
    setActiveTab('group-schedule');
  };
  
  // Create event
  const createEvent = () => {
    if (!newEventTitle.trim()) {
      toast.error('Please enter an event title');
      return;
    }
    
    // In a real app, we would use the selected common time slot
    // For this demo, we'll add a hardcoded event
    const newEvent: Event = {
      id: Date.now().toString(),
      title: newEventTitle,
      day: 'Thursday',
      startTime: '3:00 PM',
      endTime: '4:00 PM'
    };
    
    setEvents([...events, newEvent]);
    setCreateEventDialogOpen(false);
    setNewEventTitle('');
    toast.success('Event created successfully');
  };
  
  // Check if time slot is a common available time
  const isCommonAvailableTime = (slotId: string) => {
    const parts = slotId.split('-');
    const day = parts[0];
    const timeIndex = parseInt(parts[1]);
    
    return commonAvailableTimes.includes(`${day}-${timeIndex}`);
  };
  
  // Check if slot has an event
  const getEventForSlot = (day: string, timeIndex: number): Event | null => {
    const startTime = timeLabels[timeIndex];
    
    return events.find(event => 
      event.day === day && 
      (event.startTime === startTime || 
       (timeLabels.indexOf(event.startTime) <= timeIndex && 
        timeLabels.indexOf(event.endTime) > timeIndex))
    ) || null;
  };
  
  // Start event at selected common available time
  const startEventAtTime = (day: string, timeIndex: number) => {
    setCreateEventDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Meeting Schedule</h1>
        
        {activeTab === 'group-schedule' && (
          <Button onClick={() => setActiveTab('availability')} className="bg-unitask-primary hover:bg-unitask-secondary">
            Start A Group Availability Poll
          </Button>
        )}
      </div>
      
      {/* Instructions Dialog */}
      <Dialog open={instructionsOpen} onOpenChange={setInstructionsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>How to Manage My Group Schedule</DialogTitle>
            <DialogDescription>
              Welcome to the Meeting Scheduler! This tool helps your team find the best time to meet.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Step 1: Select Your Available Times</h3>
              <p className="text-sm text-muted-foreground">
                Click on the "Start A Group Availability Poll" button to select time slots when you're available.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Step 2: Submit Your Availability</h3>
              <p className="text-sm text-muted-foreground">
                After selecting times, click "Confirm Selection" to submit your availability.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Step 3: View Common Available Times</h3>
              <p className="text-sm text-muted-foreground">
                Green slots on the Group Schedule show when everyone is available. Click on these to schedule meetings.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Step 4: Create Events</h3>
              <p className="text-sm text-muted-foreground">
                Click on "CREATE EVENT" to schedule a new meeting during a common available time.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setInstructionsOpen(false)}>I Understand</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
          <TabsTrigger value="group-schedule">Group Events Schedule</TabsTrigger>
          <TabsTrigger value="availability">Select Your Available Times</TabsTrigger>
        </TabsList>
        
        {/* Group Events Schedule Tab */}
        <TabsContent value="group-schedule">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Team Calendar</CardTitle>
                  <CardDescription>Week of May 14, 2025 - May 20, 2025</CardDescription>
                </div>
                <Button onClick={() => setCreateEventDialogOpen(true)}>CREATE EVENT</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>Common Available Times</AlertTitle>
                <AlertDescription>
                  Green blocks indicate times when all team members are available. Click on a green block to schedule a meeting.
                </AlertDescription>
              </Alert>
              
              <div className="mt-6 overflow-x-auto">
                <div className="min-w-[800px]">
                  {/* Calendar header */}
                  <div className="grid grid-cols-8 gap-1">
                    <div className="h-10"></div>
                    {dayLabels.map((day) => (
                      <div key={day} className="h-10 font-medium text-center">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar body */}
                  {timeLabels.map((time, timeIndex) => (
                    <div key={time} className="grid grid-cols-8 gap-1">
                      <div className="h-12 text-xs flex items-center justify-end pr-2">
                        {time}
                      </div>
                      
                      {dayLabels.map((day) => {
                        const event = getEventForSlot(day, timeIndex);
                        const isCommonTime = isCommonAvailableTime(`${day}-${timeIndex}`);
                        
                        return (
                          <div 
                            key={`${day}-${time}`} 
                            className={`h-12 border rounded ${
                              event ? 'bg-purple-200 cursor-pointer' : 
                              isCommonTime ? 'bg-green-100 hover:bg-green-200 cursor-pointer' : 
                              'bg-gray-50'
                            }`}
                            onClick={() => {
                              if (isCommonTime && !event) {
                                startEventAtTime(day, timeIndex);
                              }
                            }}
                          >
                            {event && timeLabels[timeIndex] === event.startTime && (
                              <div className="p-1 h-full flex flex-col">
                                <span className="text-xs font-medium">{event.title}</span>
                                <span className="text-xs">{`${event.startTime} - ${event.endTime}`}</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab('availability')}>
                Back to Availability Selection
              </Button>
              <Button variant="destructive">End Poll</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Select Your Available Times Tab */}
        <TabsContent value="availability">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Select Your Available Times</CardTitle>
                  <CardDescription>Week of May 14, 2025 - May 20, 2025</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Previous Week</Button>
                  <Button variant="outline">Next Week</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>How to use</AlertTitle>
                <AlertDescription>
                  Click on time slots when you're available. Selected slots will be highlighted in blue.
                  Once done, click "Confirm Selection" to submit your availability.
                </AlertDescription>
              </Alert>
              
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  {/* Calendar header */}
                  <div className="grid grid-cols-8 gap-1">
                    <div className="h-10"></div>
                    {dayLabels.map((day) => (
                      <div key={day} className="h-10 font-medium text-center">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar body */}
                  {timeLabels.map((time, timeIndex) => (
                    <div key={time} className="grid grid-cols-8 gap-1">
                      <div className="h-12 text-xs flex items-center justify-end pr-2">
                        {time}
                      </div>
                      
                      {dayLabels.map((day) => {
                        const slotId = `${day}-${timeIndex}`;
                        const slot = timeSlots.find(s => s.id === slotId);
                        
                        return (
                          <div 
                            key={`${day}-${time}`} 
                            className={`h-12 border rounded ${
                              slot?.selected ? 'bg-unitask-primary bg-opacity-20 hover:bg-opacity-30' : 
                              'bg-gray-50 hover:bg-gray-100'
                            } cursor-pointer`}
                            onClick={() => toggleTimeSlot(slotId)}
                          ></div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div>
                <h3 className="font-medium mb-2">Selected Times:</h3>
                <div className="flex flex-wrap gap-1">
                  {selectedSlots.length > 0 ? (
                    selectedSlots.map((slot) => (
                      <Badge key={slot.id} variant="outline">
                        {`${slot.day}, ${slot.startTime}-${slot.endTime}`}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No times selected yet</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={clearSelections}>
                  Clear All My Selections
                </Button>
                <Button onClick={confirmSelection}>
                  Confirm Selection
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          <div className="mt-4 flex justify-end">
            <Button variant="outline" onClick={() => setActiveTab('group-schedule')}>
              Back To Group Schedule
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Create Event Dialog */}
      <Dialog open={createEventDialogOpen} onOpenChange={setCreateEventDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>
              Schedule a meeting during a common available time.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Input 
                placeholder="Event Title"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
              />
            </div>
            
            <div>
              <p className="text-sm font-medium mb-1">Selected Time:</p>
              <p className="text-sm text-muted-foreground">Thursday, 3:00 PM - 4:00 PM</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateEventDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={createEvent}>
              Create Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MeetingCalendar;
