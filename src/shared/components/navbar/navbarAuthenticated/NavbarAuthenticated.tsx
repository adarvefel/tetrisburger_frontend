import React, { useState } from 'react'
import "./navbarAuthenticated.css"
import colombiaBandera from "./../../../../assets/bandera-colombia.png"
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from 'react-router-dom'
import { FiShoppingCart } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useAuthStore } from '../../../store/useAuthStore';
import IconTetris from '../../iconTetris/IconTetris';
import { IoMenuOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";

export default function NavbarAuthenticated() {

    const { user } = useAuthStore();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className='navbarAuthenticated__nav'>

            <div className="navbarAuthenticated__container-left">
                <IconTetris />

                {/* Links del menú */}
                <div className={`navbarAuthenticated__container-links ${menuOpen ? 'active' : ''}`}>
                    <ul className='navbarAuthenticated__ul'>
                        <li className='navbarAuthenticated__li'><Link className='navbarAuthenticated__link' to={"/"}>INICIO</Link></li>
                        <li className='navbarAuthenticated__li'><Link className='navbarAuthenticated__link' to={"/menu"}>MENU</Link></li>
                      
                        <li className='navbarAuthenticated__li'><Link className='navbarAuthenticated__link' to={"/contact-us"}>CONTACTANOS</Link></li>
                    </ul>
                </div>
            </div>

            <div className="navbarAuthenticated__container-right">

                <Link to={"/profile"} className='navbarAuthenticated__link-profile'>
                    <FaUserCircle size={33} color='#fff' />
                    <p className='navbarAuthenticated__p-user'>{user?.userName}</p>
                </Link>

                <Link className='navbarAuthenticated__link-car' to={"/carrito"}><FiShoppingCart size={29} /></Link>

                <div className="navbarAuthenticated__container-lenguaje">
                    <button className='navbarAuthenticated__button-lenguaje'>
                        <img className='navbarAuthenticated__img-colombia' src={colombiaBandera} alt="" />
                        <p className='navbarAuthenticated__p'>ES</p>
                        <IoMdArrowDropdown size={27} />
                    </button>
                </div>

                {/* HAMBURGER MENU */}
                <div className="navbarAuthenticated__container-hamburger">
                    <button className='navbarAuthenticated__button-hamburger' onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <AiOutlineClose size={33} /> : <IoMenuOutline size={35} />}
                    </button>
                </div>
            </div>
        </nav>
    )
}
