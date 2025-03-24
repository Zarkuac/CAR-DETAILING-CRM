import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

export default function DashboardCalendar() {
  // Mock data for calendar events
  const events = [
    { id: 1, title: "Team Meeting", time: "9:00 AM - 10:00 AM", type: "meeting" },
    { id: 2, title: "Product Demo", time: "11:30 AM - 12:30 PM", type: "demo" },
    { id: 3, title: "Client Call", time: "2:00 PM - 3:00 PM", type: "call" },
    { id: 4, title: "Project Review", time: "4:00 PM - 5:00 PM", type: "meeting" },
  ]

  // Generate calendar days
  const generateCalendarDays = () => {
    const days = []
    const daysInMonth = 31 // Simplified for demo

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return days
  }

  const calendarDays = generateCalendarDays()
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-medium">March 2025</h2>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="gradient">
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
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <div key={`empty-${index}`} className="h-24 border rounded-md bg-gray-50 dark:bg-gray-800"></div>
                ))}

              {calendarDays.map((day) => (
                <div
                  key={day}
                  className={`h-24 border rounded-md p-1 ${
                    day === 15 ? "bg-gradient-to-r from-brand-blue/10 to-brand-purple/10 border-brand-purple/30" : ""
                  }`}
                >
                  <div className="font-medium text-sm">{day}</div>
                  {day === 15 && (
                    <div className="mt-1">
                      <div className="text-xs bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 text-brand-purple p-1 rounded truncate">
                        Team Meeting
                      </div>
                      <div className="text-xs bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 text-brand-blue p-1 rounded mt-1 truncate">
                        Client Call
                      </div>
                    </div>
                  )}
                  {day === 20 && (
                    <div className="mt-1">
                      <div className="text-xs bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 text-brand-purple p-1 rounded truncate">
                        Product Demo
                      </div>
                    </div>
                  )}
                  {day === 25 && (
                    <div className="mt-1">
                      <div className="text-xs bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 text-brand-blue p-1 rounded truncate">
                        Project Review
                      </div>
                    </div>
                  )}
                </div>
              ))}
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
                  className={`p-3 rounded-lg border ${
                    event.type === "meeting"
                      ? "border-brand-blue/30 bg-gradient-to-r from-brand-blue/10 to-brand-purple/10"
                      : event.type === "demo"
                        ? "border-brand-purple/30 bg-gradient-to-r from-brand-blue/10 to-brand-purple/10"
                        : "border-brand-blue/30 bg-gradient-to-r from-brand-blue/10 to-brand-purple/10"
                  }`}
                >
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

