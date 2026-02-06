import React from 'react'
import "./userCreate.css"
import { useUserCreate } from '../../hooks/useUserCreate'
import UserForm from '../../../../../shared/components/userForm/UserForm';

export default function UserCreate() {

    const {error, loading, handleUserCreate} = useUserCreate();
           
    return (
        <UserForm mode='create' onSubmit={handleUserCreate}/>
    )
}
