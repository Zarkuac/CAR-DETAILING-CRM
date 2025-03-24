import { useState } from "react"
import { Search, X, Pencil, Trash2, Info, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/lib/language-context"

interface Customer {
  id: number
  name: string
  email: string
  status: string
  vacancy: string
  mobile?: string
  firstName?: string
  lastName?: string
}



export default function DashboardCustomers() {
  const { t } = useLanguage()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [newCustomer, setNewCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    vacancy: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, name: "Alex Johnson", email: "alex@example.com", status: "Active", vacancy: "Front-End Developer" },
    { id: 2, name: "Sarah Williams", email: "sarah@example.com", status: "Active", vacancy: "Back-End Developer" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", status: "Inactive", vacancy: "Full-Stack Developer" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", status: "Active", vacancy: "Front-End Developer" },
    { id: 5, name: "David Miller", email: "david@example.com", status: "Active", vacancy: "Back-End Developer" },
    { id: 6, name: "Jessica Wilson", email: "jessica@example.com", status: "Inactive", vacancy: "Full-Stack Developer" },
    { id: 7, name: "James Taylor", email: "james@example.com", status: "Active", vacancy: "Front-End Developer" },
    
  ])

  // Calculate pagination
  const indexOfLastCustomer = currentPage * itemsPerPage
  const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer)
  const totalPages = Math.ceil(customers.length / itemsPerPage)

  const handleAddCustomer = () => {
    if (newCustomer.firstName && newCustomer.lastName && newCustomer.email) {
      const customer: Customer = {
        id: Date.now(),
        name: `${newCustomer.firstName} ${newCustomer.lastName}`,
        email: newCustomer.email,
        mobile: newCustomer.mobile,
        status: "Active",
        vacancy: newCustomer.vacancy
      }

      setCustomers([...customers, customer])
      setIsModalOpen(false)
      setNewCustomer({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        vacancy: ''
      })
    }
  }

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsEditModalOpen(true)
  }

  const handleDeleteCustomer = (customerId: number) => {
    setCustomers(customers.filter(c => c.id !== customerId))
  }

  const handleViewInfo = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsInfoModalOpen(true)
  }

  const handleSaveEdit = () => {
    if (selectedCustomer) {
      setCustomers(customers.map(c => 
        c.id === selectedCustomer.id ? selectedCustomer : c
      ))
      setIsEditModalOpen(false)
      setSelectedCustomer(null)
    }
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">{t("customers.title")}</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder={t("customers.search")} className="pl-8 w-full sm:w-[300px]" />
          </div>
          <Button variant="gradient" onClick={() => setIsModalOpen(true)}>
            {t("customers.add")}
          </Button>
        </div>
      </div>

      {/* Add Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Add New Applicant</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={newCustomer.firstName}
                    onChange={(e) => setNewCustomer({ ...newCustomer, firstName: e.target.value })}
                    placeholder="John"
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={newCustomer.lastName}
                    onChange={(e) => setNewCustomer({ ...newCustomer, lastName: e.target.value })}
                    placeholder="Doe"
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-sm font-medium">
                  Mobile Number
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  value={newCustomer.mobile}
                  onChange={(e) => setNewCustomer({ ...newCustomer, mobile: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vacancy" className="text-sm font-medium">
                  Vacancy
                </Label>
                <Input
                  id="vacancy"
                  type="job-description"
                  value={newCustomer.vacancy}
                  onChange={(e) => setNewCustomer({ ...newCustomer, vacancy: e.target.value })}
                  placeholder="Job Description"
                  className="w-full"
                />
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
                  onClick={handleAddCustomer}
                  className="px-4 py-2"
                >
                  Add Applicant
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Card className="overflow-hidden">
        <div className="h-1 w-full bg-brand-gradient"></div>
        <CardHeader>
          <CardTitle>{t("customers.list")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>{t("customers.name")}</TableHead>
                <TableHead>{t("customers.email")}</TableHead>
                <TableHead>{t("customers.status")}</TableHead>
                <TableHead className="text-right">{t("customers.vacancy")}</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium text-gray-500">#{customer.id}</TableCell>
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
                  <TableCell className="text-right">{customer.vacancy}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewInfo(customer)}
                        className="p-1 hover:text-brand-purple transition-colors"
                      >
                        <Info className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditCustomer(customer)}
                        className="p-1 hover:text-brand-blue transition-colors"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCustomer(customer.id)}
                        className="p-1 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between border-t pt-4 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {indexOfFirstCustomer + 1} to {Math.min(indexOfLastCustomer, customers.length)} of {customers.length} entries
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "gradient" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className="h-8 w-8 p-0"
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Customer Info Modal */}
      {isInfoModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Applicant Information</h3>
              <button
                onClick={() => setIsInfoModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Name</label>
                <p className="font-medium">{selectedCustomer.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Email</label>
                <p className="font-medium">{selectedCustomer.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Mobile</label>
                <p className="font-medium">{selectedCustomer.mobile || "Not provided"}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Status</label>
                <p className="font-medium">{selectedCustomer.status}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Vacancy</label>
                <p className="font-medium">{selectedCustomer.vacancy}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {isEditModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Edit Customer</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editFirstName">First Name</Label>
                  <Input
                    id="editFirstName"
                    value={selectedCustomer.firstName || selectedCustomer.name.split(' ')[0]}
                    onChange={(e) => setSelectedCustomer({
                      ...selectedCustomer,
                      firstName: e.target.value,
                      name: `${e.target.value} ${selectedCustomer.lastName || selectedCustomer.name.split(' ')[1]}`
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editLastName">Last Name</Label>
                  <Input
                    id="editLastName"
                    value={selectedCustomer.lastName || selectedCustomer.name.split(' ')[1]}
                    onChange={(e) => setSelectedCustomer({
                      ...selectedCustomer,
                      lastName: e.target.value,
                      name: `${selectedCustomer.firstName || selectedCustomer.name.split(' ')[0]} ${e.target.value}`
                    })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="editEmail">Email</Label>
                <Input
                  id="editEmail"
                  type="email"
                  value={selectedCustomer.email}
                  onChange={(e) => setSelectedCustomer({ ...selectedCustomer, email: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="editMobile">Mobile Number</Label>
                <Input
                  id="editMobile"
                  type="tel"
                  value={selectedCustomer.mobile || ''}
                  onChange={(e) => setSelectedCustomer({ ...selectedCustomer, mobile: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editVacancy">Vacancy</Label>
                <Input
                  id="editVacancy"
                  type="job-description"
                  value={selectedCustomer.vacancy}
                  onChange={(e) => setSelectedCustomer({ ...selectedCustomer, vacancy: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t dark:border-gray-700">
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="gradient" onClick={handleSaveEdit}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="overflow-hidden">
          <div className="h-1 w-full bg-brand-gradient"></div>
          <CardHeader>
            <CardTitle>Applicant Segments</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
              <p className="text-muted-foreground">Applicant Segments Chart</p>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <div className="h-1 w-full bg-brand-gradient"></div>
          <CardHeader>
            <CardTitle>Applicant Retention</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
              <p className="text-muted-foreground">Applicant Retention Chart</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

