import { useState } from "react";
import { CreatePqrsDto } from "../dto/pqrsUserDto";
import { createPqrs } from "../api/pqrsUserApi";

export function usePqrsCreate() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePqrsCreate = async (data: CreatePqrsDto) => {

        try{
            setLoading(true);
            setError(null);
            const response = await createPqrs(data);
            return response;

        }catch(err: any){

            setError(err.menssage || "Error al intentar crear un pqrs");
            throw err; 

        }finally{
            setLoading(false);

        }

    }

    return {loading, error, handlePqrsCreate};

}