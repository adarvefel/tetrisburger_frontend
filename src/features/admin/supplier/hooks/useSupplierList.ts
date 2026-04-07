import { useEffect, useState } from "react";
import {SupplierFetchList,SupplierListResponse,} from "../dto/suppliersAdminDto";
import { listSuppliers } from "../../../../entities/supplier/api/supplierApi";

export function useSupplierList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [suppliers, setSuppliers] = useState<SupplierFetchList[]>([]);
  const [numberPage, setNumberPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const nextPage = () => {
    if (numberPage < totalPage - 1) {
      setNumberPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (numberPage > 0) {
      setNumberPage(prev => prev - 1);
    }
  };

  const fetchSupplierList = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await listSuppliers(numberPage);
      const data = response.data as SupplierListResponse;
      setSuppliers(data.items ?? []);
      setTotalPage(data.totalPages ?? 0);
      return response;
    } catch (err: any) {
      setError(err.message || "Error al traer los proveedores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupplierList();
  }, [numberPage]);

  return {
    loading,
    error,
    suppliers,
    numberPage,
    totalPage,
    nextPage,
    prevPage,
    fetchSupplierList,
  };
}
