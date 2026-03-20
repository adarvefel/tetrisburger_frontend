import { create } from "zustand";
import { LoginResponseDto } from "../../features/auth/dto/authDto";
import { useCartStore } from "./useCartStore";


interface AuthStore {
    token: string | null;
    user: LoginResponseDto["user"] | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isLoading: boolean;
    login: (data: LoginResponseDto) => void;
    logout: () => void;
    loadFromStorge: () => void
    
}

export const useAuthStore = create<AuthStore>((set) => ({
    token: null,
    user: null,
    isAuthenticated: false,
    isAdmin: false,
    isLoading: true,

    login: (data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        set({
            token: data.token,
            user: data.user,
            isAuthenticated: true,
            isAdmin: data.user.role === "ADMIN",
            isLoading: false,
        })
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("cart");

        useCartStore.getState().clearCart() 

        set({
            token: null,
            user: null,
            isAuthenticated: false,
            isAdmin: false,
            isLoading: false,
        })

        window.location.href = "/";
    },

    loadFromStorge: () => {

        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if (token && user) {
            const  parsedUser = JSON.parse(user);

            set({
                token: token,
                user: parsedUser,
                isAuthenticated: true,
                isAdmin: parsedUser.role === "ADMIN",
                isLoading: false,
            })
        }
        else{
            set({
                isLoading: false,
            })
        }

    }
}));