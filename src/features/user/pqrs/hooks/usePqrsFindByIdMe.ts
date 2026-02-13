import { useState } from "react";
import { PqrsFindByIdResponse } from "../dto/pqrsUserDto";
import {findPqrsByIdMe } from "../api/pqrsUserApi";



export function usePqrsFindByIdMe() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [pqrs, setPqrs] = useState<PqrsFindByIdResponse>();

    const handlePqrsFindByIdMe = async (id: number) => {
        try {
            setLoading(true);
            setError(null);
            const response = await findPqrsByIdMe(id);
            setPqrs(response.data);
            return response;

        } catch (err: any) {
            setError(err.message || "Error al econtrar usuario")

        } finally {
            setLoading(false);
        }


    }



    return { loading, error, pqrs, handlePqrsFindByIdMe };

}