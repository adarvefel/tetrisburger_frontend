import React, { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import TituloForm from '../../../../shared/components/formAuth/tituloForm/TituloForm'
import "./loginForm.css"
import InputForm from '../../../../shared/components/formAuth/inputForm/InputForm'
import ButtonGmail from '../../../../shared/components/formAuth/buttonSocial/buttonGmail/ButtonGmail'
import ButtonSubmit from '../../../../shared/components/formAuth/buttonSubmit/ButtonSubmit'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useCartStore } from '../../../../shared/store/useCartStore'

export default function LoginForm() {

    const { loading, error, handleLogin } = useLogin()
    const navigate = useNavigate()
    const location = useLocation()

    const { saveCart } = useCartStore()

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const { email, password } = form

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const respuesta = await handleLogin(email, password)

        if (respuesta?.token) {

            // 🔥 Merge carrito local → backend
            const localCart = JSON.parse(localStorage.getItem("cart") || "[]")

            if (localCart.length > 0) {
                useCartStore.setState({ items: localCart })
                saveCart(localCart)
            }

            toast.success("Login exitoso.")

            // 🔁 Redirección inteligente
            const from = (location.state as { from?: string })?.from ?? "/"
            navigate(from, { replace: true })
        }
    }

    return (
        <form onSubmit={onSubmit} className='loginForm__form'>

            <div className="loginForm__titulo">
                <TituloForm textTitulo='LOGIN' />
            </div>

            <div className="loginForm__inputs">
                <InputForm name='email' required type='email' onChange={onInputChange} value={email} placeholder='CORREO' />
                <InputForm name='password' required type='password' onChange={onInputChange} value={password} placeholder='CONTRASEÑA' />
            </div>

            <div className="loginForm__links">
                <div className="loginForm__olvidoPassword">
                    <Link className='loginForm__a' to="/forgot-password">¿Olvidaste tu contraseña?</Link>
                </div>
                <div className="loginForm__yaTieneCuenta">
                    <Link className='loginForm__a' to="/register">¿Aun no tienes una cuenta?</Link>
                </div>
            </div>

            <div className="loginForm__social">
                <ButtonGmail />
            </div>

            <div className="loginForm__separator">
                <span>or</span>
            </div>

            <div className="loginForm__buttonSubmit">
                {error && <p className='loginForm__p'>{error}</p>}
                <ButtonSubmit
                    disabled={loading}
                    textButton={"INICIAR SESION"}
                    loading={loading}
                />
            </div>

        </form>
    )
}