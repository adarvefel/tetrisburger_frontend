import React from 'react'
import menuSection from "./../../../../assets/optionsSection/menuSection.png"
import armarSecion from "./../../../../assets/optionsSection/armarSection.png"
import acompananteSection from "./../../../../assets/optionsSection/acompañantesSection.png"
import adicionesSection from "./../../../../assets/optionsSection/adicionesSection.png"
import"./optionsSection.css"
import { Link } from 'react-router-dom'

export default function OptionsSection() {
  return (
    <section className='optionsSection__section'>

        <div className="optionsSection__container-options">
            
            <Link to={"/menu"} className="optionsSection__container-img">
                <img className='optionsSection__img' src={menuSection} alt="" />
                <p className='optionsSection__p'>MENU</p>
            </Link>

            <Link to={"/armar-hamburguesa"} className="optionsSection__container-img">
                <img className='optionsSection__img' src={armarSecion} alt="" />
                <p className='optionsSection__p'>ARMAR HAMBUGUESA</p>
            </Link>

            <Link to={"/acompanantes"} className="optionsSection__container-img">
                <img className='optionsSection__img' src={acompananteSection} alt="" />
                <p className='optionsSection__p'>ACOMPAÑANTES</p>
            </Link>
            
            <Link to={"/adiciones"} className="optionsSection__container-img">
                <img className='optionsSection__img' src={adicionesSection} alt="" />
                <p className='optionsSection__p'>ADICIONES</p>
            </Link>


        </div>

    </section>
  )
}
