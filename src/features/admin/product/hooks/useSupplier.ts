import { useEffect, useState } from "react";
import { axiosClient } from "../../../../shared/api/axiosClient";
import { endPoints } from "../../../../shared/api/endPoints";

type SupplierItem = {
  id: number;
  name: string;
};

type SupplierListResponse = {
  items: SupplierItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export function useSuppliers() {
  const [items, setItems] = useState<SupplierItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axiosClient.get<SupplierListResponse>(
          endPoints.admin.supplier.list(0)
        );

        setItems(res.data.items ?? []);
      } catch (err: any) {
        setError(err?.message || "Error al cargar proveedores");
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  return { items, loading, error };
}
