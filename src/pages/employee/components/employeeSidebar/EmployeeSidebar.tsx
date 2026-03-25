import React, { useState } from 'react'
import "./employeeSidebar.css"
import IconTetris from '../../../../shared/components/iconTetris/IconTetris'
import { useAuthStore } from '../../../../shared/store/useAuthStore'
import ButtonLogout from '../../../../shared/components/buttonLogout/ButtonLogout';
import { NavLink } from 'react-router-dom';
import { IoMenuOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { GrNotes } from "react-icons/gr";
import { CiSettings } from "react-icons/ci";



export default function EmployeeSidebar() {

    const { user } = useAuthStore();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <aside className="employeeSidebar__aside">

            <div className="employeeSidebar__container-top">
                <IconTetris />
                <div className="employeeSidebar__container-texto-top">
                    <h3 className='employeeSidebar__h3'>Empleado Panel</h3>
                    <p className='employeeSidebar__p-email'>{user?.email ? user.email : "Desconocido."}</p>
                </div>
            </div>

            <div className={`employeeSidebar__container-medium ${menuOpen ? 'active' : ''}`}>

                <NavLink to={"/employee/orders-list"}
                    className={({ isActive }) =>
                        `employeeSidebar__container-option ${isActive ? "active" : ""}`
                    } >
                    <GrNotes size={21} />
                    <span className='employeeSidebar__span'>Ordenes</span>
                </NavLink>

            </div>

            <div className="employeeSidebar__container-settings">
                <NavLink to={"/employee/configurations-list"}
                    className={({ isActive }) =>
                        `employeeSidebar__container-option ${isActive ? "active" : ""}`
                    } >
                    <CiSettings size={19} />
                    <span className='employeeSidebar__span'>Configuraciones</span>
                </NavLink>
            </div>

            <div className="employeeSidebar__container-bottom">

                <div className="employeeSidebar__container-logout">
                    <ButtonLogout />
                </div>


            </div>

            {/* HAMBURGER MENU */}
            <div className="employeeSidebar__container-hamburger">
                <button className='employeeSidebar__button-hamburger' onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <AiOutlineClose size={33} /> : <IoMenuOutline size={35} />}
                </button>
            </div>

        </aside>
    )
}
