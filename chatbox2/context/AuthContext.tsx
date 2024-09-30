import { log } from "@/utils/log";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { createContext, useEffect, useState } from "react";

export type AuthContextTypes = {
    isLoggedIn?: boolean;
    user?: string;
    handleLogin?: (user: string) => void;
    handleLogout?: () => void;
}

export const AuthContext = createContext<AuthContextTypes>({});

export const AuthContextProvider = ({ children }: { children: any }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState("");
    const router = useRouter();

    const getAuthStatus = async () => {
        try {
            const hasUser = await AsyncStorage.getItem("user");
            log("Is Logged in :" + (hasUser !== null));
            return { status: hasUser !== null, user: hasUser };
        } catch (error) {
            console.error("Error retrieving auth status", error);
            return { status: false, user: null };
        }
    };

    const handleLogin = async (user: string) => {
        setUser(user);
        setLoggedIn(true);
        await AsyncStorage.setItem('user', user);
        router.replace('/global-room')
    }

    const handleLogout = async () => {
        await AsyncStorage.removeItem("user");
        setUser("");
        router.push("/");
        log("logoout");
    };

    useEffect(() => {
        const checkAuthStatus = async () => {
            const authStatus = await getAuthStatus();
            setLoggedIn(authStatus.status);
            if (authStatus.status) {
                setUser(authStatus.user ?? "");
            }
        };
        checkAuthStatus();
    }, [])

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )

}


