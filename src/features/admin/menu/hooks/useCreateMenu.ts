import { useState } from "react";
import { toast } from "sonner";
import { CreateMenuRequestWithImageDTO } from "../../../../entities/menu/dto/menuDto";
import { createMenu } from "../../../../entities/menu/api/menuApi";


export default function useCreateMenu() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const handleCreateMenu = async (data: CreateMenuRequestWithImageDTO) => {

        try {
            setLoading(true);
            setError(null);
            const response = await createMenu(data);
            return response;

        } catch (err: any) {
            const msg = err.response?.data?.message || "Error al intentar crear un nuevo menu";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }

    }

    return { loading, error, handleCreateMenu };
}