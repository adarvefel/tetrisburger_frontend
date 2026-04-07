import { useState } from "react";
import { resetPasswordUsuario } from "../api/authApi";

export function useResetPassword(){

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const resetPassword = async (token : string, nuevaPassword: string) =>{

        try{
            setLoading(true);
            setError(null);
            const response = await resetPasswordUsuario(token, nuevaPassword);
            return response;
        }catch(err: any){
            setError(err.message || "error desconocido");

        }finally{
            setLoading(false);
        }
    }

    return {loading, error, resetPassword}
}