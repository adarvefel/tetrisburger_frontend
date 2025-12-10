import { useState } from "react";
import { updateProductCategory } from "../../../../entities/productCategory/api/productCategoryApi";
import { UpdateProductCategoryDto } from "../../../../entities/productCategory/dto/productCategoryDto";

export function useCategoryUpdate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleCategoryUpdate = async (id: number, data: UpdateProductCategoryDto) => {
    try {
      setLoading(true);
      setError(null);
      const response = await updateProductCategory(id, data);
      return response;
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Error al intentar actualizar la categoría";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleCategoryUpdate };
}
