import { useState } from "react";
import { toast } from "sonner";
import { updateBurger } from "../../../../entities/burger/api/burgerApi";
import { BurgerUpdateRequestWithImageDTO } from "../../../../entities/burger/dto/burgerDto";

export function useUpdateBurger() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const handleUpdateBurger = async (id: number, data: BurgerUpdateRequestWithImageDTO) => {
        try {
            setLoading(true);
            setError(null);
            const response = await updateBurger(id, data);
            return response;

        } catch (err: any) {
            const msg = err.response?.data?.message || "Error inesperado al actualizar Burger";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    }

    return {error, loading, handleUpdateBurger}
}