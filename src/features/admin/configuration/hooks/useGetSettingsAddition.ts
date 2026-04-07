import { useState } from "react";
import { toast } from "sonner";
import { getSettingsAddition } from "../../../../entities/settings/api/settingsApi";
import { AdditionSettingsResponseDTO } from "../../../../entities/settings/dto/settingsDto";

export default function useGetSettingsAddition() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [settingAddition, setSettingAddition] = useState<AdditionSettingsResponseDTO>();

    const handleGetSettingsAddition = async () => {

        try {
            setLoading(true);
            setError(null);
            const response = await getSettingsAddition();;
            setSettingAddition(response.data);
            return response;

        } catch (err: any) {
            const msg = err.response?.data?.menssage || "Error inesperado al buscar la configuracion";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    }

    return { loading, error, settingAddition, handleGetSettingsAddition }
}