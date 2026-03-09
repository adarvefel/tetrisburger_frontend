import { useState } from "react";
import { toast } from "sonner";
import { CreateMenuCategoryRequestDTO } from "../../../../entities/categoryMenu/dto/categoryMenuDto";
import { createCategoryMenu } from "../../../../entities/categoryMenu/api/categoryMenuApi";

export default function useCreateCategoryMenu() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const handleCreateCategoryMenu = async (data: CreateMenuCategoryRequestDTO) => {

        try {
            setLoading(true);
            setError(null);
            const response = await createCategoryMenu(data);
            return response;

        } catch (err: any) {
            const msg = err.response?.data?.message || "Error al intentar crear un nuevo categoria de menu";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }

    }

    return { loading, error, handleCreateCategoryMenu };
}