import React, { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { GrDocumentText } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./pqrsList.css";
import { usePqrsList } from "../../hooks/usePqrsList";

import ConfirmDeleteModal from "../../../../../shared/components/confirmDeleteModal/ConfirmDeleteModal";
import { useDeleteEntity } from "../../../../../shared/hooks/useDeleteEntity";
import { deletePqrs } from "../../../../../entities/pqrs/api/pqrsApi";
import SuccessAlert from "../../../../../shared/components/alerts/successAlert/SuccessAlert";

export default function PqrsList() {

  const {
    pqrs,
    numberPage,
    totalPage,
    totalElements,
    nextPage,
    prevPage,
    setType,
    setStatus,
    setPriority,
    handlePqrsList
  } = usePqrsList();

  const [alertSucces, setAlertSucces] = useState<null | string>(null);
  const onClosedAlertSucces = () => {
    setAlertSucces(null);
  }

  // ---------- DELETE STATE ----------
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pqrsToDelete, setPqrsToDelete] = useState<any>(null);

  const { loading: deleting, remove } = useDeleteEntity(deletePqrs);

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
    handlePqrsList();
    setAlertSucces("PQRS eliminado con exito.");
  };

  return (
    <div className="pqrsList__container-global">

      {/* ---------- DELETE MODAL ---------- */}
      {alertSucces ? <SuccessAlert mensaje={alertSucces} onClosed={onClosedAlertSucces}/> : null} 
      {showDeleteModal && pqrsToDelete && (
        <ConfirmDeleteModal
          title="Eliminar PQRS"
          description={`Estas a punto de eliminar permanentemente el PQRS con asunto "${pqrsToDelete.subject}". Esta acción es irreversible.`}
          loading={deleting}
          onConfirm={confirmDelete}
          onClose={closeDeleteModal}
        />
      )}

      {/* ---------- TOP ---------- */}
      <div className="pqrsList__container-top">

        <div className="pqrsList__container-card">
          <div className="pqrsList__container-card-sub">
            <GrDocumentText size={44} color="black" />
            <span className="pqrsList__elements">{totalElements}</span>
          </div>
          <span className="pqrsList__span">PQRS en total</span>
        </div>

        <div className="pqrsList__container-filters">
          <select className="pqrsList__filter" onChange={(e) => setType(e.target.value || undefined)}>
            <option className="pqrsList__option" value="">Todos los tipos</option>
            <option className="pqrsList__option" value="PETITION">Petición</option>
            <option className="pqrsList__option" value="COMPLAINT">Queja</option>
            <option className="pqrsList__option" value="CLAIM">Reclamo</option>
            <option className="pqrsList__option" value="SUGGESTION">Sugerencia</option>
            <option className="pqrsList__option" value="REPORT">Denuncia</option>
            <option className="pqrsList__option" value="CONGRATULATIONS">Felicitaciones</option>
          </select>

          <select className="pqrsList__filter" onChange={(e) => setStatus(e.target.value || undefined)}>
            <option className="pqrsList__option" value="">Todos los estados</option>
            <option className="pqrsList__option" value="RECEIVED">Recibido</option>
            <option className="pqrsList__option" value="ANSWERED">Respondido</option>
          </select>

          <select className="pqrsList__filter" onChange={(e) => setPriority(e.target.value || undefined)}>
            <option className="pqrsList__option" value="">Todas las prioridades</option>
            <option className="pqrsList__option" value="LOW">Baja</option>
            <option className="pqrsList__option" value="MEDIUM">Media</option>
            <option className="pqrsList__option" value="HIGH">Alta</option>
            <option className="pqrsList__option" value="CRITICAL">Crítica</option>
          </select>
        </div>
      </div>

      {/* ---------- TABLE ---------- */}
      <table className="pqrsList__table">
        <thead className="pqrsList__thead">
          <tr className="pqrsList__tr">
            <th className="pqrsList__th" >ID</th>
            <th className="pqrsList__th">TIPO</th>
            <th className="pqrsList__th" >ASUNTO</th>
            <th className="pqrsList__th">ESTADO</th>
            <th className="pqrsList__th">ACCIONES</th>
          </tr>
        </thead>
        <tbody className="pqrsList__tbody">
          {pqrs.map((item) => (
            <tr className="pqrsList__tr" key={item.idPqrs}>
              <td className="pqrsList__td">{item.idPqrs}</td>
              <td className="pqrsList__td">{item.type === "PETITION" ? "Peticion" : item.type === "COMPLAINT" ? "Queja" : item.type === "CLAIM" ? "Reclamo" : item.type === "SUGGESTION" ? "Sugerencia" : item.type === "REPORT" ? "Denuncia" : "Felecitaciones"}</td>
              <td className="pqrsList__td">{item.subject}</td>
              <td className="pqrsList__td"><p className={item.status === "RECEIVED" ? "pqrsList__p-received" : "pqrsList__p-answered"}>{item.status === "RECEIVED" ? "Recibido" : "Respondido"}</p></td>
              <td className="pqrsList__td">
                <div className="pqrsList__container-actions">
                  <Link className="pqrsList__button-edit" to={`/admin/pqrs/update/${item.idPqrs}`}>
                    <FaEye size={18} />
                  </Link>
                  <button id="loquesea" className="pqrsList__button-delete" onClick={() => openDeleteModal(item)}>
                    <MdDeleteOutline size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ---------- PAGINATION ---------- */}
      <div className="pqrsList__container-pages">
        <button className="pqrsList__button" onClick={prevPage} disabled={numberPage === 0}>
          <FaArrowLeft />
        </button>
        <p className="pqrsList__p">
          Página {numberPage + 1} de {totalPage}
        </p>
        <button className="pqrsList__button"
          onClick={nextPage}
          disabled={numberPage + 1 === totalPage}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
