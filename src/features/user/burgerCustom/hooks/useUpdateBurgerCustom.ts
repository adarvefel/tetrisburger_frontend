import { useState } from "react";
import { toast } from "sonner";
import { createBurger } from "../../../../entities/burger/api/burgerApi";
import { CreateBurgerWithImageDTO } from "../../../../entities/burger/dto/burgerDto";
import { CreateCustomBurgerRequestDTO } from "../dto/burgerCustomDto";
import { createBurgerCustom, updateBurgerCustom } from "../api/burgerCustomApi";

export default function useUpdateBurgerCustom(){

    
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleUpdateBurgerCustom = async (id: number, data: CreateCustomBurgerRequestDTO) =>{

        try{
            setLoading(true);
            setError(null);
            const response = await updateBurgerCustom(id, data);
            return response;

        }catch(err: any){
            const msg = err.response?.data?.message || "Error inesperado."
            setError(msg);
            toast.error(msg);
            throw err;
        }finally{
            setLoading(false);
        }

    }

    return {loading, error, handleUpdateBurgerCustom}

}