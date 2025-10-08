import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "@/pages/LoginPage";
import { ROUTES } from "@/shared/config";
import { HomePage } from "@/pages/HomePage/HomePage";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={<HomePage />}
        />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      </Routes>
    </>
  );
};