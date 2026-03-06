import { useState } from "react";
import { CreateAdditionRequestWithImage } from "../../../../entities/addition/dto/additionDto";
import { createAddition } from "../../../../entities/addition/api/additionApi";
import { toast } from "sonner";

export default function useCreateAddition() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const handleCreateAdition = async (data: CreateAdditionRequestWithImage) => {

        try {
            setLoading(true);
            setError(null);
            const response = await createAddition(data);
            return response;

        } catch (err: any) {
            const msg = err.response?.data?.message || "Error al intentar crear un nuevo adicion";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }

    }

    return { loading, error, handleCreateAdition };
}