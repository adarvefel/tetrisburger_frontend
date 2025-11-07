import { useState } from "react";
import { createUser } from "../../../../entities/user/api/userApi";
import { CreateUserDto } from "../../../../entities/user/dto/userDto";

export function useUserCreate (){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const handleUserCreate = async(data: CreateUserDto) =>{

        try{
            setLoading(true);
            setError(null);
            const response = await createUser(data);
            return response;

        }catch(err: any){
            setError(err.message || "Error al intentar crear un nuevo usario");
        }finally{
            setLoading(false);
        }

    }

    return {loading, error, handleUserCreate};
}