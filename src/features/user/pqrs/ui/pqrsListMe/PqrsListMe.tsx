import React, { useState } from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "./pqrsListMe.css";
import { usePqrsListMe } from '../../hooks/usePqrsListMe';
import { Link } from 'react-router-dom';
import { GrDocumentText } from "react-icons/gr";

export default function PqrsListMe() {

    const { error, loading, numberPage, totalPage, totalElements, pqrs, prevPage, nextPage, handlePqrsListMe } = usePqrsListMe();

    return (
        <div className="pqrsListMe__container-global">

            <div className="pqrsListMe__container-top">
                <div className="pqrsListMe__container-card">
                    <div className="pqrsListMe__container-card-sub">
                        <GrDocumentText color='black' size={44} />
                        <span className='pqrsListMe__elements'>{totalElements}</span>
                    </div>
                    <span className='pqrsListMe__span'>Peticiones en total.</span>

                </div>
                <Link className='pqrsListMe__button-create' to={"/pqrs-create"}>Crear nuevo PQRS</Link>
            </div>

            <table className='pqrsListMe__table'>
                <thead className='pqrsListMe__thead'>
                    <tr className='pqrsListMe__tr'>
                        <th className='pqrsListMe__th'>ID</th>
                        <th className='pqrsListMe__th'>Tipo</th>
                        <th className='pqrsListMe__th'>Estado</th>
                        <th className='pqrsListMe__th'>Asunto</th>
                        <th className='pqrsListMe__th'>Respuesta</th>
                        <th className='pqrsListMe__th'>Acciones</th>
                    </tr>
                </thead>
                <tbody className='pqrsListMe__tbody'>
                    {
                        pqrs.map((pqrsItem) => (
                            <tr key={pqrsItem.idPqrs} className='pqrsListMe__tr'>
                                <td className='pqrsListMe__td'>{pqrsItem.idPqrs}</td>
                                <td className='pqrsListMe__td'>{pqrsItem.type}</td>
                                <td className='pqrsListMe__td'>{pqrsItem.status}</td>
                                <td className='pqrsListMe__td'>{pqrsItem.subject}</td>
                                <td className='pqrsListMe__td'>{pqrsItem.response || "Sin respuesta"}</td>
                                <Link id='pqrsListMe__link' className='pqrsListMe__td' to={`/pqrs/${pqrsItem.idPqrs}`}>Mas acciones</Link>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className="pqrsListMe__container-pages">
                <button className='pqrsListMe__button' onClick={prevPage} disabled={numberPage === 0} ><FaArrowLeft size={18} /></button>
                <p className='pqrsListMe__p'>Página {numberPage + 1} de {totalPage}</p>
                <button className='pqrsListMe__button' onClick={nextPage} disabled={numberPage + 1 === totalPage}><FaArrowRight size={18} /></button>
            </div>
        </div>
    )
}
