import { useEffect, useState } from "react";
import { toast } from "sonner";
import { findAdditionById} from "../../../../entities/addition/api/additionApi";
import { AddtionResponse } from "../../../../entities/addition/dto/additionDto";

export function useFindByIdAddition() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [addition, setAddition] = useState<AddtionResponse>();

    const handleFindByIdAddition = async (id: number) =>{

        try{
            setLoading(true);
            setError(null);
            const response = await findAdditionById(id);
            setAddition(response.data);
            return response;

        }catch(err: any){
            const msg = err.response?.data?.menssage || "Error inesperado al buscar adicion";
            setError(msg);
            toast.error(msg);
        }finally{
            setLoading(false);
        }
    }

    return {loading, error, addition, handleFindByIdAddition}
}