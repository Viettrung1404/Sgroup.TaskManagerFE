import { useEffect } from "react"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Plus, ChartNoAxesColumn, Users } from "lucide-react"
import { useDashboardTitle } from "@/features/dashboard"

// Sample data
const workspaces = [
  {
    id: "1",
    name: "Company Workspace",
    description: "Main company workspace",
    boardCount: 2,
    icon: "🏢",
    boards: [
      {
        id: "1",
        name: "Project Alpha",
        description: "Main project board",
        lists: 3,
        members: 2,
        icon: "📊",
      },
      {
        id: "2",
        name: "Marketing Campaign",
        description: "Q4 Marketing initiatives",
        lists: 1,
        members: 2,
        icon: "📊",
      },
    ],
  },
  {
    id: "2",
    name: "Personal Projects",
    description: "Personal project workspace",
    boardCount: 1,
    icon: "🏢",
    boards: [
      {
        id: "3",
        name: "Personal Todo",
        description: "Personal tasks and goals",
        lists: 1,
        members: 1,
        icon: "📊",
      },
    ],
  },
]

export default function DashboardPage() {
  const { setTitle } = useDashboardTitle()

  useEffect(() => {
    setTitle("Dashboard")
  }, [setTitle])

  return (
    <>
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground mt-1">
            Manage your workspaces and boards
          </p>
        </div>
        <Button size="lg">
          <Plus className="mr-2 h-4 w-4" />
          New Workspace
        </Button>
      </div>

      {/* Workspaces List */}
      <div className="space-y-8">
        {workspaces.map((workspace) => (
          <div key={workspace.id} className="space-y-4">
            {/* Workspace Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground text-xl">
                  {workspace.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    {workspace.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {workspace.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {workspace.boardCount} boards
                  </p>
                </div>
              </div>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Board
              </Button>
            </div>

            {/* Boards Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {workspace.boards.map((board) => (
                <Card
                  key={board.id}
                  className="cursor-pointer transition-all hover:shadow-md"
                >
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <ChartNoAxesColumn className="h-5 w-5 text-muted-foreground mt-1" />
                      <div className="flex-1 space-y-1">
                        <CardTitle className="text-lg">
                          {board.name}
                        </CardTitle>
                        <CardDescription>
                          {board.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{board.lists} lists</span>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{board.members}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
