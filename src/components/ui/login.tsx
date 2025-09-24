import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Login({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>Enter your email below to login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action="post" className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" required placeholder="m@gmail.com"></Input>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <a href="#" className="text-sm underline hover:underline">Forgot a password?</a>
                            </div>
                            <Input id="email" type="email" required placeholder="m@gmail.com"></Input>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Button type="submit" className="w-full">Login</Button>
                            <Button variant="outline" className="w-full">Login with Google</Button>
                        </div>
                        <div>
                            <p className="px-1 text-center text-sm text-muted-foreground">
                                Don't have an account? <a href="#" className="underline hover:underline">Sign up</a>
                            </p>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}