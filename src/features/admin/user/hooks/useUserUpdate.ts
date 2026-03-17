import { useState } from "react";
import { updateUser } from "../../../../entities/user/api/userApi";
import { UpdateUserDto, UpdateUserWithImageDto } from "../../../../entities/user/dto/userDto";
import { toast } from "sonner";

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
            setError(err.response?.data?.massage || "Error al actualizar datos de este usuario.");
            const massage = err.response?.data?.message || "Error al actualizar datos de este usuario.";
            toast.error(massage);
        }finally{
            setLoading(false);
        }
    }

    return {error, loading,  handleUserUpdate}; 

}