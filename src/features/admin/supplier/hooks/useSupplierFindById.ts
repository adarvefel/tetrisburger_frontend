import { useState } from "react";
import { findSupplierById } from "../../../../entities/supplier/api/supplierApi";
import { SupplierDto } from "../../../../entities/supplier/dto/supplierDto";

export function useSupplierFindById() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [supplier, setSupplier] = useState<SupplierDto>();

  const handleSupplierFindById = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await findSupplierById(id);
      setSupplier(response.data);
      return response;
    } catch (err: any) {
      setError(err.message || "Error al buscar el proveedor");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, supplier, handleSupplierFindById };
}
