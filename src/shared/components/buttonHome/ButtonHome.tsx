import React from 'react'
import "./buttonHome.css"
import { Link } from 'react-router-dom'

interface Props {
    textoButton: string,
    linkRedireccion: string
}

export default function ButtonHome(props: Props) {

    const {textoButton, linkRedireccion} = props;

    return (
        <Link className='buttonHome__link' to={linkRedireccion}>{textoButton}</Link>
    )
}
