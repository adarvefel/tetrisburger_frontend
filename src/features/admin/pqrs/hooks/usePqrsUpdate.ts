import { useState } from "react";
import { UpdatePqrsAdminRequestDto } from "../../../../entities/pqrs/dto/pqrsDto";
import { updatePqrs } from "../../../../entities/pqrs/api/pqrsApi";

export function usePqrsUpdate (){

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handlePqrsUpdate = async (id: number, data : UpdatePqrsAdminRequestDto) => {
        try{
            setLoading(true);
            setError(null);
            const response = await updatePqrs(id, data);
            return response
        }catch(err: any){
            setError(err.message || "Error al actualizar datos de este pqrs.");
            throw err;
        }finally{
            setLoading(false);
        }
    }

    return {error, loading,  handlePqrsUpdate}; 

}