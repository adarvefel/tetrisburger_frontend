import React from 'react'
import imagenUno from "./../../../../assets/extraGallerySection/img1.jpg"
import imagenDos from "./../../../../assets/extraGallerySection/img2.jpg"
import imagenTres from "./../../../../assets/extraGallerySection/img3.jpg"
import imagenCuatro from "./../../../../assets/extraGallerySection/img4.jpg"
import imagenCinco from "./../../../../assets/extraGallerySection/img5.jpg"
import "./extraGallerySection.css"

export default function ExtraGallerySection() {

    let imagenes = [imagenUno, imagenDos, imagenTres, imagenCuatro, imagenCinco];

    return (
        <section className='extraGallerySection__section'>

            <div className="extraGallerySection__container-h3">
                <div className="extraGallerySection__h3">EXPERIENCIA TETRISBURGER</div>
            </div>


            <div className="extraGallerySection__container-imagenes">
                {
                    imagenes.map((imagen, index)=>(
                        <div key={index} className="extraGallerySection__container-img">
                            <img className='extraGallerySection__img' src={imagen} alt="" />
                        </div>
                    ))
                }
            </div>

        </section>
    )
}
