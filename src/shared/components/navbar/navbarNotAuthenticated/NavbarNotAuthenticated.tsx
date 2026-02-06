import React, { useState } from 'react'
import "./navbarNotAuthenticated.css"
import iconoOficial from "./../../../../assets/iconoOficial.png"
import colombiaBandera from "./../../../../assets/bandera-colombia.png"
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from 'react-router-dom'
import ButtonHome from '../../../components/buttonHome/ButtonHome';
import { FiShoppingCart } from "react-icons/fi";
import IconTetris from '../../iconTetris/IconTetris';
import { IoMenuOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";

export default function NavbarNotAuthenticated() {

    const [menuOpen, setMenuOpen] = useState(false);    



    return (
        <nav className='navbarNotAuthenticated__nav'>

            <div className="navbarNotAuthenticated__container-left">
                <IconTetris/>

                {/* Links del menú */}
                <div className={`navbarNotAuthenticated__container-links ${menuOpen ? 'active' : ''}`}>
                    <ul className='navbarNotAuthenticated__ul'>
                        <li className='navbarNotAuthenticated__li'><Link className='navbarNotAuthenticated__link' to={"/"}>INICIO</Link></li>
                        <li className='navbarNotAuthenticated__li'><Link className='navbarNotAuthenticated__link' to={"/menu"}>MENU</Link></li>
                        <li className='navbarNotAuthenticated__li'><Link className='navbarNotAuthenticated__link' to={"/promociones"}>PROMOCIONES</Link></li>
                        <li className='navbarNotAuthenticated__li'><Link className='navbarNotAuthenticated__link' to={"/contact-us"}>CONTACTANOS</Link></li>
                    </ul>
                </div>
                
            </div>

            <div className="navbarNotAuthenticated__container-right">
                <Link className='navbarNotAuthenticated__link-login' to={"/login"}>Iniciar sesión</Link>
                <ButtonHome linkRedireccion='/register' textoButton='Registrarse' />
                <Link className='navbarNotAuthenticated__link-car' to={"/carrito"}><FiShoppingCart /></Link>
                <div className="navbarNotAuthenticated__container-lenguaje">
                    <button className='navbarNotAuthenticated__button-lenguaje'>
                        <img className='navbarNotAuthenticated__img-colombia' src={colombiaBandera} alt="" />
                        <p className='navbarNotAuthenticated__p'>ES</p>
                        <IoMdArrowDropdown className='navbarNotAuthenticated__arrow' size={27} />
                    </button>
                </div>

                <div className="navbarNotAuthenticated__container-hamburger">
                    <button id='idBurgerMenu' className='navbarNotAuthenticated__button-hamburger' onClick={(()=>setMenuOpen(!menuOpen))}>
                        {menuOpen ? <AiOutlineClose size={33} /> : <IoMenuOutline size={35}/>} 
                    </button>
                </div>

            </div>

        </nav>
    )
}
