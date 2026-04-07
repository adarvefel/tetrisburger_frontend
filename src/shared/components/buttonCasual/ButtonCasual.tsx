import React from 'react'
import { Link } from 'react-router-dom'
import "./buttonCasual.css"


interface Props {
    linkRedireccion: string;
    mensagge: string;
}



export default function ButtonCasual(props: Props) {

    const {linkRedireccion, mensagge} = props;

    return (
        <Link className='buttonCasual__link' to={linkRedireccion}>{mensagge}</Link>
    )
}
