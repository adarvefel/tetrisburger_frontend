import { useEffect, useState } from "react";
import { AddtionResponse } from "../../../../entities/addition/dto/additionDto";
import { toast } from "sonner";
import { listAdditions, searchByName } from "../../../../entities/addition/api/additionApi";
import { listMenus } from "../../../../entities/menu/api/menuApi";
import { MenuResponseDTO } from "../../../../entities/menu/dto/menuDto";

export function useListMenu() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [menus, setMenus] = useState<MenuResponseDTO[]>([]);

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


    const handleListMenu = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await listMenus(numberPage);
            setMenus(response.data.content);
            setTotalPage(response.data.totalPages);


        } catch (err: any) {
            const msg = err.response?.data?.message || "Error al traer las adiciones";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleListMenu();
    }, [numberPage]);

    return { loading, error, menus, numberPage, totalPage, nextPage, prevPage, handleListMenu };
}