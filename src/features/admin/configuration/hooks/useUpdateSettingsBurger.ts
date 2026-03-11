import { useState } from "react";
import { toast } from "sonner";
import { UpdateBurgerSettingsRequestDTO } from "../../../../entities/settings/dto/settingsDto";
import {updateSettingsBurger } from "../../../../entities/settings/api/settingsApi";

export function useUpdateSettingsBurger() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const handleUpdateSettingsBurger = async (data: UpdateBurgerSettingsRequestDTO) => {
        try {
            setLoading(true);
            setError(null);
            const response = await updateSettingsBurger(data);
            return response;

        } catch (err: any) {
            const msg = err.response?.data?.message || "Error inesperado al actualizar configuracion de hamburguesa";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    }

    return {error, loading, handleUpdateSettingsBurger}
}