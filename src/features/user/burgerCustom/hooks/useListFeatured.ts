import { useEffect, useState } from "react";
import { toast } from "sonner";
import { listBurgerFavorite, listFeatured } from "../api/burgerCustomApi";
import { FavoriteBurgerResponseDTO } from "../dto/burgerCustomDto";
import { BurgerResponseDTO } from "../../../../entities/burger/dto/burgerDto";

export default function useListFeatured() {


    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [burgersFeatured, setBurgersFeatured] = useState<BurgerResponseDTO[]>([]);

    const handleListFeatured = async () => {

        try {
            setLoading(true);
            setError(null);
            const response = await listFeatured();
            setBurgersFeatured(response.data)
            return response;

        } catch (err: any) {
            const msg = err.response?.data?.message || "Error inesperado."
            setError(msg);
            toast.error(msg);
            throw err;
        } finally {
            setLoading(false);
        }

    }

    useEffect(()=>{
        handleListFeatured();
    },[])

    return { loading, error, burgersFeatured, handleListFeatured }

}