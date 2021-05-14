import { createContext } from "react";

export interface Authentication {
    token: string,
    username: string,
    accountType: "customer" | "mechanic" | "manager" | "admin",
}

export interface AuthInterface {
    auth: Authentication | null,
    setAuth: (auth: Authentication | null) => void,
}

export const AuthenticationContext = createContext<AuthInterface>({
    auth: null,
    setAuth: (_a: Authentication | null) => console.error("Called default value of AuthenticationContext")
});