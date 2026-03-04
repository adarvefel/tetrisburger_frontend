import { useState } from "react";
import { UpdateAdditionRequestWithImageDTO } from "../../../../entities/addition/dto/additionDto";
import { updateAddition } from "../../../../entities/addition/api/additionApi";
import { toast } from "sonner";

export function useUpdateAddition() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const handleUpdateAddition = async (id: number, data: UpdateAdditionRequestWithImageDTO) => {
        try {
            setLoading(true);
            setError(null);
            const response = await updateAddition(id, data);
            return response;

        } catch (err: any) {
            const msg = err.response?.data?.message || "Error inesperado al actualizar adicion";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    }

    return {error, loading, handleUpdateAddition}
}