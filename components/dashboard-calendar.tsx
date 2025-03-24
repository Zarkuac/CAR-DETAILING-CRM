import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, Plus, X, Trash2 } from "lucide-react"

interface Event {
  id: number
  title: string
  date: Date
  time: string
  type: 'meeting' | 'demo' | 'call'
}

export default function DashboardCalendar() {
  // Add state for current date
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [events, setEvents] = useState<Event[]>([
    { id: 1, title: "Team Meeting", time: "9:00 AM - 10:00 AM", type: "meeting", date: new Date() },
    { id: 2, title: "Product Demo", time: "11:30 AM - 12:30 PM", type: "demo", date: new Date() },
    { id: 3, title: "Client Call", time: "2:00 PM - 3:00 PM", type: "call", date: new Date() },
    { id: 4, title: "Project Review", time: "4:00 PM - 5:00 PM", type: "meeting", date: new Date() },
  ])
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: new Date(),
    time: '',
    type: 'meeting' as const
  })

  // Add these new state variables at the top of your component
  const [selectedDayEvents, setSelectedDayEvents] = useState<Event[]>([])
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string>('')

  // Add this constant for maximum visible events per day
  const MAX_VISIBLE_EVENTS = 1

  // Function to get days in a month
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  // Function to get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  // Navigation functions
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  // Format the current month and year
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const days = []
    const daysInMonth = getDaysInMonth(currentDate)

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return days
  }

  const calendarDays = generateCalendarDays()
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const emptyDays = getFirstDayOfMonth(currentDate)

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      setEvents([
        ...events,
        {
          id: Date.now(),
          ...newEvent
        }
      ])
      setIsModalOpen(false)
      setNewEvent({
        title: '',
        date: new Date(),
        time: '',
        type: 'meeting'
      })
    }
  }

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter(event => event.id !== eventId))
  }

  // Add this new component for the events modal
  const EventsModal = ({ 
    events, 
    date, 
    onClose 
  }: { 
    events: Event[], 
    date: string, 
    onClose: () => void 
  }) => (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Events for {date}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {events.map((event) => (
            <div
              key={event.id}
              className={`p-3 rounded-lg border group relative ${
                event.type === "meeting"
                  ? "border-brand-blue/30 bg-gradient-to-r from-brand-blue/10 to-brand-purple/10"
                  : event.type === "demo"
                    ? "border-purple-300/30 bg-gradient-to-r from-brand-blue/10 to-brand-purple/10"
                    : "border-brand-blue/30 bg-gradient-to-r from-brand-blue/10 to-brand-purple/10"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                </div>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-medium min-w-[140px] text-center">
            {formatMonthYear(currentDate)}
          </h2>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="gradient" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <Card className="md:col-span-5 overflow-hidden">
          <div className="h-1 w-full bg-brand-gradient"></div>
          <CardHeader>
            <CardTitle>Monthly Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {weekdays.map((day) => (
                <div key={day} className="text-center font-medium py-2">
                  {day}
                </div>
              ))}

              {/* Empty cells for days before the 1st of the month */}
              {Array(emptyDays)
                .fill(null)
                .map((_, index) => (
                  <div key={`empty-${index}`} className="h-24 border rounded-md bg-gray-50 dark:bg-gray-800"></div>
                ))}

              {calendarDays.map((day) => {
                const dayEvents = events.filter(event => 
                  event.date.getDate() === day &&
                  event.date.getMonth() === currentDate.getMonth() &&
                  event.date.getFullYear() === currentDate.getFullYear()
                )
                
                return (
                  <div
                    key={day}
                    className={`h-24 border rounded-md p-1 ${
                      dayEvents.length > 0
                        ? "bg-gradient-to-r from-brand-blue/10 to-brand-purple/10 border-brand-purple/30" 
                        : ""
                    }`}
                  >
                    <div className="font-medium text-sm">{day}</div>
                    <div className="mt-1 space-y-1">
                      {dayEvents.slice(0, MAX_VISIBLE_EVENTS).map(event => (
                        <div 
                          key={event.id}
                          className="text-xs bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 text-brand-purple p-1 rounded truncate group relative flex items-center justify-between"
                        >
                          <span className="truncate pr-6">{event.title}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteEvent(event.id)
                            }}
                            className="absolute right-1 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                      {dayEvents.length > MAX_VISIBLE_EVENTS && (
                        <button
                          onClick={() => {
                            setSelectedDayEvents(dayEvents)
                            setSelectedDate(`${formatMonthYear(currentDate)} ${day}`)
                            setIsEventsModalOpen(true)
                          }}
                          className="text-xs text-brand-purple hover:text-brand-blue transition-colors w-full text-center bg-gradient-to-r from-brand-blue/10 to-brand-purple/10 p-1 rounded"
                        >
                          +{dayEvents.length - MAX_VISIBLE_EVENTS} more
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 overflow-hidden">
          <div className="h-1 w-full bg-brand-gradient"></div>
          <CardHeader>
            <CardTitle>Today's Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className={`p-3 rounded-lg border group relative ${
                    event.type === "meeting"
                      ? "border-brand-blue/30 bg-gradient-to-r from-brand-blue/10 to-brand-purple/10"
                      : event.type === "demo"
                        ? "border-brand-purple/30 bg-gradient-to-r from-brand-blue/10 to-brand-purple/10"
                        : "border-brand-blue/30 bg-gradient-to-r from-brand-blue/10 to-brand-purple/10"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{event.time}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Add New Event</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Event Title
                </Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="Enter event title"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-medium">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date.toISOString().split('T')[0]}
                  onChange={(e) => setNewEvent({ ...newEvent, date: new Date(e.target.value) })}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time" className="text-sm font-medium">
                  Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type" className="text-sm font-medium">
                  Event Type
                </Label>
                <select
                  id="type"
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as 'meeting' | 'demo' | 'call' })}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-purple/50"
                >
                  <option value="meeting">Meeting</option>
                  <option value="demo">Demo</option>
                  <option value="call">Call</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-3 mt-8 pt-4 border-t dark:border-gray-700">
                <Button 
                  variant="outline" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2"
                >
                  Cancel
                </Button>
                <Button 
                  variant="gradient" 
                  onClick={handleAddEvent}
                  className="px-4 py-2"
                >
                  Add Event
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add the Events Modal */}
      {isEventsModalOpen && (
        <EventsModal
          events={selectedDayEvents}
          date={selectedDate}
          onClose={() => setIsEventsModalOpen(false)}
        />
      )}
    </div>
  )
}

