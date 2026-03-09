import { useState } from "react";
import "./supplierList.css";
import "./../../../../../shared/components/componetsCrud/table/tableComponents.css";
import { useSupplierList } from "../../hooks/useSupplierList";
import ButtonCasual from "../../../../../shared/components/buttonCasual/ButtonCasual";
import { deleteSupplier } from "../../../../../entities/supplier/api/supplierApi";
import { useDeleteEntity } from "../../../../../shared/hooks/useDeleteEntity";
import ConfirmDeleteModal from "../../../../../shared/components/confirmDeleteModal/ConfirmDeleteModal";
import { toast } from "sonner";
import { TableLayout, TableHead, TableBody, Th, Td, TableActions, TablePagination } from "./../../../../../shared/components/componetsCrud/table/TableComponents";
import LoadingSpinner from "../../../../../shared/components/loadings/loadingSpinner/LoadingSpinner";

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

  if (loading) {
    return <LoadingSpinner />
  }

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

      <TableLayout>

        <TableHead>
          <tr>
            <Th>ID</Th>
            <Th>NOMBRE</Th>
            <Th>CORREO</Th>
            <Th>TELEFONO</Th>
            <Th>DIRECCION</Th>
            <Th>ACCIONES</Th>
          </tr>
        </TableHead>

        <TableBody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id}>

              <Td>{supplier.id}</Td>
              <Td>{supplier.name}</Td>
              <Td>{supplier.email}</Td>
              <Td>{supplier.phone}</Td>
              <Td>{supplier.address}</Td>

              <Td>
                <TableActions
                  linkEdit={`/admin/suppliers/update/${supplier.id}`}
                  onDelete={() => openDeleteModal(supplier)}
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
