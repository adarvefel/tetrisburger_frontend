import React from 'react'
import "./layaoutLogin.css"
import burgerGrande from "../../../../assets/burgerGRANDE.jpg"
import InputForm from '../inputForm/InputForm'
import ButtonFacebook from '../buttonSocial/buttonFacebook/ButtonFacebook'
import ButtonGmail from '../buttonSocial/buttonGmail/ButtonGmail'
import ButtonSubmit from '../buttonSubmit/ButtonSubmit'
import iconoBurger from "../../../../assets/iconoBURGER.webp"
import TituloForm from '../tituloForm/TituloForm'

export default function LayaoutLogin() {
    return (
        <div className="layaoutLogin">
            <div className="layaoutLogin__container">
                <img className='layaoutLogin__icono' src={iconoBurger}></img>
                <form className="layaoutLogin__form">
                    <div className='layaoutLogin__h1'>
                        <TituloForm textTitulo='LOGIN' />
                    </div>
                    <div className="layaoutLogin__inputs">
                        <InputForm placeholder='CORREO' type='email' />
                        <InputForm placeholder='PASSWORD' type='password' />
                    </div>
                    <div className="layaoutLogin__links">
                        <div className="layaoutLogin__olvidarPassword">
                            <a className='layaoutLogin__a' href="">¿Olvidaste tu contraseña?</a>
                        </div>
                        <div className="layaoutLogin__yaTieneCuenta">
                            <a className='layaoutLogin__a' href="">¿Aun no tienes una cuenta?</a>
                        </div>
                    </div>

                    

                    <div className="layaoutLogin__social">
                        <ButtonGmail />
                    </div>

                    <div className="layaoutLogin__separator">
                        <span>or</span>
                    </div>

                    <div className="layaoutLogin__buttonSubmit">
                        <ButtonSubmit textButton='INICIAR SESION' type='submit' />
                    </div>
                    

                </form>
                <div className="layaoutLogin__imagen">
                    <img className='layaoutLogin__img' src={burgerGrande} alt="" />
                </div>
            </div>
        </div>
    )
}
