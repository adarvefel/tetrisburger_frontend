import { useState } from "react";
import { loginUsuario } from "../api/authApi";
import { LoginResponseDto } from "../dto/authDto";
import { useAuthStore } from "../../../shared/store/useAuthStore";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export function useLogin(){

    const { login } = useAuthStore();
    const { executeRecaptcha } = useGoogleReCaptcha();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (email: string, password: string) => {
        try{
            setLoading(true);
            setError(null);

            if (!executeRecaptcha) throw new Error("reCAPTCHA no está listo");
            const recaptchaToken = await executeRecaptcha("login");

            const response: LoginResponseDto = await loginUsuario(email, password, recaptchaToken);
            login(response);
            return response;

        }catch(err: any){
            setError(err.response?.data?.message || "Error al loguearte");
            

        }finally{
            setLoading(false);
        }
    } 

    return { loading, error, handleLogin };
}