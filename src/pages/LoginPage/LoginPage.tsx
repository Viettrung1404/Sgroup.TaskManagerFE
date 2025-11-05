import { LoginForm } from "@/features/auth/ui";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-6 border rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Login Page</h1>
        <LoginForm 
          onSuccess={() => navigate("/dashboard")}
        />
      </div>
    </div>
  );
};