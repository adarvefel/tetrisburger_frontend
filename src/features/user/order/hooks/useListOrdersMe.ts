import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MenuCategoryResponseDTO } from "../../../../entities/categoryMenu/dto/categoryMenuDto";
import { listCategoryMenu } from "../../../../entities/categoryMenu/api/categoryMenuApi";
import { listOrdersMe } from "../../../../entities/order/api/orderApi";
import { OrderResponseDTO } from "../../../../entities/order/dto/orderDto";

export function useListOrdersMe() {
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


    const handleListOrdersMe = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await listOrdersMe(numberPage);
            setOrders(response.data.content);
            setTotalPage(response.data.totalPages);

        } catch (err: any) {
            const msg = err.response?.data?.message || "Error al traer las ordenes.";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleListOrdersMe();
    }, [numberPage]);

    return { loading, error, orders, numberPage, totalPage, nextPage, prevPage, handleListOrdersMe };
}