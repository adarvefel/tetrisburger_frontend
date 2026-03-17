import { useEffect, useState } from "react";
import { AddtionResponse } from "../../../../entities/addition/dto/additionDto";
import { toast } from "sonner";
import { listAdditions, searchByName } from "../../../../entities/addition/api/additionApi";

export function useListAddition(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [additions, setAdditions] = useState<AddtionResponse[]>([]);

    const [numberPage, setNumberPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const [name, setName] = useState("");

    const nextPage = ()=>{
        if (numberPage < totalPage - 1) {
            setNumberPage(prev => prev +1);
    
        }
        return;
    }

    const prevPage = ()=>{
        if (numberPage > 0) {
            setNumberPage(prev => prev - 1);
            
        }
        return;
    }


    const handleListAdditions = async() =>{
        try{
            setLoading(true);
            setError(null);

            let response;

            if (name.trim() !== "") {
                
                response = await searchByName(name, numberPage);
                setAdditions(response.data.content);
                setTotalPage(response.data.totalPages);
            } else {
                
                response = await listAdditions(numberPage);
                setAdditions(response.data.content);
                setTotalPage(response.data.totalPages);
            }

        }catch(err: any){
            const msg = err.response?.data?.message || "Error al traer las adiciones";
            setError(msg);
            toast.error(msg);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        handleListAdditions();
    }, [numberPage, name]);

    return {loading, error, additions, numberPage, totalPage, setName, name, nextPage, prevPage, handleListAdditions};
}