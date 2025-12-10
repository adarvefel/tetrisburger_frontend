import React from "react";
import "./supplierDelete.css";
import { SupplierFetchList } from "../../dto/suppliersAdminDto";
import { useSupplierDelete } from "../../hooks/useSupplierDelete";

interface SupplierDeleteProps {
  supplier: SupplierFetchList;
  onClose: () => void;
  onDeleted: () => void;
}

export default function SupplierDelete({
  supplier,
  onClose,
  onDeleted,
}: SupplierDeleteProps) {
  const { loading, error, handleSupplierDelete } = useSupplierDelete();

  const handleConfirm = async () => {
    await handleSupplierDelete(supplier.id);
    onDeleted();
    onClose();
  };

  return (
    <div className="productDelete__overlay">
      <div className="productDelete__modal">
        <h3 className="productDelete__title">Eliminar proveedor</h3>
        <p className="productDelete__text">
          Estas apunto de eliminar eliminar permanentemente <b>{supplier.name}</b> Esta accion es irreversible. Se perderan todos los datos asociados a este producto.</p>

        {error && <p className="productDelete__error">{error}</p>}

        <div className="productDelete__actions">
          <button type="button" className="productDelete__button--cancel" onClick={onClose}>Cancelar</button>
          <button type="button"className="productDelete__button--confirm"onClick={handleConfirm}disabled={loading}>{loading ? "Eliminando..." : "Eliminar"}</button>
        </div>
      </div>
    </div>
  );
}
