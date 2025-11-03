import { Route, Routes } from "react-router-dom";
import { ROUTES } from "@/shared/config";
import { 
  HomePage, 
  LoginPage,
  DashboardPage,
  ResultPage
} from "@/pages/";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={<HomePage />}
        />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.RESULT} element={<ResultPage />} />
      </Routes>
    </>
  );
};