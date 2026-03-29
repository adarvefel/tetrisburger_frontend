import { useEffect, useState } from "react";
import { toast } from "sonner";
import { listOrder } from "../../../../entities/order/api/orderApi";
import { OrderResponseDTO } from "../../../../entities/order/dto/orderDto";

export function useListOrder() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [orders, setOrders] = useState<OrderResponseDTO[]>([]);

    const [numberPage, setNumberPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const [status, setStatus] = useState<string | undefined>();
    const [date, setDate] = useState<string | undefined>();

    const nextPage = () => {
        if (numberPage < totalPage - 1) {
            setNumberPage(prev => prev + 1);

        }
        return;
    }

    const prevPage = () => {
        if (numberPage > 0) {
            setNumberPage(prev => prev - 1);
        }
        return;
    }

    const handleListOrders = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await listOrder({
                page: numberPage,
                status,
                date,
            });

            setOrders(response.data.content);
            setTotalPage(response.data.totalPages);

        } catch (err: any) {
            const msg = err.response?.data?.message || "Error al traer las órdenes";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleListOrders();
    }, [numberPage, status, date]);

    return { loading, error, orders, numberPage, totalPage, nextPage, prevPage, handleListOrders, status, setStatus, date, setDate };
}
