import "./supplierUpdate.css";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SupplierForm from "../../../../../shared/components/supplierForm/SupplierForm";
import { useSupplierFindById } from "../../hooks/useSupplierFindById";
import { useSupplierUpdate } from "../../hooks/useSupplierUpdate";
import { UpdateSupplierDto } from "../../../../../entities/supplier/dto/supplierDto";

export default function SupplierUpdate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    loading: findLoading,
    error: findError,
    supplier,
    handleSupplierFindById,
  } = useSupplierFindById();

  const {
    loading: updateLoading,
    error: updateError,
    handleSupplierUpdate,
  } = useSupplierUpdate();

  useEffect(() => {
    if (id) {
      handleSupplierFindById(Number(id));
    }
  }, [id]);

  const handleSubmit = async (data: UpdateSupplierDto) => {
    if (!id) return;
    await handleSupplierUpdate(Number(id), data);
    setTimeout(() => {
      navigate("/admin/suppliers-list");
    }, 3000);
  };

  if (findLoading) return <p style={{ padding: 16 }}>Cargando proveedor...</p>;
  if (findError)
    return (
      <p style={{ padding: 16, color: "red" }}>
        Error al cargar el proveedor: {findError}
      </p>
    );
  if (!supplier)
    return (
      <p style={{ padding: 16 }}>No se encontró el proveedor con id {id}.</p>
    );

  return (
    <SupplierForm
      mode="admin-update"
      initialData={{
        id: supplier.id,
        name: supplier.name,
        phone: supplier.phone,
        email: supplier.email,
        address: supplier.address,
      }}
      onSubmit={handleSubmit}
    />
  );
}
