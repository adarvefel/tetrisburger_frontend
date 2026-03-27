import { useState } from "react";
import { toast } from "sonner";
import { updateOrder } from "../../../../entities/order/api/orderApi";

export function useUpdateOrder() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const handleUpdateOrder = async (id: number, status: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await updateOrder(id, status);
            return response;

        } catch (err: any) {
            const msg = err.response?.data?.message || "Error inesperado al actualizar la orden.";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    }

    return {error, loading, handleUpdateOrder}
}