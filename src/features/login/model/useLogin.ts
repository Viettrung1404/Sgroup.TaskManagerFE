import { useEffect, useState } from "react";

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(false);
    }, []);
    

    const loginUser = (email: string, password: string) => {
        setIsLoading(true);
        console.log("Login user:", { email, password });
        setIsLoading(false);
    };
    const logoutUser = () => {
        console.log("Logout user");
        setIsLoading(false);
    };
    return { loginUser, logoutUser, isLoading };

};