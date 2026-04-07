import { useState } from "react";
import { updateProfile } from "../api/profileApi";
import { UpdateProfileRequestDto, UpdateProfileWithImageRequestDto } from "../dto/profileDto";

export function useUpdateProfile (){

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleUpdateProfile = async (data: UpdateProfileWithImageRequestDto) => {
        try{
            setLoading(true);
            setError(null);
            const response = await updateProfile(data);
            return response
        }catch(err: any){
            setError(err.message || "Error al actualizar datos");
        }finally{
            setLoading(false);
        }
    }

    return {error, loading, handleUpdateProfile}; 

}