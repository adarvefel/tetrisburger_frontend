import { useEffect, useState } from "react";
import { BurgerResponseDTO } from "../../../../entities/burger/dto/burgerDto";
import { listBurgers } from "../../../../entities/burger/api/burgerApi";
import { toast } from "sonner";

export function useListBurger() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [burgers, setBurgers] = useState<BurgerResponseDTO[]>([]);

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

    const handleListBurgers = async () => {
        try {
            setLoading(true);
            setError(null);

            let response;

            response = await listBurgers(numberPage);
            setBurgers(response.data.content);
            setTotalPage(response.data.totalPages);


        } catch (err: any) {
            const msg = err.response?.data?.message || "Error al traer las hamburguesas";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleListBurgers();
    }, [numberPage, name]);

    return { loading, error, burgers, numberPage, totalPage, nextPage, prevPage, handleListBurgers };
}
