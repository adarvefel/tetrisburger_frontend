import "./supplierCreate.css";
import SupplierForm from "../../../../../shared/components/formsCruds/supplierForm/SupplierForm";
import { useSupplierCreate } from "../../hooks/useSupplierCreate";
import { CreateSupplierDto } from "../../../../../entities/supplier/dto/supplierDto";
import { useNavigate } from "react-router-dom";

export default function SupplierCreate() {
  const { handleSupplierCreate } = useSupplierCreate();

  return <SupplierForm mode="admin-create" onSubmit={(data)=>handleSupplierCreate(data)} />;
}