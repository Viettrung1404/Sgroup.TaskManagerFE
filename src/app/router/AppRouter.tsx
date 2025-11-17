import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "@/shared/config";
import { PageLoader } from "@/shared/components/Loader";
import { DashboardLayout } from "@/features/dashboard/layout";

// Lazy load pages with named exports
const HomePage = lazy(() => 
  import("@/pages/HomePage/HomePage").then(module => ({ default: module.HomePage }))
);
const LoginPage = lazy(() => 
  import("@/pages/LoginPage/LoginPage").then(module => ({ default: module.LoginPage }))
);
const DashboardPage = lazy(() => 
  import("@/pages/DashboardPage/DashboardPage")
);
const ResultPage = lazy(() => 
  import("@/pages/HomePage/ResultPage").then(module => ({ default: module.ResultPage }))
);

export const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.RESULT} element={<ResultPage />} />
        
        {/* Nested Dashboard Routes - sử dụng chung DashboardLayout */}
        <Route path={ROUTES.DASHBOARD.ROOT} element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          {/* Thêm các routes khác dùng chung layout */}
          {/* <Route path="workspaces" element={<WorkspacesPage />} /> */}
          {/* <Route path="workspaces/:workspaceId" element={<WorkspaceDetailPage />} /> */}
          {/* <Route path="workspaces/:workspaceId/boards/:boardId" element={<BoardDetailPage />} /> */}
        </Route>
      </Routes>
    </Suspense>
  );
};