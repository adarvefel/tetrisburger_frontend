import React from 'react'
import "./pqrsCreatePage.css"
import { Link } from 'react-router-dom'
import Navbar from '../../../../shared/components/navbar/Navbar'
import PqrsCreate from '../../../../features/user/pqrs/ui/pqrsCreate/PqrsCreate'
import Footer from '../../../../shared/components/footer/Footer'

export default function PqrsCreatePage() {
  return (
    <div className="pqrsCreatePage__container-global">
        <Navbar/>
        <div className="pqrsCreatePage__container-form">
            <Link className='pqrsCreatePage__link' to={"/pqrs-me"}>Ver mis PQRS</Link>
            <PqrsCreate/>
        </div>
        <Footer/>
    </div>
  )
}
