import React, { useState } from 'react'
import "./adminSidebar.css"
import IconTetris from '../../../../shared/components/iconTetris/IconTetris'
import { useAuthStore } from '../../../../shared/store/useAuthStore'
import ButtonLogout from '../../../../shared/components/buttonLogout/ButtonLogout';
import { NavLink } from 'react-router-dom';
import { FaUsers, FaBoxOpen, FaHamburger, FaEnvelopeOpenText, FaTags, FaStore } from "react-icons/fa"
import { IoMenuOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { IoFastFood } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { MdMenuBook } from "react-icons/md";

export default function AdminSidebar() {

  const { user } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <aside className="adminSidebar__aside">

      <div className="adminSidebar__container-top">
        <IconTetris />
        <div className="adminSidebar__container-texto-top">
          <h3 className='adminSidebar__h3'>Admin Panel</h3>
          <p className='adminSidebar__p-email'>{user?.email ? user.email : "Desconocido."}</p>
        </div>
      </div>

      <div className={`adminSidebar__container-medium ${menuOpen ? 'active' : ''}`}>

        <NavLink to={"/admin/users-list"}
          className={({ isActive }) =>
            `adminSidebar__container-option ${isActive ? "active" : ""}`
          } >
          <FaUsers size={21} />
          <span className='adminSidebar__span'>Usuarios</span>
        </NavLink>


        <NavLink to={"/admin/product-list"}
          className={({ isActive }) =>
            `adminSidebar__container-option ${isActive ? "active" : ""}`
          } >
          <FaBoxOpen size={21} />
          <span className='adminSidebar__span'>Productos</span>
        </NavLink>

        <NavLink to={"/admin/category-list"}
          className={({ isActive }) =>
            `adminSidebar__container-option ${isActive ? "active" : ""}`
          }>
          <FaTags size={21} />
          <span className='adminSidebar__span'>Categorías Productos</span>
        </NavLink>

        <NavLink to={"/admin/suppliers-list"}
          className={({ isActive }) =>
            `adminSidebar__container-option ${isActive ? "active" : ""}`
          }>
          <FaStore size={21} />
          <span className='adminSidebar__span'>Proveedores</span>
        </NavLink>

        <NavLink to={"/admin/burger-list"}
          className={({ isActive }) =>
            `adminSidebar__container-option ${isActive ? "active" : ""}`
          } >
          <FaHamburger size={19} />
          <span className='adminSidebar__span'>Hamburguesas</span>
        </NavLink>


        <NavLink to={"/admin/addition-list"}
          className={({ isActive }) =>
            `adminSidebar__container-option ${isActive ? "active" : ""}`
          } >
          <IoFastFood size={19} />
          <span className='adminSidebar__span'>Adiciones</span>
        </NavLink>

        <NavLink to={"/admin/category-menu-list"}
          className={({ isActive }) =>
            `adminSidebar__container-option ${isActive ? "active" : ""}`
          } >
          <BiSolidCategory size={19} />
          <span className='adminSidebar__span'>Categorias Menu</span>
        </NavLink>


        <NavLink to={"/admin/menu-list"}
          className={({ isActive }) =>
            `adminSidebar__container-option ${isActive ? "active" : ""}`
          } >
          <MdMenuBook  size={19} />
          <span className='adminSidebar__span'>Menu</span>
        </NavLink>

        <NavLink to={"/admin/pqrs-list"}
          className={({ isActive }) =>
            `adminSidebar__container-option ${isActive ? "active" : ""}`
          } >
          <FaEnvelopeOpenText size={19} />
          <span className='adminSidebar__span'>PQRS</span>
        </NavLink>











        <div className="adminSidebar__container-settings">
          <NavLink to={"/admin/sttings"}
            className={({ isActive }) =>
              `adminSidebar__container-option ${isActive ? "active" : ""}`
            } >
            <CiSettings size={19} />
            <span className='adminSidebar__span'>Configuraciones</span>
          </NavLink>
        </div>

      </div>

      <div className="adminSidebar__container-bottom">

        <div className="adminSidebar__container-logout">
          <ButtonLogout />
        </div>


      </div>

      {/* HAMBURGER MENU */}
      <div className="adminSidebar__container-hamburger">
        <button className='adminSidebar__button-hamburger' onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <AiOutlineClose size={33} /> : <IoMenuOutline size={35} />}
        </button>
      </div>

    </aside>
  )
}
