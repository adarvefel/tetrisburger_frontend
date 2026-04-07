import { useState } from "react";
import { createProductCategory } from "../../../../entities/productCategory/api/productCategoryApi";
import { CreateProductCategoryDto } from "../../../../entities/productCategory/dto/productCategoryDto";
import { toast } from "sonner";

export function useCategoryCreate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleCategoryCreate = async (data: CreateProductCategoryDto) => {
    try {
      setLoading(true);
      setError(null);
      const response = await createProductCategory(data);
      return response;
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Error al intentar crear una nueva categoría";
      setError(msg);
      toast.error(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleCategoryCreate };
}
