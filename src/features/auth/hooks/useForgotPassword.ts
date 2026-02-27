import { useState } from "react";
import { forgotPasswordUsuario } from "../api/authApi";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export function useForgotPassword() {

    const { executeRecaptcha } = useGoogleReCaptcha();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const forgotPassword = async (email: string) => {

        try {
            setLoading(true);
            setError(null);

            if (!executeRecaptcha) throw new Error("reCAPTCHA no está listo");
            const recaptchaToken = await executeRecaptcha("forgotPassword");

            const response = await forgotPasswordUsuario(email, recaptchaToken);
            return response;
        } catch (err: any) {
            setError(err.message || "Error inesperado")
        } finally {
            setLoading(false);
        }
    }

    return { loading, error, forgotPassword }
}