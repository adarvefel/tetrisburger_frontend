import { useState } from "react";
import { toast } from "sonner";
import { MenuCategoryResponseDTO } from "../../../../entities/categoryMenu/dto/categoryMenuDto";
import { findByIdCategoryMenu } from "../../../../entities/categoryMenu/api/categoryMenuApi";


export function useFindByIdCategoryMenu() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [categoryMenu, setCategoryMenu] = useState<MenuCategoryResponseDTO>();

    const handleFindByIdCategoryMenu = async (id: number) =>{

        try{
            setLoading(true);
            setError(null);
            const response = await findByIdCategoryMenu(id);
            setCategoryMenu(response.data);
            return response;

        }catch(err: any){
            const msg = err.response?.data?.menssage || "Error inesperado al buscar la categoria de menu";
            setError(msg);
            toast.error(msg);
        }finally{
            setLoading(false);
        }
    }

    return {loading, error, categoryMenu, handleFindByIdCategoryMenu}
}