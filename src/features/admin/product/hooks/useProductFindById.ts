import { useEffect, useState } from "react";
import { findProductById } from "../../../../entities/product/api/productApi";
import { UpdateProductDto } from "../../../../entities/product/dto/productDto";
import { ProductFindByIdResponse } from "../dto/productsAdminDto";

export function useProductFindById() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [product, setProduct] = useState<ProductFindByIdResponse>();

    const handleProductFindById = async (id: number) => {
        try {
            setLoading(true);
            setError(null);
            const response = await findProductById(id);
            setProduct(response.data);
            return response;
        } catch (err: any) {
            setError(err.message || "Error al econtrar producto")
        } finally {
            setLoading(false);
        }

    }

    return { loading, error, product, handleProductFindById };

}