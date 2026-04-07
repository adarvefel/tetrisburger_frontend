import { useState } from "react";
import { toast } from "sonner";
import { previewOrder } from "../../../../entities/order/api/orderApi";

export function usePreviewOrder() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const handlePreviewOrder = async (id: number) => {
        try {
            setLoading(true);
            setError(null);
            const response = await previewOrder(id);
            
            const pdfUrl = response.data;
            window.open(pdfUrl, "_blank"); 

            return response;


        } catch (err: any) {
            const msg = err.response?.data?.message || "Error inesperado al actualizar la orden.";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    }

    return {error, loading, handlePreviewOrder}
}