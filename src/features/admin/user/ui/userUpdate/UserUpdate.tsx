
import "./userUpdate.css"
import { useParams } from 'react-router-dom'
import UserForm from '../../../../../shared/components/formsCruds/userForm/UserForm'
import { useUserFindById } from "../../hooks/useUserFindById"
import { useUserUpdate } from "../../hooks/useUserUpdate";
import { useEffect } from "react";
import LoadingSpinner from "../../../../../shared/components/loadings/loadingSpinner/LoadingSpinner";

export default function UserUpdate() {

    const { error: findError, loading: findLoading, user, handleUserFindById } = useUserFindById();
    const { error: updateError, loading: updateLoading, handleUserUpdate } = useUserUpdate();

    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        if (id) {
            handleUserFindById(Number(id));
        }
    }, [id])

    if (findLoading) {
        return <LoadingSpinner/>
    }


    return (

        <UserForm
            mode="admin-update"
            initialData={user}
            onSubmit={(data) => handleUserUpdate(Number(id), data)}
            loading={updateLoading}
        />

    )
}
