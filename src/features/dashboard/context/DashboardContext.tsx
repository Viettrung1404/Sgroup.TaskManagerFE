import { createContext, useContext, useState, type ReactNode } from "react"

interface DashboardContextType {
  title: string
  setTitle: (title: string) => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState("Dashboard")

  return (
    <DashboardContext.Provider value={{ title, setTitle }}>
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboardTitle() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboardTitle must be used within DashboardProvider")
  }
  return context
}
