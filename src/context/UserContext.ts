import * as React from 'react';
import {User} from "../model/User";

export interface UserContext {
    user: null | User;
    login: (user: User) => void;
    logout: () => void;
}

export const DEFAULT_USER = {
    user: null,
    login: () => {},
    logout: () => {}
}

export const userContext = React.createContext<UserContext>(DEFAULT_USER);