import React from 'react'
import "./navbarNotAuthenticated.css"
import iconoOficial from "./../../../../assets/iconoOficial.png"
import colombiaBandera from "./../../../../assets/bandera-colombia.png"
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from 'react-router-dom'
import ButtonHome from '../../../components/buttonHome/ButtonHome';
import { FiShoppingCart } from "react-icons/fi";
import IconTetris from '../../iconTetris/IconTetris';

export default function NavbarNotAuthenticated() {
    return (
        <nav className='navbarNotAuthenticated__nav'>

            <div className="navbarNotAuthenticated__container-left">
                <IconTetris/>

                <div className="navbarNotAuthenticated__container-links">
                    <ul className='navbarNotAuthenticated__ul'>
                        <li className='navbarNotAuthenticated__li'><Link className='navbarNotAuthenticated__link' to={"/"}>INICIO</Link></li>
                        <li className='navbarNotAuthenticated__li'><Link className='navbarNotAuthenticated__link' to={"/menu"}>MENU</Link></li>
                        <li className='navbarNotAuthenticated__li'><Link className='navbarNotAuthenticated__link' to={"/promociones"}>PROMOCIONES</Link></li>
                        <li className='navbarNotAuthenticated__li'><Link className='navbarNotAuthenticated__link' to={"/contactanos"}>CONTACTANOS</Link></li>
                    </ul>
                </div>
            </div>

            <div className="navbarNotAuthenticated__container-right">
                <Link className='navbarNotAuthenticated__link-login' to={"/login"}>Iniciar sesión</Link>
                <ButtonHome linkRedireccion='/register' textoButton='Registrarse' />
                <Link className='navbarNotAuthenticated__link-car' to={"/carrito"}><FiShoppingCart  size={29}/></Link>
                <div className="navbarNotAuthenticated__container-lenguaje">
                    <button className='navbarNotAuthenticated__button-lenguaje'>
                        <img className='navbarNotAuthenticated__img-colombia' src={colombiaBandera} alt="" />
                        <p className='navbarNotAuthenticated__p'>ES</p>
                        <IoMdArrowDropdown size={27} />
                    </button>
                </div>
            </div>

        </nav>
    )
}
