import React from 'react'
import "./createCategoryMenu.css"
import useCreateCategoryMenu from '../../hooks/useCreateCategoryMenu'

export default function CreateCategoryMenu() {

    const {handleCreateCategoryMenu} = useCreateCategoryMenu();

    return (
        <div>CreateCategoryMenu</div>
    )
}
