import { useState } from "react";
import { findSupplierById } from "../../../../entities/supplier/api/supplierApi";
import { SupplierDto } from "../../../../entities/supplier/dto/supplierDto";

export function useSupplierFindById() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [supplier, setSupplier] = useState<SupplierDto | null>(null);

  const handleSupplierFindById = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await findSupplierById(id);
      const data = response.data as SupplierDto;
      setSupplier(data);
      return response;
    } catch (err: any) {
      setError(err.message || "Error al buscar el proveedor");
      setSupplier(null);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, supplier, handleSupplierFindById };
}
