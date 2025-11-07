import React from 'react'
import "./buttonLogout.css"
import { CgLogOut } from "react-icons/cg";
import { useAuthStore } from '../../store/useAuthStore';

export default function ButtonLogout() {

    const {logout, isAdmin} = useAuthStore();

    return (
        <button className='buttonLogout__button' onClick={logout} type='button'>
            <CgLogOut size={18} />Cerrar sesion
        </button>
    )
}
