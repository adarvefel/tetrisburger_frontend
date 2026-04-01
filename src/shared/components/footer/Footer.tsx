import { RiInstagramFill } from "react-icons/ri";
import { AiFillTikTok } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import "./footer.css"
import { Link } from 'react-router-dom';
import IconTetris from '../iconTetris/IconTetris';

export default function Footer() {
    return (
        <footer className='footer__footer'>
            <div className="footer__container-columnas">
                <div className="footer__columna-uno">

                    <div className="footer__container-icon">
                        <IconTetris />
                    </div>

                    <div className="footer__container-social">
                        <a className='footer__a' href="https://instagram.com"><RiInstagramFill size={33} /></a>
                        <a className='footer__a' href="https://tiktok.com"><AiFillTikTok size={33} /></a>
                        <a className='footer__a' href="https://facebook.com"><FaFacebook size={33} /></a>
                    </div>

                </div>
                <div className="footer__columna-dos">
                    <p className='footer__p'>Menu</p>
                    <Link className='footer__link' to={"/products"}>hamburguesas</Link>
                    <Link className='footer__link' to="/products" state={{ initialFilter: "BURGERCUSTOM" }}>Crea tu hamburguesas</Link>
                    <Link className='footer__link' to="/products" state={{ initialFilter: "ADDITION" }}>Adiciones</Link>
                    <Link className='footer__link' to="/products" state={{ initialFilter: "SIDE" }}>Acompañantes</Link>
                </div>
                <div className="footer__columna-tres">
                    <p className='footer__p'>Sobre tetrisburger</p>
                    <Link className='footer__link' to={"/about"}>¿Quienes somos?</Link>
                    <Link className='footer__link' to={"/faq"}>Preguntas frecuentes</Link>
                    <Link className='footer__link' to={"/contact-us"}>Contactanos</Link>
                    <Link className='footer__link' to={"/pqrs-create"}>PQRS</Link>
                </div>
            </div>

            <p className='footer__p-copy'>Copyright © TetrisBurguer. Todos los derechos reservados.</p>
        </footer>
    )
}
