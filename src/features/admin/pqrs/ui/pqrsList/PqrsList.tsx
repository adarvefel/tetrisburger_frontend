import { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { GrDocumentText } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./pqrsList.css";
import "./../../../../../shared/components/componetsCrud/table/tableComponents.css";
import { usePqrsList } from "../../hooks/usePqrsList";
import ConfirmDeleteModal from "../../../../../shared/components/confirmDeleteModal/ConfirmDeleteModal";
import { useDeleteEntity } from "../../../../../shared/hooks/useDeleteEntity";
import { deletePqrs } from "../../../../../entities/pqrs/api/pqrsApi";
import { TableLayout, TableHead, TableBody, Th, Td, TableActions, TablePagination } from "./../../../../../shared/components/componetsCrud/table/TableComponents";
import { toast } from "sonner";

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
    toast.success("PQRS eliminado con exito.");
  };

  return (
    <div className="pqrsList__container-global">

      {/* ---------- DELETE MODAL ---------- */}
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
      <TableLayout>

        <TableHead>
          <tr>
            <Th>ID</Th>
            <Th>TIPO</Th>
            <Th>PRIORIDAD</Th>
            <Th>ESTADO</Th>
            <Th>ACCIONES</Th>
          </tr>
        </TableHead>

        <TableBody>
          {pqrs.map((pqr) => (
            <tr key={pqr.idPqrs}>

              <Td>{pqr.idPqrs}</Td>
              <Td>{pqr.type === "PETITION" ? "Peticion" : pqr.type === "COMPLAINT" ? "Queja" : pqr.type === "CLAIM" ? "Reclamo" : pqr.type === "SUGGESTION" ? "Sugerencia" : pqr.type === "REPORT" ? "Denuncia" : "Felecitaciones"}</Td>
              <Td>{pqr.priority === "HIGH" ? "Alta" : pqr.priority === "LOW" ? "Baja" : pqr.priority === "MEDIUM" ? "Media" : "Critica"}</Td>
              <Td><span className={`tableComponents__span-${pqr.status === "ANSWERED" ? "green" : "red"}`}> {pqr.status === "ANSWERED" ? "Respondido" : "Recibido"} </span> </Td>



              <Td>
                <TableActions
                  linkEdit={`/admin/pqrs/update/${pqr.idPqrs}`}
                  onDelete={() => openDeleteModal(pqr)}
                />
              </Td>

            </tr>
          ))}
        </TableBody>

      </TableLayout>

      <TablePagination numberPage={numberPage} totalPage={totalPage} onNext={nextPage} onPrev={prevPage} />
    </div>
  );
}
