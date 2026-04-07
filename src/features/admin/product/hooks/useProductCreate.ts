import { useState } from "react";
import { createProduct } from "../../../../entities/product/api/productApi";
import { CreateProductDto, CreateProductWihtImageDto } from "../../../../entities/product/dto/productDto";

export function useProductCreate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleProductCreate = async (data: CreateProductWihtImageDto) => {
    try {
      setLoading(true);
      setError(null);

      const response = await createProduct(data);
      return response;
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Error al intentar crear un nuevo producto";

      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleProductCreate };
}
