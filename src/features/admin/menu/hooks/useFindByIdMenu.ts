import { useState } from "react";
import { toast } from "sonner";
import { MenuResponseDTO } from "../../../../entities/menu/dto/menuDto";
import { findByIdMenu } from "../../../../entities/menu/api/menuApi";


export function useFindByIdMenu() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [menu, setMenu] = useState<MenuResponseDTO>();

    const handleFindByIdMenu = async (id: number) =>{

        try{
            setLoading(true);
            setError(null);
            const response = await findByIdMenu(id);
            setMenu(response.data);
            return response;

        }catch(err: any){
            const msg = err.response?.data?.menssage || "Error inesperado al buscar el menu";
            setError(msg);
            toast.error(msg);
        }finally{
            setLoading(false);
        }
    }

    return {loading, error, menu, handleFindByIdMenu}
}