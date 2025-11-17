export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  RESULT: "/result",
  // Dashboard routes - nested under /dashboard
  DASHBOARD: {
    ROOT: "/dashboard",
    WORKSPACES: "/dashboard/workspaces",
    WORKSPACE_DETAIL: "/dashboard/workspaces/:workspaceId",
    BOARD_DETAIL: "/dashboard/workspaces/:workspaceId/boards/:boardId",
  },
};