"use client"

import { useState } from "react"
import { BarChart3, Calendar, ChevronLeft, Home, Menu, Settings, Users, X, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import DashboardHome from "./dashboard-home"
import DashboardCustomers from "./dashboard-customers"
import DashboardCalendar from "./dashboard-calendar"
import DashboardReports from "./dashboard-reports"
import DashboardConfig from "./dashboard-config"
import { useLanguage } from "@/lib/language-context"

export default function Dashboard() {
  const { t } = useLanguage()
  const [activeModule, setActiveModule] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [user] = useState({
    firstName: "Tsotne",
    lastName: "Zarkua"
  })

  const modules = [
    {
      id: "home",
      name: t("nav.home"),
      icon: Home,
      component: DashboardHome,
    },
    {
      id: "customers",
      name: t("nav.customers"),
      icon: Users,
      component: DashboardCustomers,
    },
    {
      id: "calendar",
      name: t("nav.calendar"),
      icon: Calendar,
      component: DashboardCalendar,
    },
    {
      id: "reports",
      name: t("nav.reports"),
      icon: BarChart3,
      component: DashboardReports,
    },
    {
      id: "config",
      name: t("nav.config"),
      icon: Settings,
      component: DashboardConfig,
    },
  ]

  const ActiveComponent = modules.find((m) => m.id === activeModule)?.component || DashboardHome

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar - Desktop */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-700">
          <h1 className="text-xl font-bold bg-gradient-to-r ml-[31px]
          from-brand-blue to-brand-purple bg-clip-text text-transparent">
            {t("company.name")}
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700 lg:hidden"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4 space-y-1 flex-1">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => {
                setActiveModule(module.id)
                setMobileMenuOpen(false)
              }}
              className={cn(
                "flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors",
                activeModule === module.id
                  ? "bg-brand-gradient text-white"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
              )}
            >
              <module.icon className="h-5 w-5 mr-3" />
              <span className="font-medium">{module.name}</span>
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t dark:border-gray-700">
          <button
            onClick={() => {
              console.log("Logout clicked")
            }}
            className="flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span className="font-medium">{t("nav.logout")}</span>
          </button>
        </div>
      </aside>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-700">
          <h1 className="text-xl font-bold bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
            {t("company.name")}
          </h1>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => {
                setActiveModule(module.id)
                setMobileMenuOpen(false)
              }}
              className={cn(
                "flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors",
                activeModule === module.id
                  ? "bg-brand-gradient text-white"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
              )}
            >
              <module.icon className="h-5 w-5 mr-3" />
              <span className="font-medium">{module.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top header */}
        <header className="flex items-center justify-between h-16 px-4 border-b bg-white dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 mr-4 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700 hidden lg:block"
            >
              <Menu className="h-6 w-6" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1 mr-4 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {modules.find((m) => m.id === activeModule)?.name || "Home"}
            </h2>
          </div>
          <div className="flex items-center">
  <div className="relative mr-10 flex items-center gap-3">
    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
      {user.firstName} {user.lastName}
    </span>
    <button
      onClick={() => setActiveModule("config")}
      className="hover:opacity-80 transition-opacity"
    >
      <img 
        className="h-8 w-8 rounded-full cursor-pointer" 
        src="/avatar.svg" 
        alt="User avatar" 
      />
    </button>
  </div>
</div> 
        </header>

        {/* Module content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
          <ActiveComponent />
        </main>
      </div>
    </div>
  )
}

