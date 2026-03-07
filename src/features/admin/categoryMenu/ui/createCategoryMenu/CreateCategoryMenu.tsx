import React from 'react'
import "./createCategoryMenu.css"
import useCreateCategoryMenu from '../../hooks/useCreateCategoryMenu'
import CategoryMenuForm from '../../../../../shared/components/formsCruds/categoryMenuForm/CategoryMenuForm';

export default function CreateCategoryMenu() {

    const {handleCreateCategoryMenu} = useCreateCategoryMenu();

    return (
        <CategoryMenuForm mode='admin-create' onSubmit={handleCreateCategoryMenu} />
    )
}
