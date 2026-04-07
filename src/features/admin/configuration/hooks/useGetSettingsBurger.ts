import { useState } from "react";
import { toast } from "sonner";
import { getSettingsBurger } from "../../../../entities/settings/api/settingsApi";
import { BurgerSettingsResponseDTO } from "../../../../entities/settings/dto/settingsDto";

export default function useGetSettingsBurger() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [settingBurger, setSettingBurger] = useState<BurgerSettingsResponseDTO>();

    const handleGetSettingsBurger = async () => {

        try {
            setLoading(true);
            setError(null);
            const response = await getSettingsBurger();;
            setSettingBurger(response.data);
            return response;

        } catch (err: any) {
            const msg = err.response?.data?.menssage || "Error inesperado al buscar la configuracion";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    }

    return { loading, error, settingBurger, handleGetSettingsBurger }
}