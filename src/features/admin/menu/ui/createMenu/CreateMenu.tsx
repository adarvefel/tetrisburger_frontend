import React from 'react'
import useCreateMenu from '../../hooks/useCreateMenu'
import MenuForm from '../../../../../shared/components/formsCruds/menuForm/MenuForm';

export default function CreateMenu() {

    const {loading, handleCreateMenu} = useCreateMenu();

    return (
        <MenuForm mode='admin-create' onSubmit={handleCreateMenu} loading={loading}/>
    )
}
