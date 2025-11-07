import { useState } from "react";
import { deleteUser } from "../../../../entities/user/api/userApi";

export function useUserDelete(){

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const removeUser = async(id: number) =>{
        try{
            setLoading(true);
            setError(null);
            const response = await deleteUser(id);
            return response;

        }catch(err: any){
            setError(err.message || "Error al eliminar usuario")

        }finally{
            setLoading(false);
        }
    }

    return {loading, error, removeUser};

}