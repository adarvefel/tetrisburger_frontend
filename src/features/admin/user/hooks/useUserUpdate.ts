import { useState } from "react";
import { updateUser } from "../../../../entities/user/api/userApi";
import { UpdateUserDto, UpdateUserWithImageDto } from "../../../../entities/user/dto/userDto";

export function useUserUpdate (){

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleUserUpdate = async (id: number, data : UpdateUserWithImageDto) => {
        try{
            setLoading(true);
            setError(null);
            const response = await updateUser(id, data);
            return response
        }catch(err: any){
            setError(err.message || "Error al actualizar datos de este usuario.");
        }finally{
            setLoading(false);
        }
    }

    return {error, loading,  handleUserUpdate}; 

}