import React from 'react'
import "./pqrsForm.css"
import { FaCircleExclamation } from "react-icons/fa6";
import { FaClipboardUser } from "react-icons/fa6";
import { IoDocumentTextSharp } from "react-icons/io5";

export default function PqrsForm() {
  return (
    <form className='pqrsForm__form'>

      <div className="pqrsForm__container-top">

        <div className="pqrsForm__container-top-left">

          <div className="pqrsForm__container-tittle">
            <FaCircleExclamation color='blue' size={33} />
            <h2 className='pqrsForm__h2'>Informacion general</h2>
          </div>


          <div className="pqrsForm__container-fields-one">

            <div className="pqrsForm__container-inputs">
              <label className='pqrsForm__label'>ID PQRS</label>
              <input className='pqrsForm__input' />
            </div>

            <div className="pqrsForm__container-inputs">
              <label className='pqrsForm__label'>Type</label>
              <select className='pqrsForm__select'>

              </select >
            </div>

            <div className="pqrsForm__container-inputs">
              <label className='pqrsForm__label'>Status</label>
              <select className='pqrsForm__select'>

              </select >
            </div>

            <div className="pqrsForm__container-inputs">
              <label className='pqrsForm__label'>Priority</label>
              <select className='pqrsForm__select'>

              </select >
            </div>

          </div>


        </div>


        <div className="pqrsForm__container-top-right">

          <div className="pqrsForm__container-tittle">
            <FaClipboardUser color='blue' size={33} />
            <h2 className='pqrsForm__h2'>Responsable y respuesta</h2>
          </div>

          <div className="pqrsForm__container-fields-two">

            <div className="pqrsForm__container-inputs">
              <label className='pqrsForm__label'>Requestor ID</label>
              <input className='pqrsForm__input' />
            </div>

            <div className="pqrsForm__container-inputs">
              <label className='pqrsForm__label'>Asiggn ID</label>
              <input className='pqrsForm__input' />
            </div>

            <div id='pqrsForm__container-inputs2' className="pqrsForm__container-inputs">
              <label className='pqrsForm__label'>Oficial Response</label>
              <textarea className='pqrsForm__textarea'></textarea>
            </div>

          </div>

        </div>

      </div>

      <div className="pqrsForm__container-buttom">

        <div className="pqrsForm__container-tittle">
          <IoDocumentTextSharp color='blue' size={33} />
          <h2 className='pqrsForm__h2'>Contenido</h2>
        </div>

        <div className="pqrsForm__container-fields-three">

          <div id='pqrsForm__container-inputs2' className="pqrsForm__container-inputs">
            <label className='pqrsForm__label'>Subject</label>
            <input className='pqrsForm__input' />
          </div>

          <div id='pqrsForm__container-inputs2' className="pqrsForm__container-inputs">
            <label className='pqrsForm__label'>Description</label>
            <textarea id='pqrsForm__textarea-two' className='pqrsForm__textarea'></textarea>
          </div>

        </div>

      </div>

      <div className="pqrsForm__container-button">
        <button className='pqrsForm__button'>Guardar PQRS</button>
      </div>


    </form>
  )
}
