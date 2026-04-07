import { useState } from "react";
import { deleteProductCategory } from "../../../../entities/productCategory/api/productCategoryApi";

export function useProductCategoryDelete() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleCategoryDelete = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const res = await deleteProductCategory(id);
      return res;
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Error al eliminar la categoría";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleCategoryDelete };
}
