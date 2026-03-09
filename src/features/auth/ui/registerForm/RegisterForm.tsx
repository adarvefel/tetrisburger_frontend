import React, { useState } from 'react'
import { useRegister } from '../../hooks/useRegister'
import { User } from '../../../../entities/user/model/types';
import "./registerForm.css"
import TituloForm from '../../../../shared/components/formAuth/tituloForm/TituloForm';
import InputForm from '../../../../shared/components/formAuth/inputForm/InputForm';
import ButtonGmail from '../../../../shared/components/formAuth/buttonSocial/buttonGmail/ButtonGmail';
import ButtonSubmit from '../../../../shared/components/formAuth/buttonSubmit/ButtonSubmit';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function RegisterForm() {

    const { error, loading, register } = useRegister();

    const navegador = useNavigate();

    const [form, setForm] = useState<User>({
        userName: "",
        email: "",
        password: "",
        role: "CLIENT"
    });

    const [confirmarPassword, setConfirmarPassword] = useState("");

    const { userName, email, password } = form;

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (password !== confirmarPassword) {
            toast.error("Las contraseñas no coinciden");
            return;
        }

        if (password.length < 8) {
            toast.error("La contrasña debe tener al menos 8 digitos");
            return;
        }

        const respuesta = await register(form);

        if (respuesta?.status === 201) {
            toast.success("Usuario registrado exitosamente.");
            setTimeout(() => {
                setForm({
                    userName: "",
                    email: "",
                    password: ""
                });
                setConfirmarPassword("");
                navegador("/login");
            }, 2000);

        }
        return;
    }

    return (
        <form className='registerForm__form' onSubmit={onSubmit} action="">
            

            <div className='registerForm__titulo'>
                <TituloForm textTitulo='REGISTRO' />
            </div>

            <div className="registerForm__inputs">
                <InputForm name='userName' placeholder='NOMBRE USUARIO' required onChange={onInputChange} value={userName} />
                <InputForm name='email' type='email' placeholder='CORREO' required onChange={onInputChange} value={email} />
                <InputForm name='password' type='password' placeholder='CONTRASEÑA' required onChange={onInputChange} value={password} />
                <InputForm name='confirmarPassword' type='password' placeholder='CONFIRMAR CONTRASEÑA' required onChange={(e) => setConfirmarPassword(e.target.value)} value={confirmarPassword} />
            </div>

            <div className="registerForm__links">
                <input className='registerForm__input' type="checkbox" required />
                <div className="registerForm__terminos">
                    <Link className='registerForm__a_terminos' to="/terms">Estas de acuerdo con los terminos y condiciones</Link>
                </div>
                <div className="registerForm__yaTieneCuenta">
                    <Link className='registerForm__a_yaTieneCuenta' to="/login" >¿Ya tienes cuenta?</Link>
                </div>
            </div>

            <div className="registerForm__social">
                <ButtonGmail />
            </div>

            <div className="registerForm__separator">
                <span>or</span>
            </div>

            <div className="registerForm__buttonSubmit">
                {error && <p className='registerForm__p'>{error}</p>}
                <ButtonSubmit disabled={loading} textButton={"REGISTRARSE"} loading={loading} />
            </div>
        </form>
    )
}
