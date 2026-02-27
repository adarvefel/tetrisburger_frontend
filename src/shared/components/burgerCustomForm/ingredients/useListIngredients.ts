import { useEffect, useState } from "react";
import { listProducts } from "../../../../entities/product/api/productApi";
import { IngredientsResponseDTO } from "./ingredientsDTO";

export function useListIngredients() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [ingredients, setIngredients] = useState<IngredientsResponseDTO[]>([]);
  const [numberPage, setNumberPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const nextPage = () => {
    if (numberPage < totalPage - 1) {
      setNumberPage((prev) => prev + 1);
      console.log(numberPage);
    }
    return;
  };

  const prevPage = () => {
    if (numberPage > 0) {
      setNumberPage((prev) => prev - 1);
      console.log(numberPage);
    }
    return;
  };

  const handleUseListIngredients = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await listProducts(numberPage);

      setIngredients(response.data.items);
      setTotalPage(response.data.totalPages ?? 0);
      return response;
    } catch (err: any) {
      setError(err.message || "Error al traer los productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleUseListIngredients();
  }, [numberPage]);

  return { loading, error, ingredients, numberPage, totalPage, nextPage, prevPage, handleUseListIngredients };
}
