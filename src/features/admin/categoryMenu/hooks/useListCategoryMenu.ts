import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MenuCategoryResponseDTO } from "../../../../entities/categoryMenu/dto/categoryMenuDto";
import { listCategoryMenu } from "../../../../entities/categoryMenu/api/categoryMenuApi";

export function useListCategoryMenu() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [categorysMenu, setCategorysMenu] = useState<MenuCategoryResponseDTO[]>([]);

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


    const handleListCategoryMenu = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await listCategoryMenu(numberPage);
            setCategorysMenu(response.data.content);
            setTotalPage(response.data.totalPages);

        } catch (err: any) {
            const msg = err.response?.data?.message || "Error al traer las categorias de menu";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleListCategoryMenu();
    }, [numberPage]);

    return { loading, error, categorysMenu, numberPage, totalPage, nextPage, prevPage, handleListCategoryMenu };
}