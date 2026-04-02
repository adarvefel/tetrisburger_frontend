import { useEffect, useState } from "react";
import { toast } from "sonner";
import { listOrder, search as searchOrderApi } from "../../../../entities/order/api/orderApi";
import { OrderResponseDTO } from "../../../../entities/order/dto/orderDto";

export function useListOrder() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [orders, setOrders] = useState<OrderResponseDTO[]>([]);

    const [numberPage, setNumberPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const [status, setStatus] = useState<string | undefined>();
    const [date, setDate] = useState<string | undefined>();

    const [searchTerm, setSearchTerm] = useState<string>("");

    const nextPage = () => {
        if (numberPage < totalPage - 1) {
            setNumberPage(prev => prev + 1);
        }
    };

    const prevPage = () => {
        if (numberPage > 0) {
            setNumberPage(prev => prev - 1);
        }
    };

    const handleListOrders = async () => {
        try {
            setLoading(true);
            setError(null);

            let response;

            // 🔍 Si hay búsqueda → endpoint sin paginación
            if (searchTerm && searchTerm.trim() !== "") {
                response = await searchOrderApi({
                    page: numberPage,
                    numberOrder: searchTerm
                });

                setOrders(response.data.content);
                setTotalPage(response.data.totalPages);
            } else {
                response = await listOrder({
                    page: numberPage,
                    status,
                    date,
                });

                setOrders(response.data.content);
                setTotalPage(response.data.totalPages);
            }

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
    }, [numberPage, status, date, searchTerm]);

    return {
        loading,
        error,
        orders,
        numberPage,
        totalPage,
        nextPage,
        prevPage,
        handleListOrders,
        status,
        setStatus,
        date,
        setDate,
        search: searchTerm,
        setSearch: setSearchTerm
    };
}