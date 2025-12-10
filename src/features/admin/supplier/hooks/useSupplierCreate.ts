import { useState } from "react";
import { createSupplier } from "../../../../entities/supplier/api/supplierApi";
import { CreateSupplierDto } from "../../../../entities/supplier/dto/supplierDto";

export function useSupplierCreate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleSupplierCreate = async (data: CreateSupplierDto) => {
    try {
      setLoading(true);
      setError(null);
      const response = await createSupplier(data);
      return response;
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Error al intentar crear el proveedor";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleSupplierCreate };
}
