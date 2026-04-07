import React from 'react'
import iconoOficial from "./../../../assets/iconoOficial.png"
import "./iconTetris.css"
import { Link } from 'react-router-dom'

export default function IconTetris() {
    return (
        <Link className='iconTetris__container-img' to={"/"}>
            <img className='iconTetris__img' src={iconoOficial} alt="" />
        </Link>
  )
}
