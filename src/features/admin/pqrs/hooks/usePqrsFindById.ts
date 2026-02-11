import { useState } from "react";
import { PqrsFindByIdResponse } from "../dto/pqrsAdminDto";
import { findPqrsById } from "../../../../entities/pqrs/api/pqrsApi";


export function usePqrsFindById() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [pqrs, setPqrs] = useState<PqrsFindByIdResponse>();

    const handlePqrsFindById = async (id: number) => {
        try {
            setLoading(true);
            setError(null);
            const response = await findPqrsById(id);
            setPqrs(response.data);
            return response;

        } catch (err: any) {
            setError(err.message || "Error al econtrar usuario")

        } finally {
            setLoading(false);
        }


    }



    return { loading, error, pqrs, handlePqrsFindById };

}