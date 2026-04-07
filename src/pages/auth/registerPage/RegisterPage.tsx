import React from 'react'
import RegisterForm from '../../../features/auth/ui/registerForm/RegisterForm'
import "./registerPage.css"
import burgerRegister from "../../../assets/burgerRegister.png"
import burgerIcono from "../../../assets/iconoBURGER.webp"

export default function RegisterPage() {
  return (
    <div className="registerPage">
      <div className="registerPage__container">

        <img className='registerPage__icono' src={burgerIcono} alt="" />

        <div className="registerPage__imagen">

          <img className='registerPage__img' src={burgerRegister} alt="" />

        </div>

        <div className="registerPage__contenido">
          <RegisterForm/>
        </div>
      </div>
    </div>
  )
}
