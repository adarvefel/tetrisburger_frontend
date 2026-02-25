import { useEffect, useState } from "react";
import { ProductFetchList, ProductListResponse } from "../dto/productsAdminDto";
import { listProducts, searchByName } from "../../../../entities/product/api/productApi";

export function useProductList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [products, setProducts] = useState<ProductFetchList[]>([]);
  const [numberPage, setNumberPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const [name, setName] = useState("");

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

  const fetchProductList = async () => {
    try {
      setLoading(true);
      setError(null);

      let response;

      if (name.trim() !== "") {

        response = await searchByName(name, numberPage);
        setProducts(response.data.items);
        setTotalPage(response.data.totalPages);
      } else {

        response = await listProducts(numberPage);
        setProducts(response.data.items);
        setTotalPage(response.data.totalPages);
      }
    } catch (err: any) {
      setError(err.message || "Error al traer los productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, [numberPage, name]);

  return { loading, error, products, numberPage, totalPage, setName, name, nextPage, prevPage, fetchProductList };
}
