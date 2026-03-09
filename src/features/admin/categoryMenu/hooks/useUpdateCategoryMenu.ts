import { useState } from "react";
import { toast } from "sonner";
import { UpdateMenuCategoryRequestDTO } from "../../../../entities/categoryMenu/dto/categoryMenuDto";
import { updateCategoryMenu } from "../../../../entities/categoryMenu/api/categoryMenuApi";

export function useUpdateCategoryMenu() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const handleUpdateCategoryMenu = async (id: number, data: UpdateMenuCategoryRequestDTO) => {
        try {
            setLoading(true);
            setError(null);
            const response = await updateCategoryMenu(id, data);
            return response;

        } catch (err: any) {
            const msg = err.response?.data?.message || "Error inesperado al actualizar la categoria menu";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    }

    return {error, loading, handleUpdateCategoryMenu}
}