import { Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function DashboardCustomers() {
  const customers = [
    { id: 1, name: "Alex Johnson", email: "alex@example.com", status: "Active", spent: "$1,234.56" },
    { id: 2, name: "Sarah Williams", email: "sarah@example.com", status: "Active", spent: "$2,345.67" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", status: "Inactive", spent: "$345.67" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", status: "Active", spent: "$3,456.78" },
    { id: 5, name: "David Miller", email: "david@example.com", status: "Active", spent: "$567.89" },
    { id: 6, name: "Jessica Wilson", email: "jessica@example.com", status: "Inactive", spent: "$678.90" },
    { id: 7, name: "James Taylor", email: "james@example.com", status: "Active", spent: "$4,567.89" },
    { id: 8, name: "Olivia Martinez", email: "olivia@example.com", status: "Active", spent: "$789.01" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search customers..." className="pl-8 w-full sm:w-[300px]" />
          </div>
          <Button variant="gradient">Add Customer</Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="h-1 w-full bg-brand-gradient"></div>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total Spent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        customer.status === "Active"
                          ? "bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 text-brand-purple"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{customer.spent}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="overflow-hidden">
          <div className="h-1 w-full bg-brand-gradient"></div>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
              <p className="text-muted-foreground">Customer Segments Chart</p>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <div className="h-1 w-full bg-brand-gradient"></div>
          <CardHeader>
            <CardTitle>Customer Retention</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
              <p className="text-muted-foreground">Retention Chart</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

