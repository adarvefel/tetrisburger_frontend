import React, { useState } from 'react'
import "./pqrsCreate.css"
import { usePqrsCreate } from '../../hooks/usePqrsCreate'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function PqrsCreate() {

    const navegator = useNavigate();

    const { loading, error, handlePqrsCreate } = usePqrsCreate();

    const [pqrs, setPqrs] = useState({
        type: "",
        subject: "",
        description: ""
    })

    const { type, subject, description } = pqrs;

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setPqrs({ ...pqrs, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        try {
            const response = await handlePqrsCreate(pqrs);

            if (response.status === 201) {
                toast.success("PQRS enviada correctamente ");
                navegator("/pqrs-me");
            }
        } catch (err: any) {
            toast.error(
                err?.response?.data?.message ||
                "Ocurrió un error al enviar la PQRS "
            );

        }


    }



    return (
        <form className='pqrsCreate__form' onSubmit={onSubmit}>



            <div className="pqrsCreate__container-inputs">
                <h1 className='pqrsCreate__h1'>PQRS formulario de envio</h1>
                <p className='pqrsCreate__p'>Por favor, utiliza un lenguaje respetuoso y proporciona la mayor cantidad de información posible.</p>
            </div>

            <div className="pqrsCreate__container-inputs">
                <label className='pqrsCreate__label'>Tipo de solicitud</label>
                <select className='pqrsCreate__select' name="type" onChange={onInputChange} value={type}>
                    <option className='pqrsCreate__option' value="">Seleccione el tipo de solicitud</option>
                    <option className='pqrsCreate__option' value="PETITION">Peticion</option>
                    <option className='pqrsCreate__option' value="COMPLAINT">Queja</option>
                    <option className='pqrsCreate__option' value="CLAIM">Reclamo</option>
                    <option className='pqrsCreate__option' value="SUGGESTION">Sugerencia</option>
                    <option className='pqrsCreate__option' value="REPORT">Denuncia</option>
                    <option className='pqrsCreate__option' value="CONGRATULATIONS">Felicitaciones</option>
                </select>
            </div>


            <div className="pqrsCreate__container-inputs">
                <label className='pqrsCreate__label'>Asunto</label>
                <input name='subject' className='pqrsCreate__input' type="text" placeholder='Asunto principal.' required onChange={onInputChange} value={subject} />
            </div>



            <div className="pqrsCreate__container-inputs">
                <label className='pqrsCreate__label'>Descripcion</label>
                <textarea className='pqrsCreate__textarea' name="description" placeholder=' Escribe aquí los detalles de tu solicitud...' required onChange={onInputChange} value={description}></textarea>

            </div>

            <div className="pqrsCreate__container-button">
                <button className='pqrsCreate__button' disabled={loading} >{loading ? "CARGANDO" : "Enviar PQRS"}</button>
            </div>





        </form>
    )
}
