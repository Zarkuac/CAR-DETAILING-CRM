
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function DashboardReports() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
        <Button variant="gradient">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <Tabs defaultValue="sales">
        <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-brand-blue/10 to-brand-purple/10 p-1">
          <TabsTrigger value="sales" className="data-[state=active]:bg-brand-gradient data-[state=active]:text-white">
            Vacancies
          </TabsTrigger>
          <TabsTrigger
            value="customers"
            className="data-[state=active]:bg-brand-gradient data-[state=active]:text-white"
          >
            Applicants
          </TabsTrigger>
          <TabsTrigger
            value="inventory"
            className="data-[state=active]:bg-brand-gradient data-[state=active]:text-white"
          >
            Meetings
          </TabsTrigger>
          <TabsTrigger
            value="marketing"
            className="data-[state=active]:bg-brand-gradient data-[state=active]:text-white"
          >
            Interviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <div className="h-1 w-full bg-brand-gradient"></div>
              <CardHeader className="pb-2">
                <CardTitle>Total Sales</CardTitle>
                <CardDescription>Year to date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$245,675.00</div>
                <p className="text-xs text-muted-foreground">+12.5% from last year</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <div className="h-1 w-full bg-brand-gradient"></div>
              <CardHeader className="pb-2">
                <CardTitle>Average Order Value</CardTitle>
                <CardDescription>Year to date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$345.50</div>
                <p className="text-xs text-muted-foreground">+2.3% from last year</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <div className="h-1 w-full bg-brand-gradient"></div>
              <CardHeader className="pb-2">
                <CardTitle>Conversion Rate</CardTitle>
                <CardDescription>Year to date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3.2%</div>
                <p className="text-xs text-muted-foreground">+0.5% from last year</p>
              </CardContent>
            </Card>
          </div>

          <Card className="overflow-hidden">
            <div className="h-1 w-full bg-brand-gradient"></div>
            <CardHeader>
              <CardTitle>Sales Trends</CardTitle>
              <CardDescription>Monthly sales for the current year</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                <p className="text-muted-foreground">Sales Trend Chart</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <div className="h-1 w-full bg-brand-gradient"></div>
              <CardHeader className="pb-2">
                <CardTitle>Total Customers</CardTitle>
                <CardDescription>Active accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12,345</div>
                <p className="text-xs text-muted-foreground">+18.2% from last year</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <div className="h-1 w-full bg-brand-gradient"></div>
              <CardHeader className="pb-2">
                <CardTitle>Customer Retention</CardTitle>
                <CardDescription>Year to date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">78.5%</div>
                <p className="text-xs text-muted-foreground">+2.1% from last year</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <div className="h-1 w-full bg-brand-gradient"></div>
              <CardHeader className="pb-2">
                <CardTitle>Customer Lifetime Value</CardTitle>
                <CardDescription>Average per customer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$1,245.00</div>
                <p className="text-xs text-muted-foreground">+5.3% from last year</p>
              </CardContent>
            </Card>
          </div>

          <Card className="overflow-hidden">
            <div className="h-1 w-full bg-brand-gradient"></div>
            <CardHeader>
              <CardTitle>Customer Demographics</CardTitle>
              <CardDescription>Breakdown by age, location, and spending</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                <p className="text-muted-foreground">Customer Demographics Chart</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <div className="h-1 w-full bg-brand-gradient"></div>
              <CardHeader className="pb-2">
                <CardTitle>Total Products</CardTitle>
                <CardDescription>Active inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2,345</div>
                <p className="text-xs text-muted-foreground">+5.7% from last year</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <div className="h-1 w-full bg-brand-gradient"></div>
              <CardHeader className="pb-2">
                <CardTitle>Stock Turnover</CardTitle>
                <CardDescription>Year to date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4.2x</div>
                <p className="text-xs text-muted-foreground">+0.3x from last year</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <div className="h-1 w-full bg-brand-gradient"></div>
              <CardHeader className="pb-2">
                <CardTitle>Out of Stock Items</CardTitle>
                <CardDescription>Current count</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">-12 from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card className="overflow-hidden">
            <div className="h-1 w-full bg-brand-gradient"></div>
            <CardHeader>
              <CardTitle>Inventory Analysis</CardTitle>
              <CardDescription>Stock levels and product performance</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                <p className="text-muted-foreground">Inventory Analysis Chart</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketing" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <div className="h-1 w-full bg-brand-gradient"></div>
              <CardHeader className="pb-2">
                <CardTitle>Marketing ROI</CardTitle>
                <CardDescription>Year to date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">324%</div>
                <p className="text-xs text-muted-foreground">+45% from last year</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <div className="h-1 w-full bg-brand-gradient"></div>
              <CardHeader className="pb-2">
                <CardTitle>Campaign Reach</CardTitle>
                <CardDescription>Year to date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1.2M</div>
                <p className="text-xs text-muted-foreground">+32% from last year</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <div className="h-1 w-full bg-brand-gradient"></div>
              <CardHeader className="pb-2">
                <CardTitle>Engagement Rate</CardTitle>
                <CardDescription>Year to date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4.8%</div>
                <p className="text-xs text-muted-foreground">+0.7% from last year</p>
              </CardContent>
            </Card>
          </div>

          <Card className="overflow-hidden">
            <div className="h-1 w-full bg-brand-gradient"></div>
            <CardHeader>
              <CardTitle>Marketing Performance</CardTitle>
              <CardDescription>Campaign effectiveness and channel analysis</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                <p className="text-muted-foreground">Marketing Performance Chart</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

