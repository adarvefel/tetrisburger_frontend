import React, { useState } from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "./pqrsListMe.css";
import { Link } from 'react-router-dom';
import { GrDocumentText } from "react-icons/gr";
import { FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { usePqrsListMe } from '../../hooks/usePqrsListMe';
import { useDeleteEntity } from '../../../../../shared/hooks/useDeleteEntity';
import SuccessAlert from '../../../../../shared/components/alerts/successAlert/SuccessAlert';
import ConfirmDeleteModal from '../../../../../shared/components/confirmDeleteModal/ConfirmDeleteModal';
import { deletePqrsMe } from '../../api/pqrsUserApi';

export default function pqrsListMe() {

    const { numberPage, totalPage, totalElements, pqrs, prevPage, nextPage, handlePqrsListMe } = usePqrsListMe();

    const [alertSucces, setAlertSucces] = useState<null | string>(null);
    const onClosedAlertSucces = () => {
        setAlertSucces(null);
    }

    // ---------- DELETE STATE ----------
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [pqrsToDelete, setPqrsToDelete] = useState<any>(null);

    const { loading: deleting, remove } = useDeleteEntity(deletePqrsMe);

    const openDeleteModal = (pqrs: any) => {
        setPqrsToDelete(pqrs);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setPqrsToDelete(null);
    };

    const confirmDelete = async () => {
        if (!pqrsToDelete) return;

        await remove(pqrsToDelete.idPqrs);
        closeDeleteModal();
        handlePqrsListMe();
        setAlertSucces("PQRS eliminado con exito.");
    };

    return (
        <div className="pqrsListMe__container-global">

            {/* ---------- DELETE MODAL ---------- */}
            {alertSucces ? <SuccessAlert mensaje={alertSucces} onClosed={onClosedAlertSucces} /> : null}
            {showDeleteModal && pqrsToDelete && (
                <ConfirmDeleteModal
                    title="Eliminar PQRS"
                    description={`Estas a punto de eliminar permanentemente el PQRS con asunto "${pqrsToDelete.subject}". Esta acción es irreversible.`}
                    loading={deleting}
                    onConfirm={confirmDelete}
                    onClose={closeDeleteModal}
                />
            )}

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
                        <th className='pqrsListMe__th'>Asunto</th>
                        <th className='pqrsListMe__th'>Estado</th>
                        <th className='pqrsListMe__th'>Acciones</th>
                    </tr>
                </thead>
                <tbody className='pqrsListMe__tbody'>
                    {
                        pqrs.map((pqrsItem) => (
                            <tr key={pqrsItem.idPqrs} className='pqrsListMe__tr'>
                                <td className='pqrsListMe__td'>{pqrsItem.idPqrs}</td>
                                <td className='pqrsListMe__td'>{pqrsItem.type === "PETITION" ? "Peticion" : pqrsItem.type === "COMPLAINT" ? "Queja" : pqrsItem.type === "CLAIM" ? "Reclamo" : pqrsItem.type === "SUGGESTION" ? "Sugerencia" : pqrsItem.type === "REPORT" ? "Denuncia" : "Felecitaciones"}</td>
                                <td className='pqrsListMe__td'>{pqrsItem.subject}</td>
                                <td className="pqrsListMe__td"><p className={pqrsItem.status === "RECEIVED" ? "pqrsListMe__p-received" : "pqrsListMe__p-answered"}>{pqrsItem.status === "RECEIVED" ? "Recibido" : "Respondido"}</p></td>
                                <td className="pqrsListMe__td">
                                    <div className="pqrsListMe__container-actions">
                                        <Link className="pqrsListMe__button-edit" to={`/pqrs/update/${pqrsItem.idPqrs}`}>
                                            <FaEye size={18} />
                                        </Link>
                                        <button className="pqrsListMe__button-delete" onClick={() => openDeleteModal(pqrsItem)}>
                                            <MdDeleteOutline size={18} />
                                        </button>
                                    </div>
                                </td>
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
