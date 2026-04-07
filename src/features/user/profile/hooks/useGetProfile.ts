import { useEffect, useState } from "react";
import { getProfile } from "../api/profileApi";
import { GetProfileResponeDto } from "../dto/profileDto";

export function useGetProfile () {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<GetProfileResponeDto | null>(null);

    const handleGetProfile = async() =>{
        try{
            setLoading(true);
            setError(null);
            const response = await getProfile();
            setProfile(response.data);
            return response;
            
        }catch(err: any){
            setError(err.message || "Error al cargar datos del usuario");


        }finally{
            setLoading(false);

        }
    }

    useEffect(()=>{
        handleGetProfile();
    },[])

    return {loading, error, profile, handleGetProfile};

}