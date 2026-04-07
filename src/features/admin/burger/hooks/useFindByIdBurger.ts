import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BurgerResponseDTO } from "../../../../entities/burger/dto/burgerDto";
import { findByIdBurger } from "../../../../entities/burger/api/burgerApi";

export function useFindByIdBurger() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [bruger, setBurger] = useState<BurgerResponseDTO>();

    const handleFindByIdBurger = async (id: number) =>{

        try{
            setLoading(true);
            setError(null);
            const response = await findByIdBurger(id);
            setBurger(response.data);
            return response;

        }catch(err: any){
            const msg = err.response?.data?.menssage || "Error inesperado al buscar hamburguesa";
            setError(msg);
            toast.error(msg);
        }finally{
            setLoading(false);
        }
    }

    return {loading, error, bruger, handleFindByIdBurger}
}