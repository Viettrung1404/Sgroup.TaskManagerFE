// frontend/src/pages/RegisterPage/RegisterPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/ui/card";
import { ROUTES } from "@/shared/config";
import { apiFactory, API_ENDPOINTS } from "@/shared/api";
import type { RegisterRequest, AuthResponse } from "@/shared/types";
import { tokenStorage } from "@/shared/utils/tokenStorage";

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<RegisterRequest>({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await apiFactory.post<AuthResponse>(
                API_ENDPOINTS.AUTH.REGISTER,
                form
            );

            // Lưu token và user
            tokenStorage.setAccessToken(response.accessToken);
            tokenStorage.setRefreshToken(response.refreshToken);
            tokenStorage.setUser(response.user);

            // Chuyển sang dashboard
            navigate(ROUTES.DASHBOARD);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Registration failed";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md p-6 border rounded-xl shadow-xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Create your account</CardTitle>
                        <CardDescription>
                            Enter your details below to sign up
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Your name"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    value={form.password}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                />
                            </div>

                            {error && (
                                <div className="text-sm text-red-500 text-center p-2 bg-red-50 rounded">
                                    {error}
                                </div>
                            )}

                            <Button type="submit" disabled={isLoading} className="w-full">
                                {isLoading ? "Signing up..." : "Sign up"}
                            </Button>
                            <Button variant="outline" className="w-full" disabled={isLoading}>
                                Sign up with Google
                            </Button>
                            <p className="px-1 text-center text-sm text-muted-foreground">
                                Already have an account?{" "}
                                <a href="/login" className="underline hover:underline text-primary">
                                    Login
                                </a>
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
