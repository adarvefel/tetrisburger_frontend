import { useState } from "react";
import { updateSupplier } from "../../../../entities/supplier/api/supplierApi";
import { UpdateSupplierDto } from "../../../../entities/supplier/dto/supplierDto";

export function useSupplierUpdate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleSupplierUpdate = async (id: number, data: UpdateSupplierDto) => {
    try {
      setLoading(true);
      setError(null);
      const response = await updateSupplier(id, data);
      return response;
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Error al intentar actualizar el proveedor";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleSupplierUpdate };
}