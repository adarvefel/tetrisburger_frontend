import React from 'react'
import aboutSectioImg from "./../../../../assets/aboutSection.png"
import "./aboutSection.css"

export default function AboutSection() {
  return (
    <section className='aboutSection__section'>
        <h3 className='aboutSection__h3'>¿QUIENES SOMOS EN TETRISBURGER?</h3>
        <div className="aboutSection__container-about">
            <div className="aboutSection__container-img">
                <img className='aboutSection__img' src={aboutSectioImg} alt="" />
            </div>
            <div className="aboutSection__container-texto">
                <p className='aboutSection__p-somos'>SOMOS</p>
                <p className='aboutSection__p'>Somos Tetris Burger, un grupo de desarrolladores de software apasionados por la tecnología. Creamos proyectos innovadores para demostrar nuestras habilidades técnicas y creativas, aplicando metodologías ágiles y tecnologías modernas.</p>
                <p className='aboutSection__p-meta'>Nuestra meta:</p>
                <p className='aboutSection__p'>construir soluciones funcionales y únicas que reflejen nuestra pasión por el desarrollo.</p>
            </div>
        </div>
    </section>
  )
}
