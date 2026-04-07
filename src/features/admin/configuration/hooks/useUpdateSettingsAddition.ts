import { useState } from "react";
import { toast } from "sonner";
import { UpdateAdditionSettingsRequestDTO } from "../../../../entities/settings/dto/settingsDto";
import { updateSettingsAddition } from "../../../../entities/settings/api/settingsApi";

export function useUpdateSettingsAddition() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const handleUpdateSettingsAddition = async (data: UpdateAdditionSettingsRequestDTO) => {
        try {
            setLoading(true);
            setError(null);
            const response = await updateSettingsAddition(data);
            return response;

        } catch (err: any) {
            const msg = err.response?.data?.message || "Error inesperado al actualizar configuracion de adicion";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    }

    return {error, loading, handleUpdateSettingsAddition}
}