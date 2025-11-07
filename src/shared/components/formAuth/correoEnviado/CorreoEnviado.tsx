import React from 'react'
import { MdMarkEmailRead } from "react-icons/md";
import "./correoEnviado.css"

interface Props {
    correo: string
}

export default function CorreoEnviado(props: Props) {

    const { correo } = props;
    return (
        <div className="correoEnviado__container">
            <div className="correoEnviado__icono">
                <MdMarkEmailRead size={40} />
            </div>
            <div className="correoEnviado__texto">
                <p className='correoEnviado__p'>Link de recuperacion de contraseña enviado al correo: <br />
                <strong className='correoEnviado__stronh'>{correo}</strong></p>
            </div>
        </div>
    )
}
