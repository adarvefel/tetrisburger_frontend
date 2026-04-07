import { useState } from "react";
import { findProductCategoryById } from "../../../../entities/productCategory/api/productCategoryApi";
import { ProductCategoryDto } from "../../../../entities/productCategory/dto/productCategoryDto";

export function useCategoryFindById() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [category, setCategory] = useState<ProductCategoryDto>();

  const handleCategoryFindById = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await findProductCategoryById(id);
      setCategory(response.data);
      return response;
    } catch (err: any) {
      setError(err.message || "Error al buscar la categoría");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, category, handleCategoryFindById };
}
