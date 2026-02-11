
import "./pqrsUpdate.css"
import { useParams } from 'react-router-dom'
import { useEffect } from "react";
import { usePqrsFindById } from "../../hooks/usePqrsFindById";
import { usePqrsUpdate } from "../../hooks/usePqrsUpdate";
import PqrsForm from "../../../../../shared/components/pqrsForm/PqrsForm";

export default function PqrsUpdate() {

    const { error: findError, loading: findLoading, pqrs, handlePqrsFindById } = usePqrsFindById();
    const { error: updateError, loading: updateLoading, handlePqrsUpdate } = usePqrsUpdate();

    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        if (id) {
            handlePqrsFindById(Number(id));
        }
    }, [id])


    return (

        <PqrsForm
            mode="admin-update"
            initialData={pqrs}
            onSubmit={(data) => handlePqrsUpdate(Number(id), data)}
        />

    )
}
