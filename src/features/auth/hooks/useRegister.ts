import { useState } from "react";
import { User } from "../../../entities/user/model/types";
import { registrarUsuario } from "../api/authApi";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export function useRegister() {

    const { executeRecaptcha } = useGoogleReCaptcha();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (usuario: User) => {
        try{
            setLoading(true);
            setError(null);

            if (!executeRecaptcha) throw new Error("reCAPTCHA no está listo");
            const recaptchaToken = await executeRecaptcha("register"); // 👈 pregunta al back qué acción espera

            const response = await registrarUsuario(usuario, recaptchaToken);
            return response;

        }catch(err: any){
            setError(err.response?.data?.message || "Error desconocido, por favor intentelo mas tarde.")
        }finally{
            setLoading(false);
        }
    }

    return { loading, error, register }
}