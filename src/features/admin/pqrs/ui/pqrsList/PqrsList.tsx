import React from "react";
import { FaArrowRight, FaArrowLeft, FaSearch } from "react-icons/fa";
import { GrDocumentText } from "react-icons/gr";
import { Link } from "react-router-dom";
import "./pqrsList.css";
import { usePqrsList } from "../../hooks/usePqrsList";

import { MdDeleteOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import ButtonCasual from "../../../../../shared/components/buttonCasual/ButtonCasual";

export default function PqrsList() {

    const {
        loading,
        error,
        pqrs,
        numberPage,
        totalPage,
        totalElements,
        nextPage,
        prevPage,
        setType,
        setStatus,
        setPriority
    } = usePqrsList();

    return (
        <div className="pqrsList__container-global">




            <div className="pqrsList__container-top">

                <div className="pqrsList__container-card">
                    <div className="pqrsList__container-card-sub">
                        <GrDocumentText color="black" size={44} />
                        <span className="pqrsList__elements">{totalElements}</span>
                    </div>
                    <span className="pqrsList__span">PQRS en total</span>
                </div>

                <div className="pqrsList__container-filters">
                    <select
                        className="pqrsList__filter"
                        onChange={(e) => setType(e.target.value || undefined)}
                    >
                        <option className="pqrsList__option" value="">Todos los tipos</option>
                        <option className="pqrsList__option" value="PETITION">Petición</option>
                        <option className="pqrsList__option" value="COMPLAINT">Queja</option>
                        <option className="pqrsList__option" value="CLAIM">Reclamo</option>
                        <option className="pqrsList__option" value="SUGGESTION">Sugerencia</option>
                        <option className="pqrsList__option" value="REPORT">Denuncia</option>
                        <option className="pqrsList__option" value="CONGRATULATIONS">Felicitaciones</option>
                    </select>

                    <select
                        className="pqrsList__filter"
                        onChange={(e) => setStatus(e.target.value || undefined)}
                    >
                        <option className="pqrsList__option" value="">Todos los estados</option>
                        <option className="pqrsList__option" value="RECEIVED">Recibido</option>
                        <option className="pqrsList__option" value="ANSWERED">Respondida</option>
                        <option className="pqrsList__option" value="ESCALATED">Escalado</option>
                        <option className="pqrsList__option" value="CLOSED">Cerrado</option>
                        <option className="pqrsList__option" value="CANCELLED">Cancelado</option>
                    </select>

                    <select
                        className="pqrsList__filter"
                        onChange={(e) => setPriority(e.target.value || undefined)}
                    >
                        <option className="pqrsList__option" value="">Todas las prioridades</option>
                        <option className="pqrsList__option" value="Low">Baja</option>
                        <option className="pqrsList__option" value="MEDIUM">Media</option>
                        <option className="pqrsList__option" value="HIGH">Alta</option>
                        <option className="pqrsList__option" value="CRITICAL">Critica</option>
                    </select>
                </div>

            </div>





            <table className='pqrsList__table'>
                <thead className='pqrsList__thead'>
                    <tr className='pqrsList__tr'>
                        <th className='pqrsList__th'>ID</th>
                        <th className='pqrsList__th'>TIPO</th>
                        <th className='pqrsList__th'>ASUNTO</th>
                        <th className='pqrsList__th'>ESTADO</th>
                        <th className='pqrsList__th'>RESPUESTA</th>
                        <th className='pqrsList__th'>ACCIONES</th>
                    </tr>
                </thead>
                <tbody className='pqrsList__tbody'>
                    {
                        pqrs.map((pqrs) => (

                            <tr key={pqrs.idPqrs} className='pqrsList__tr'>
                                <td className='pqrsList__td'>{pqrs.idPqrs}</td>
                                <td className='pqrsList__td'>{pqrs.type}</td>
                                <td className='pqrsList__td'>{pqrs.subject}</td>
                                <td className='pqrsList__td'>{pqrs.status}</td>
                                <td className='pqrsList__td'>{pqrs.response ? pqrs.response : "Sin respuesta."}</td>
                                <td className='pqrsList__td'>
                                    <div className="pqrsList__container-actions">
                                        <Link className="pqrsList__button-edit" to={`/admin/pqrs/update/${pqrs.idPqrs}`} ><FaEye size={18} /></Link>
                                        <button className='pqrsList__button-delete'> <MdDeleteOutline size={18} /> </button>
                                    </div>
                                </td>
                            </tr>

                        ))
                    }













                </tbody>
            </table>

            <div className="pqrsList__container-pages">
                <button className='pqrsList__button' onClick={prevPage} disabled={numberPage == 0} ><FaArrowLeft size={18} /></button>
                <p className='pqrsList__p'>Pagina {numberPage + 1} de: {totalPage} </p>
                <button className='pqrsList__button' onClick={nextPage} disabled={numberPage + 1 == totalPage}><FaArrowRight size={18} /></button>
            </div>
        </div>
    );
}
