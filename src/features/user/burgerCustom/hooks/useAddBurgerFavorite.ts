import { useState } from "react";
import { toast } from "sonner";
import { addBurgerFavorite } from "../api/burgerCustomApi";

export default function useAddBurgerFavorite(){

    
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleAddBurgerFavorite = async (idBurger: number) =>{

        try{
            setLoading(true);
            setError(null);
            const response = await addBurgerFavorite(idBurger);
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

    return {loading, error, handleAddBurgerFavorite}

}