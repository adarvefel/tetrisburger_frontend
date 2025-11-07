
import "./userUpdate.css"
import { useParams } from 'react-router-dom'
import UserForm from '../../../../../shared/components/userForm/UserForm'
import { useUserFindById } from "../../hooks/useUserFindById"
import { useUserUpdate } from "../../hooks/useUserUpdate";
import { useEffect } from "react";

export default function UserUpdate() {

    const { error: findError, loading: findLoading, user, handleUserFindById } = useUserFindById();
    const { error: updateError, loading: updateLoading, handleUserUpdate } = useUserUpdate();

    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        if (id) {
            handleUserFindById(Number(id));
        }
    }, [id])


    return (

        <UserForm
            mode="admin-update"
            initialData={user}
            onSubmit={(data) => handleUserUpdate(Number(id), data)}
        />

    )
}
