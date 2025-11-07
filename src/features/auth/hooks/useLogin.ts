import { useState } from "react";
import { loginUsuario } from "../api/authApi";
import { LoginResponseDto } from "../dto/authDto";
import { useAuthStore } from "../../../shared/store/useAuthStore";


export function useLogin(){

    const {login} = useAuthStore();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (email: string, password: string) =>{
        try{
            setLoading(true);
            setError(null);
            const response: LoginResponseDto = await loginUsuario(email, password);
            login(response);
            return response;

        }catch(err: any){
            setError(err.message || "Error al loguearte");

        }finally{
            setLoading(false);
        }
    } 

    return {loading, error, handleLogin};

}