import React, { useEffect, useState } from 'react'
import imagenUno from "./../../../../assets/gallerySection/quesuda.png"
import imagenDos from "./../../../../assets/optionsSection/adicionesSection.png"
import imagenTres from "./../../../../assets/optionsSection/armarSection.png"
import imagenCuatro from "./../../../../assets/optionsSection/menuSection.png"
import imagenCinco from "./../../../../assets/optionsSection/acompañantesSection.png"
import "./gallerySection.css"
import ButtonHome from '../../../../shared/components/buttonHome/ButtonHome'

export default function GallerySection() {

    let imagenes = [imagenUno, imagenDos, imagenTres, imagenCuatro, imagenCinco];

    const [numeroImagen, setNumeroImagen] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {
            setNumeroImagen((numeroAnterior) => (numeroAnterior + 1) % imagenes.length)
        }, 3000);

        return () => clearInterval(interval);

    }, [imagenes.length])

    return (
        <section className='gallerySection__section'>

            <img className='gallerySection__img' src={imagenes[numeroImagen]} alt="" />

            <div className="gallerySection__container-contenido">

                <div className="gallerySection__container-texto">
                    <p className='gallerySection__p'>¡Arma tu burger, juega con el sabor! En Tetris Burger, cada ingrediente encaja a la perfección. Crea, combina y disfruta la hamburguesa que tú quieras.</p>
                </div>

                <div className="gallerySection__container-button">
                    <ButtonHome linkRedireccion='/ordenar' textoButton='Ordena ya' />
                </div>

                <div className="gallerySection__container-puntos">
                    {
                        imagenes.map((_, index) => (
                            <span key={index}
                                className={numeroImagen === index ? "gallerySection__span-activo" : "gallerySection__span"}
                                onClick={()=>{setNumeroImagen(index)}}
                            >
                                •
                            </span>
                        ))
                    }
                </div>
            </div>




        </section>
    )
}
