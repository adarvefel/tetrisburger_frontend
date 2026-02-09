import { useEffect, useState } from "react";
import { PqrsFetchListMe } from "../dto/pqrsDto";
import { listPqrsMe } from "../../../../entities/pqrs/api/pqrsApi";

export function usePqrsListMe(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [pqrs, setPqrs] = useState<PqrsFetchListMe[]>([]);

    const [numberPage, setNumberPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const nextPage = ()=>{
        if (numberPage < totalPage - 1) {
            setNumberPage(prev => prev +1);
            console.log(numberPage);
        }
        return;
    }

    const prevPage = ()=>{
        if (numberPage > 0) {
            setNumberPage(prev => prev - 1);
            console.log(numberPage);
        }
        return;
    }

    const handlePqrsListMe = async() =>{
        try{
            setLoading(true);
            setError(null);

            const response = await listPqrsMe(numberPage);
            setPqrs(response.data.pqrs);
            setTotalPage(response.data.totalPages);
            setTotalElements(response.data.totalElements);
            return response;

        }catch(err: any){
            setError(err.menssage  || "Error al intenar buscar las pqrs.");
            throw err;
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        handlePqrsListMe();
    }, [numberPage]);

    return {loading, error, pqrs, numberPage, totalPage, totalElements, nextPage, prevPage, handlePqrsListMe };
}