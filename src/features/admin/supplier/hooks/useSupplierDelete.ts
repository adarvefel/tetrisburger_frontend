import { useState } from "react";
import { deleteSupplier } from "../../../../entities/supplier/api/supplierApi";

export function useSupplierDelete() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleSupplierDelete = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await deleteSupplier(id);
      return response;
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Error al eliminar el proveedor";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleSupplierDelete };
}
