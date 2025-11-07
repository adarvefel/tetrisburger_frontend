import { useState } from "react";
import { loginGoogle } from "../api/authApi";
import { LoginResponseDto } from "../dto/authDto";
import { useAuthStore } from "../../../shared/store/useAuthStore";
import { useNavigate } from "react-router-dom";



export function useGoogleLogin() {

    const { login } = useAuthStore();

    const navegetor = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loginWithGoogle = async (token: string) => {
        try {
            setError(null);
            setLoading(true);
            const response: LoginResponseDto = await loginGoogle(token);
            login(response);

            setTimeout(() => {
                navegetor("/");
            }, 2000);
            return response;

        } catch (err: any) {
            setError(err.message || "error al iniciar con google")
        } finally {
            setLoading(false);
        }
    }

    return { loading, error, loginWithGoogle }
}