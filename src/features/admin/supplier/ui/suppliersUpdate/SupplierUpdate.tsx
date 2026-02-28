import "./supplierUpdate.css";
import { useEffect } from "react";
import { useParams, useNavigate, data } from "react-router-dom";
import SupplierForm from "../../../../../shared/components/supplierForm/SupplierForm";
import { useSupplierFindById } from "../../hooks/useSupplierFindById";
import { useSupplierUpdate } from "../../hooks/useSupplierUpdate";
import { UpdateSupplierDto } from "../../../../../entities/supplier/dto/supplierDto";

export default function SupplierUpdate() {
  const { id } = useParams<{ id: string }>();
  const { loading: findLoading, error: findError, supplier, handleSupplierFindById } = useSupplierFindById();
  const { loading: updateLoading, error: updateError, handleSupplierUpdate, } = useSupplierUpdate();

  useEffect(() => {
    if (id) {
      handleSupplierFindById(Number(id));
    }
  }, [id]);


  return (
    <SupplierForm
      mode="admin-update"
      initialData={supplier}
      onSubmit={(data) => handleSupplierUpdate(Number(id), data)}
    />
  );
}
