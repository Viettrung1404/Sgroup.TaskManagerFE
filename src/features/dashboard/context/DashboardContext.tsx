import { createContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { workspaceService } from "@/shared/api/services/workspaceService"
import type { Workspace } from "@/shared/types"

interface DashboardContextType {
  title: string
  setTitle: (title: string) => void
  workspaces: Workspace[]
  selectedWorkspace: Workspace | null
  setSelectedWorkspace: (workspace: Workspace | null) => void
  isLoading: boolean
  error: string | null
  refreshWorkspaces: () => Promise<void>
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState("Dashboard")
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWorkspaces = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await workspaceService.getAll()
      
      if (response.success) {
        setWorkspaces(response.responseObject)
        
        // Auto-select first workspace if none selected
        setSelectedWorkspace(prev => {
          if (!prev && response.responseObject.length > 0) {
            return response.responseObject[0]
          }
          return prev
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch workspaces')
      console.error('Failed to fetch workspaces:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const refreshWorkspaces = useCallback(async () => {
    await fetchWorkspaces()
  }, [fetchWorkspaces])

  useEffect(() => {
    fetchWorkspaces()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <DashboardContext.Provider 
      value={{ 
        title, 
        setTitle, 
        workspaces, 
        selectedWorkspace, 
        setSelectedWorkspace,
        isLoading,
        error,
        refreshWorkspaces
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export { DashboardContext }
