"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"

type Language = "en" | "ka"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.customers": "Applicants",
    "nav.calendar": "Calendar",
    "nav.reports": "Reports",
    "nav.config": "Configuration",
    "nav.logout": "Logout",
    
    // Common
    "company.name": "PERFORMANCE",
    
    // Configuration
    "config.language": "Language",
    "config.theme": "Theme",
    "config.saveChanges": "Save Changes",
    "config.languageSelect": "Language / ენა",
    
    // Customers
    "customers.title": "Applicants",
    "customers.search": "Search applicants...",
    "customers.add": "Add Applicant",
    "customers.list": "Applicant List",
    "customers.name": "Name",
    "customers.email": "Email",
    "customers.status": "Status",
    "customers.vacancy": "Vacancy",
    
    // Calendar
    "calendar.title": "Calendar",
    
    // Reports
    "reports.title": "Reports",
    
    // Config
    "config.title": "Configuration"
  },
  ka: {
    // Navigation
    "nav.home": "მთავარი",
    "nav.customers": "მომხმარებლები",
    "nav.calendar": "კალენდარი",
    "nav.reports": "ანგარიშები",
    "nav.config": "კონფიგურაცია",
    "nav.logout": "გასვლა",
    
    // Common
    "company.name": "PERFORMANCE",
    
    // Configuration
    "config.language": "ენა",
    "config.theme": "თემა",
    "config.saveChanges": "ცვლილებების შენახვა",
    "config.languageSelect": "Language / ენა",
    
    // Customers
    "customers.title": "მომხმარებლები",
    "customers.search": "მომხმარებლების ძიება...",
    "customers.add": "მომხმარებლის დამატება",
    "customers.list": "მომხმარებელთა სია",
    "customers.name": "სახელი",
    "customers.email": "ელ-ფოსტა",
    "customers.status": "სტატუსი",
    "customers.vacancy": "ვაკანსია",
    
    // Calendar
    "calendar.title": "კალენდარი",
    
    
    // Reports
    "reports.title": "ანგარიშები",
    
    // Config
    "config.title": "კონფიგურაცია"
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage if available, otherwise default to "en"
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as Language) || 'en'
    }
    return 'en'
  })

  // Save to localStorage whenever language changes
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
} 