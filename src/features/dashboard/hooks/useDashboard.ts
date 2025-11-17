import { useContext } from "react"
import { DashboardContext } from "../context/DashboardContext"

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboard must be used within DashboardProvider")
  }
  return context
}

// Backward compatibility hook
export function useDashboardTitle() {
  const { title, setTitle } = useDashboard()
  return { title, setTitle }
}
