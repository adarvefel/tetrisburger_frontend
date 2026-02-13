import { useEffect, useState } from "react";
import { PqrsFetchList } from "../dto/pqrsAdminDto";
import { listPqrs } from "../../../../entities/pqrs/api/pqrsApi";

export function usePqrsList() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [pqrs, setPqrs] = useState<PqrsFetchList[]>([]);

    const [numberPage, setNumberPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    // Filtros ADMIN
    const [type, setType] = useState<string | undefined>(undefined);
    const [status, setStatus] = useState<string | undefined>(undefined);
    const [priority, setPriority] = useState<string | undefined>(undefined);

    const nextPage = () => {
        if (numberPage < totalPage - 1) {
            setNumberPage(prev => prev + 1);
        }
    };

    const prevPage = () => {
        if (numberPage > 0) {
            setNumberPage(prev => prev - 1);
        }
    };

    const handlePqrsList = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await listPqrs(
                numberPage,
                type,
                status,
                priority
            );

            setPqrs(response.data.pqrs);
            setTotalPage(response.data.totalPages);
            setTotalElements(response.data.totalElements);

            return response;
        } catch (err: any) {
            setError(err.message || "Error al intentar buscar las PQRS.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handlePqrsList();
    }, [numberPage, type, status, priority]);

    return {
        loading,
        error,
        pqrs,
        numberPage,
        totalPage,
        totalElements,
        nextPage,
        prevPage,
        handlePqrsList,

        // setters de filtros
        setType,
        setStatus,
        setPriority,
    };
}
