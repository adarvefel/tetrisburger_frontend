import { useState } from "react";
import { User } from "../../../entities/user/model/types";
import { registrarUsuario } from "../api/authApi";

export function useRegister() {

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const register = async (usuario: User) =>{

        try{
            setLoading(true);
            setError(null);
            const response = await registrarUsuario(usuario);
            return response;

        }catch(err: any){
            setError(err.response?.data?.message || "Error desconocido, por favor intentelo mas tarde.")
        }finally{
            setLoading(false);
        }

    }

    return {loading, error, register}
}

