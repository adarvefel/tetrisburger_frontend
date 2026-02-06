import React from 'react'
import "./contactUsPage.css"
import Navbar from '../../shared/components/navbar/Navbar'
import Footer from '../../shared/components/footer/Footer'
import peopleSupport from "./../../assets/peopleSupport.png"
import { FiPhoneCall } from "react-icons/fi"
import { MdOutlineWhatsapp, MdOutlineEmail } from "react-icons/md"

export default function ContactUsPage() {
  return (
    <div className="contactUsPage__container-global">
      <Navbar />

      <div className="contactUsPage__container-img">
        <img
          className='contactUsPage__img'
          src={peopleSupport}
          alt="Soporte al cliente"
        />
        <h1 className='contactUsPage__h1'>Contactanos</h1>
      </div>

      <div className="contactUsPage__content">

        <div className="contactUsPage__container-card">
          <FiPhoneCall className="contactUsPage__icon" />
          <div className="contactUsPage__container-text">
            <h2 className='contactUsPage__h2'>Línea directa</h2>
            <p className='contactUsPage__p'>018000 94 94 00</p>
            <p className='contactUsPage__p'>
              Lun a Vie 09:00 - 18:00 (sólo español)
            </p>
          </div>
        </div>

        <div className="contactUsPage__container-card">
          <MdOutlineWhatsapp className="contactUsPage__icon" />
          <div className="contactUsPage__container-text">
            <h2 className='contactUsPage__h2'>WhatsApp</h2>
            <p className='contactUsPage__p'>
              +57 3011153663
            </p>
            <p className='contactUsPage__p'>
              Atención en español de lunes a viernes de 9 am a 6 pm
            </p>
            <p className='contactUsPage__p'>
              Soporte para inconvenientes con el aplicativo
            </p>
          </div>
        </div>

        <div className="contactUsPage__container-card">
          <MdOutlineEmail className="contactUsPage__icon" />
          <div className="contactUsPage__container-text">
            <h2 className='contactUsPage__h2'>Correo electrónico</h2>
            <p className='contactUsPage__p'>
              tetrisburger8@gmail.com
            </p>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}
