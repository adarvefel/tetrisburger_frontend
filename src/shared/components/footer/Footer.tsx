import React from 'react'
import iconoOficial from "./../../../assets/iconoOficial.png"
import { RiInstagramFill } from "react-icons/ri";
import { AiFillTikTok } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import "./footer.css"
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className='footer__footer'>
            <div className="footer__container-columnas">
                <div className="footer__columna-uno">
                    <img className='footer__img-icono' src={iconoOficial} alt="" />

                    <div className="footer__container-social">
                        <a className='footer__a' href="https://instagram.com"><RiInstagramFill size={33} /></a>
                        <a className='footer__a' href="https://tiktok.com"><AiFillTikTok size={33} /></a>
                        <a className='footer__a' href="https://facebook.com"><FaFacebook size={33} /></a>
                    </div>

                </div>
                <div className="footer__columna-dos">
                    <p className='footer__p'>Menu</p>
                    <Link className='footer__link' to={"/hamburguesas"}>hamburguesas</Link>
                    <Link className='footer__link' to={"/crear-hamburguesas"}>Crea tu hamburguesas</Link>
                    <Link className='footer__link' to={"/adiciones"}>Adiciones</Link>
                    <Link className='footer__link' to={"/acompañantes"}>Acompañantes</Link>
                </div>
                <div className="footer__columna-tres">
                    <p className='footer__p'>Sobre tetrisburger</p>
                    <Link className='footer__link' to={"/quienes-somos"}>¿Quienes somos?</Link>
                    <Link className='footer__link' to={"/preguntas-frecuentes"}>Preguntas frecuentes</Link>
                    <Link className='footer__link' to={"/contactanos"}>Contactanos</Link>
                    <Link className='footer__link' to={"/pqrs"}>PQRS</Link>
                </div>
            </div>

            <p className='footer__p-copy'>Copyright © TetrisBurguer. Todos los derechos reservados.</p>
        </footer>
    )
}
