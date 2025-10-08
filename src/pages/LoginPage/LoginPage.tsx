import { LoginForm } from "@/features/login/ui";
import { ROUTES } from "@/shared/config";
import { Navigate } from "react-router-dom";

export const LoginPage = () => {
    const user = null; 
    if (user) {
        return <Navigate to={ROUTES.HOME} replace />;
    }
    return (
        <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-6 border rounded-xl shadow-xl">
            <h1 className="text-2xl font-bold mb-4 text-center">Login Page</h1>
            <LoginForm />
        </div>
        </div>
    );
};