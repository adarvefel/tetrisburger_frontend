import { useEffect, useState } from "react";
import { ProductFetchList, ProductListResponse } from "../dto/productsAdminDto";
import { listProducts } from "../../../../entities/product/api/productApi";

export function useProductList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [products, setProducts] = useState<ProductFetchList[]>([]);
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

  const fetchProductList = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await listProducts(numberPage);
      const data = response.data as ProductListResponse;

      setProducts(data.items ?? []);
      setTotalPage(data.totalPages ?? 0);
      return response;
    } catch (err: any) {
      setError(err.message || "Error al traer los productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, [numberPage]);

  return { loading, error, products, numberPage, totalPage, nextPage, prevPage, fetchProductList };
}
