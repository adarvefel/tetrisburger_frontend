import { useEffect, useState } from "react";
import { BurgerResponseDTO } from "../../../../entities/burger/dto/burgerDto";
import { listBurgers, searchByName } from "../../../../entities/burger/api/burgerApi";
import { toast } from "sonner";
import { listOrder } from "../../../../entities/order/api/orderApi";
import { OrderResponseDTO } from "../../../../entities/order/dto/orderDto";

export function useListOrder() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [orders, setOrders] = useState<OrderResponseDTO[]>([]);

    const [numberPage, setNumberPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

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

            const response = await listOrder(numberPage);
            setOrders(response.data.content);
            setTotalPage(response.data.totalPages);

        } catch (err: any) {
            const msg = err.response?.data?.message || "Error al traer las ordenes";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleListOrders();
    }, [numberPage]);

    return { loading, error, orders, numberPage, totalPage, nextPage, prevPage, handleListOrders, name };
}
