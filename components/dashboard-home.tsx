import { ArrowDownIcon, ArrowUpIcon, BarChart3, DollarSign, ShoppingCart, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
        <Button variant="gradient">
          <ShoppingCart className="h-4 w-4 mr-2" />
          New Order
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden">
          <div className="h-1 w-full bg-brand-gradient"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span className="flex items-center text-green-600">
                <ArrowUpIcon className="h-4 w-4 mr-1" />
                12.5%
              </span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <div className="h-1 w-full bg-brand-gradient"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Applicants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span className="flex items-center text-green-600">
                <ArrowUpIcon className="h-4 w-4 mr-1" />
                18.2%
              </span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <div className="h-1 w-full bg-brand-gradient"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span className="flex items-center text-green-600">
                <ArrowUpIcon className="h-4 w-4 mr-1" />
                4.6%
              </span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <div className="h-1 w-full bg-brand-gradient"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span className="flex items-center text-red-600">
                <ArrowDownIcon className="h-4 w-4 mr-1" />
                2.1%
              </span>
              <span>from last hour</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity */}
      <Card className="overflow-hidden">
        <div className="h-1 w-full bg-brand-gradient"></div>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest transactions and events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full mr-4",
                    i % 2 === 0
                      ? "bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 text-brand-purple"
                      : "bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 text-brand-blue",
                  )}
                >
                  {i % 2 === 0 ? <Users className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{i % 2 === 0 ? "New customer registered" : "New order placed"}</p>
                  <p className="text-sm text-muted-foreground">{i % 2 === 0 ? "Customer #1234" : "Order #5678"}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {i} hour{i !== 1 ? "s" : ""} ago
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

