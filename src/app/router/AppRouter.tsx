import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "@/shared/config";
import { PageLoader } from "@/shared/components/Loader";

// ✅ Lazy load pages with named exports
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
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.RESULT} element={<ResultPage />} />
      </Routes>
    </Suspense>
  );
};