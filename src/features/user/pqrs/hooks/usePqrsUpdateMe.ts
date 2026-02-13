import { useState } from "react";
import { UpdatePqrsUserRequestDto } from "../dto/pqrsUserDto";
import { updatePqrsMe } from "../api/pqrsUserApi";

export function usePqrsUpdateMe (){

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handlePqrsUpdateMe = async (id: number, data : UpdatePqrsUserRequestDto) => {
        try{
            setLoading(true);
            setError(null);
            const response = await updatePqrsMe(id, data);
            return response
        }catch(err: any){
            setError(err.message || "Error al actualizar datos de este pqrs.");
            throw err;
        }finally{
            setLoading(false);
        }
    }

    return {error, loading,  handlePqrsUpdateMe}; 

}