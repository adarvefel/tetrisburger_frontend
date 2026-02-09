import React, { useState } from 'react'
import "./pqrsCreate.css"
import { usePqrsCreate } from '../../hooks/usePqrsCreate'
import { ErrorAlert } from '../../../../../shared/components/alerts/errorAlert/ErrorAlert';
import SuccessAlert from '../../../../../shared/components/alerts/successAlert/SuccessAlert';
import { useNavigate } from 'react-router-dom';

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
                setAlertSuccess("PQRS enviada correctamente ");
                setAlertError(null);




                setTimeout(() => {
                    setPqrs({
                        type: "",
                        subject: "",
                        description: ""
                    });

                    navegator("/pqrs-me");
                }, 2000);

            }
        } catch (err: any) {
            setAlertError(
                err?.response?.data?.message ||
                "Ocurrió un error al enviar la PQRS "
            );
            setAlertSuccess(null);
        }


    }

    const [alertError, setAlertError] = useState<string | null>(null);
    const [alertSuccess, setAlertSuccess] = useState<string | null>(null);

    const onCloseAlertSucces = () => {
        setAlertSuccess(null);
    }

    const onCloseAlertError = () => {
        setAlertError(null);
    }

    return (
        <form className='pqrsCreate__form' onSubmit={onSubmit}>

            {alertError ? <ErrorAlert mensaje={alertError} onClosed={onCloseAlertError} /> : null}
            {alertSuccess ? <SuccessAlert mensaje={alertSuccess} onClosed={onCloseAlertSucces} /> : null}

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
