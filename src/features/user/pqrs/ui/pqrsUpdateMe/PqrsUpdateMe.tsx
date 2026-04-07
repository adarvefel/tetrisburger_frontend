import { useParams } from 'react-router-dom'
import { useEffect } from "react";
import PqrsForm from "../../../../../shared/components/formsCruds/pqrsForm/PqrsForm";
import { usePqrsFindByIdMe } from '../../hooks/usePqrsFindByIdMe';
import { usePqrsUpdateMe } from '../../hooks/usePqrsUpdateMe';

export default function PqrsUpdateMe() {

    const { error: findError, loading: findLoading, pqrs, handlePqrsFindByIdMe } = usePqrsFindByIdMe();
    const { error: updateError, loading: updateLoading, handlePqrsUpdateMe } = usePqrsUpdateMe();

    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        if (id) {
            handlePqrsFindByIdMe(Number(id));
        }
    }, [id])


    return (

        <PqrsForm
            mode="user-update"
            initialData={pqrs}
            onSubmit={(data) => handlePqrsUpdateMe(Number(id), data)}
        />

    )
}
