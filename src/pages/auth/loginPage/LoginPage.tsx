import React from 'react'
import LoginForm from '../../../features/auth/ui/loginForm/LoginForm'
import "./loginPage.css"
import burgerGrande from "../../../assets/burgerLogin.png"
import brugerIcono from "../../../assets/iconoBURGER.webp"
export default function LoginPage() {
  return (
    <div className="loginPage">
      
      <div className="loginPage__container">
        <img className='loginPage__imgIcono' src={brugerIcono} alt="" />
        <div className="loginPage__contenido">
          <LoginForm />
        </div>
        <div className="loginPage__imagen">
          <img className='loginPage__img' src={burgerGrande} alt="" />
        </div>
      </div>
    </div>
  )
}
