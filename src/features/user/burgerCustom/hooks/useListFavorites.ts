import { useEffect, useState } from "react";
import { toast } from "sonner";
import { listBurgerFavorite } from "../api/burgerCustomApi";
import { FavoriteBurgerResponseDTO } from "../dto/burgerCustomDto";

export default function useListFavorites() {


    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [burgersFavorites, setBurgersFavorites] = useState<FavoriteBurgerResponseDTO[]>([]);

    const handleListFavorites = async () => {

        try {
            setLoading(true);
            setError(null);
            const response = await listBurgerFavorite();
            setBurgersFavorites(response.data)
            console.log(response)
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
        handleListFavorites();
    },[])

    return { loading, error, burgersFavorites, handleListFavorites }

}