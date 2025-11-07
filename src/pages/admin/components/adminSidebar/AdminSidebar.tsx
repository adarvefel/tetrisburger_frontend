import React from 'react'
import "./adminSidebar.css"
import IconTetris from '../../../../shared/components/iconTetris/IconTetris'
import { useAuthStore } from '../../../../shared/store/useAuthStore'
import ButtonLogout from '../../../../shared/components/buttonLogout/ButtonLogout';
import { NavLink } from 'react-router-dom';
import { FaUsers, FaBoxOpen, FaHamburger, FaEnvelopeOpenText } from "react-icons/fa"

export default function AdminSidebar() {

  const { user } = useAuthStore();

  return (
    <aside className="adminSidebar__aside">

      <div className="adminSidebar__container-top">
        <IconTetris />
        <div className="adminSidebar__container-texto-top">
          <h3 className='adminSidebar__h3'>Admin Panel</h3>
          <p className='adminSidebar__p-email'>{user?.email ? user.email : "Desconocido."}</p>
        </div>
      </div>

      <div className="adminSidebar__container-medium">

        <NavLink to={"/admin/users-list"}
          className={({ isActive }) =>
            `adminSidebar__container-option ${isActive ? "active" : ""}`
          } >
          <FaUsers size={21} />
          <span className='adminSidebar__span'>Usuarios</span>
        </NavLink>


        <NavLink to={"/products-list"}
          className={({ isActive }) =>
            `adminSidebar__container-option ${isActive ? "active" : ""}`
          } >
          <FaBoxOpen size={21} />
          <span className='adminSidebar__span'>Productos</span>
        </NavLink>


        <NavLink to={"/menu-list"}
          className={({ isActive }) =>
            `adminSidebar__container-option ${isActive ? "active" : ""}`
          } >
          <FaHamburger size={19} />
          <span className='adminSidebar__span'>Menu</span>
        </NavLink>


        <NavLink to={"/pqrs-list"}
          className={({ isActive }) =>
            `adminSidebar__container-option ${isActive ? "active" : ""}`
          } >
          <FaEnvelopeOpenText size={19} />
          <span className='adminSidebar__span'>PQRS</span>
        </NavLink>




      </div>

      <div className="adminSidebar__container-bottom">

        <div className="adminSidebar__container-logout">
          <ButtonLogout />
        </div>


      </div>

    </aside>
  )
}
