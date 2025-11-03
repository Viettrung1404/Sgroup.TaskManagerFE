import { userService } from "@/shared/api/services/userService";
import type { User } from "@/shared/types";
import { Button } from "@/shared/ui/button";
import { useState } from "react";


export const DashboardPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const onClick = async() => {
        const response = await userService.getAllUsers();
        if (response) {
            setUsers(response.responseObject);
        }
    };

    return (
        <div className="p-8 flex items-center justify-center flex-col gap-4">
            <h1>Welcome to the Dashboard</h1>
            <Button onClick={onClick}>
                Get all users
            </Button>
            {users.length > 0 && (
                <ul className="mt-4 space-y-2">
                    {users.map((user, index) => (
                        <li key={index}>{index + 1}. {user.name}</li>
                    ))}
                </ul>
            )}
        </div>
    )
};
