import React from 'react'
import videoHeroSection from "./../../../../assets/videoHeroSection.mp4"
import "./heroSection.css"
import ButtonHome from '../../../../shared/components/buttonHome/ButtonHome'

export default function HeroSection() {
  return (
    <section className='heroSection__section'>
        <video className='heroSection__video' src={videoHeroSection} autoPlay loop muted></video>

        <div className="heroSection__container-contenido">
          <div className="heroSection__container-texto">
              <p className='heroSection__p'>¡Arma tu burger, juega con el sabor! En Tetris Burger, cada ingrediente encaja a la perfección. Crea, combina y disfruta la hamburguesa que tú quieras.</p>
          </div>
          <div className="heroSection__container-button">
              <ButtonHome linkRedireccion='/ordenar' textoButton='Ordena ya mismo'/>
          </div>
        </div>
    </section> 
  )
}
