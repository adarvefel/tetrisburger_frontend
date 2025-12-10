
import { useEffect, useState } from "react";
import { axiosClient } from "../../../../shared/api/axiosClient";
import { endPoints } from "../../../../shared/api/endPoints";

// si quieres tipar fuerte, crea este tipo según tu ListProductCategoryResponseDTO
type ProductCategoryItem = {
  id: number;
  name: string;
};

type ProductCategoryListResponse = {
  items: ProductCategoryItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export function useProductCategories() {
  const [items, setItems] = useState<ProductCategoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axiosClient.get<ProductCategoryListResponse>(
          endPoints.admin.productCategory.list(0)
        );
        setItems(res.data.items ?? []);
      } catch (err: any) {
        setError(err?.message || "Error al cargar categorías");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { items, loading, error };
}
