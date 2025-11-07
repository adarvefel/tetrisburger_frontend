import React, { useState } from 'react'
import "./resetPasswordForm.css"
import TituloForm from '../../../../shared/components/formAuth/tituloForm/TituloForm'
import InputForm from '../../../../shared/components/formAuth/inputForm/InputForm'
import ButtonSubmit from '../../../../shared/components/formAuth/buttonSubmit/ButtonSubmit'
import { useResetPassword } from '../../hooks/useResetPassword'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ErrorAlert } from '../../../../shared/components/alerts/errorAlert/ErrorAlert'
import SuccessAlert from '../../../../shared/components/alerts/successAlert/SuccessAlert'

export default function ResetPasswordForm() {

    const { loading, error, resetPassword } = useResetPassword();

    const [searchParms] = useSearchParams();
    const token = searchParms.get("token") || "";

    const navegador = useNavigate();

    const [alertaError, setAlertaError] = useState<string | null>(null);
    const [alertaSuccess, setAlertaSuccess] = useState<string | null>(null);

    const onCloseAlertError = () => {
        setAlertaError(null);
    }

    const onCloseAlertSuccess = () => {
        setAlertaSuccess(null);
    }

    const [nuevaPassword, setNuevaPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();



        if (nuevaPassword != confirmarPassword) {

            setAlertaError("Las contraseñas no coinciden.");

            return;
        }

        if (nuevaPassword.length < 8) {

            setAlertaError("La contraseña debe tener al menos 8 digitos.");

            return;
        }

        const respuesta = await resetPassword(token, nuevaPassword);

        if (respuesta?.status === 200) {

            setAlertaSuccess("La contraseña se cambio con exito.")


        }
        else {

            setAlertaError("El link expiro.");


            return;

        }

        setTimeout(() => {
            setNuevaPassword("");
            setConfirmarPassword("");
            navegador("/login");

        }, 2000)


    }


    return (
        <form onSubmit={onSubmit} className='resetPasswordForm__form' action="">

            {alertaError && <ErrorAlert onClosed={onCloseAlertError} mensaje={alertaError} />}
            {alertaSuccess && <SuccessAlert onClosed={onCloseAlertSuccess} mensaje={alertaSuccess} />}

            <div className="resetPasswordForm__titulo"><TituloForm textTitulo='Cambia tu contraseña' /></div>

            <div className="resetPasswordForm__texto">
                <p className='resetPasswordForm__pTextp'>Restablece tu contraseña, y vuelve a escribirla para confirmar para poder acceder a tu cuenta</p>
            </div>

            <div className="resetPasswordForm__inputs">
                <label className='resetPasswordForm__label' htmlFor="">Contraseña nueva</label>

                <InputForm name='nuevaPassword' type='password' required placeholder='ingresa tu nueva contraseña' onChange={(e) => setNuevaPassword(e.target.value)} value={nuevaPassword} />

                <label className='resetPasswordForm__label' htmlFor="">Confirmar contraseña</label>

                <InputForm name='confirmarPassword' type='password' required placeholder='confirma tu nueva contraseña' onChange={(e) => setConfirmarPassword(e.target.value)} value={confirmarPassword} />
            </div>

            <div className="resetPasswordForm__buttonSubmit">
                {error && <p className='resetPasswordForm__p'>{error}</p>}
                <ButtonSubmit textButton={loading ? "Enviando..." : "Cambiar contraseña"} />
            </div>

        </form>
    )
}
