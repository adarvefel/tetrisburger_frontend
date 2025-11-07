import { useState } from "react";
import { forgotPasswordUsuario } from "../api/authApi";

export function useForgotPassword() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const forgotPassword = async (email: string) => {

        try {
            setLoading(true);
            setError(null);
            const response = await forgotPasswordUsuario(email)
            return response;
        } catch (err: any) {
            setError(err.message || "Error inesperado")
        } finally {
            setLoading(false);
        }
    }

    return { loading, error, forgotPassword }
}