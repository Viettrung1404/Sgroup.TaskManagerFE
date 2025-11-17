import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Kanban, Users } from "lucide-react"

export interface BoardCardProps {
  id: string
  title: string
  description: string | null
  lists?: number
  members?: number
  onClick?: () => void
}

export function BoardCard({ title, description, lists, members, onClick }: BoardCardProps) {
  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-md"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start gap-3">
          <Kanban className="h-5 w-5 text-muted-foreground mt-1" />
          <div className="flex-1 space-y-1">
            <CardTitle className="text-lg">
              {title}
            </CardTitle>
            <CardDescription>
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{lists} lists</span>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{members}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
