import {useCallback, useState} from "react";
import {User} from "../model/User";
import {UserContext} from "../context/UserContext";

export const useUserContext = (): UserContext => {
    const [user, setUser] = useState<User | null>(null);

    const login = (currentUser: User) => {
        setUser(currentUser);
    };

    const logout = () => {
        setUser(null);
    }

    return {
        user,
        login,
        logout
    };
};