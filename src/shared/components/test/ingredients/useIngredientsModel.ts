import { useEffect, useState } from "react";
import { listProducts, searchByName } from "../../../../entities/product/api/productApi";
import { IngredientsResponseDTO } from "../dto";
import { axiosClient } from "../../../api/axiosClient";
import { endPoints } from "../../../api/endPoints";
import { toast } from "sonner";

export function useIngredientsModel() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [ingredients, setIngredients] = useState<IngredientsResponseDTO[]>([]);
  const [numberPage, setNumberPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const [productCategoryId, setProductCategoryId] = useState<number | undefined>(undefined);
  const [name, setName] = useState("");

  const listTest = async (
    page: number,
    productCategoryId?: number) => {
    const response = await axiosClient.get(endPoints.admin.product.listPrueba(page, productCategoryId));
    return response;
  };

  const nextPage = () => {
    if (numberPage < totalPage - 1) {
      setNumberPage((prev) => prev + 1);
    }
    return;
  };

  const prevPage = () => {
    if (numberPage > 0) {
      setNumberPage((prev) => prev - 1);
    }
    return;
  };

  const handleUseListIngredients = async () => {
    try {
      setLoading(true);
      setError(null);

      if (name.trim() !== "") {
        const response = await searchByName(name, numberPage);
        setIngredients(response.data.items);
        setTotalPage(response.data.totalPages);
        return response;
      } else {
        const response = await listTest(numberPage, productCategoryId);

        setIngredients(response.data.items);
        setTotalPage(response.data.totalPages);
         return response;
      }
     
    } catch (err: any) {
      setError(err.message || "Error al traer los productos");
      const msg = err.response?.data?.message
      toast.error(msg)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleUseListIngredients();
  }, [numberPage, productCategoryId, name]);

  return { loading, error, ingredients, numberPage, totalPage, nextPage, prevPage, handleUseListIngredients, productCategoryId, setProductCategoryId, setName, name };
}
