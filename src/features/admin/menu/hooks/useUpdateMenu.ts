import { useState } from "react";
import { toast } from "sonner";
import { UpdateMenuRequestWithImageDTO } from "../../../../entities/menu/dto/menuDto";
import { updateMenu } from "../../../../entities/menu/api/menuApi";

export function useUpdateMenu() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const handleUpdateMenu = async (id: number, data: UpdateMenuRequestWithImageDTO) => {
        try {
            setLoading(true);
            setError(null);
            const response = await updateMenu(id, data);
            return response;

        } catch (err: any) {
            const msg = err.response?.data?.message || "Error inesperado al actualizar el menu";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    }

    return {error, loading, handleUpdateMenu}
}