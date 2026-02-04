import { useEffect, useState } from "react";
import {
  ProductCategoryFetchList,
  ProductCategoryListResponse,
} from "../dto/productCategoriesAdminDto";
import { listProductCategories } from "../../../../entities/productCategory/api/productCategoryApi";

export function useProductCategoryList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [categories, setCategories] = useState<ProductCategoryFetchList[]>([]);
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

  const fetchCategoryList = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await listProductCategories(numberPage);
      const data = response.data as ProductCategoryListResponse;

      setCategories(data.items ?? []);
      setTotalPage(data.totalPages ?? 0);
      return response;
    } catch (err: any) {
      setError(err.message || "Error al traer las categorías");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, [numberPage]);

  return {
    loading,
    error,
    categories,
    numberPage,
    totalPage,
    nextPage,
    prevPage,
    fetchCategoryList,
  };
}
