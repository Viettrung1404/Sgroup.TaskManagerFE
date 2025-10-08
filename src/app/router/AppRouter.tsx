import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "@/pages/LoginPage";
import { ROUTES } from "@/shared/config";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={<Navigate to={ROUTES.LOGIN} replace />}
        />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      </Routes>
    </>
  );
};