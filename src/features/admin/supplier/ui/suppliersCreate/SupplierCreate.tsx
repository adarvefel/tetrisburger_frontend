import "./supplierCreate.css";
import SupplierForm from "../../../../../shared/components/supplierForm/SupplierForm";
import { useSupplierCreate } from "../../hooks/useSupplierCreate";
import { CreateSupplierDto } from "../../../../../entities/supplier/dto/supplierDto";
import { useNavigate } from "react-router-dom";

export default function SupplierCreate() {
  const { handleSupplierCreate } = useSupplierCreate();
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateSupplierDto) => {
    await handleSupplierCreate(data);
    setTimeout(() => {
      navigate("/admin/suppliers-list");
    }, 3000);
  };

  return <SupplierForm mode="admin-create" onSubmit={handleSubmit} />;
}