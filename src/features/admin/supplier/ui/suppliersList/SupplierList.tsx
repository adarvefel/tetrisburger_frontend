import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaArrowRight, FaArrowLeft, FaSearch } from "react-icons/fa";

import "./supplierList.css";
import { Link } from "react-router-dom";
import { useSupplierList } from "../../hooks/useSupplierList";
import { SupplierFetchList } from "../../dto/suppliersAdminDto";
import SupplierDelete from "../suppliersDelete/SupplierDelete";
import SuccessAlert from "../../../../../shared/components/alerts/successAlert/SuccessAlert";
import ButtonCasual from "../../../../../shared/components/buttonCasual/ButtonCasual";
import { deleteSupplier } from "../../../../../entities/supplier/api/supplierApi";
import { useDeleteEntity } from "../../../../../shared/hooks/useDeleteEntity";
import ConfirmDeleteModal from "../../../../../shared/components/confirmDeleteModal/ConfirmDeleteModal";
import { toast } from "sonner";

export default function SupplierList() {
  const {
    error,
    loading,
    suppliers,
    numberPage,
    totalPage,
    prevPage,
    nextPage,
    fetchSupplierList,
  } = useSupplierList();

  

  // ---------- DELETE STATE ----------
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [supplierToDelete, setsupplierToDelete] = useState<any>(null);

  const { loading: deleting, remove } = useDeleteEntity(deleteSupplier);

  const openDeleteModal = (supplier: any) => {
    setsupplierToDelete(supplier);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setsupplierToDelete(null);
  };

  const confirmDelete = async () => {
    if (!supplierToDelete) return;

    await remove(supplierToDelete.id);
    closeDeleteModal();
    fetchSupplierList();
    toast.success("supplier eliminado con exito.");
  };

  return (
    <div className="productList__container-global">
      {/* ---------- DELETE MODAL ---------- */}
      
      {showDeleteModal && supplierToDelete && (
        <ConfirmDeleteModal
          title="Eliminar Proveedor"
          description={`Estas a punto de eliminar permanentemente el supplier  "${supplierToDelete.name}". Esta acción es irreversible.`}
          loading={deleting}
          onConfirm={confirmDelete}
          onClose={closeDeleteModal}
        />
      )}


      <div className="productList__container-top">

        <ButtonCasual
          linkRedireccion="/admin/suppliers/create"
          mensagge="Nuevo Proveedor"
        />
      </div>

      <table className="productList__table">
        <thead className="productList__thead">
          <tr className="productList__tr">
            <th className="productList__th">ID</th>
            <th className="productList__th">Nombre</th>
            <th className="productList__th">Teléfono</th>
            <th className="productList__th">Email</th>
            <th className="productList__th">Dirección</th>
            <th className="productList__th">Acciones</th>
          </tr>
        </thead>
        <tbody className="productList__tbody">
          {suppliers.map(supplier => (
            <tr key={supplier.id} className="productList__tr">
              <td className="productList__td">{supplier.id}</td>
              <td className="productList__td">{supplier.name}</td>
              <td className="productList__td">{supplier.phone}</td>
              <td className="productList__td">{supplier.email}</td>
              <td className="productList__td">{supplier.address}</td>
              <td className="productList__td">
                <div className="productList__container-actions">
                  <Link
                    className="productList__button-edit"
                    to={`/admin/suppliers/update/${supplier.id}`}
                  >
                    <CiEdit size={18} />
                  </Link>
                  <button
                    className="productList__button-delete"
                    onClick={() => openDeleteModal(supplier)}
                  >
                    <MdDeleteOutline size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="productList__container-pages">
        <button
          className="productList__button"
          onClick={prevPage}
          disabled={numberPage === 0}
        >
          <FaArrowLeft size={18} />
        </button>
        <p className="userList__p">
          Pagina {numberPage + 1} de: {totalPage}
        </p>
        <button
          className="productList__button"
          onClick={nextPage}
          disabled={numberPage + 1 === totalPage}
        >
          <FaArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
