import { useEffect, useState } from "react";
import { IngredientsResponseDTO } from "../../../../entities/burger/dto/burgerDto";
import { toast } from "sonner";
import { listIngredientsBurger } from "../../../../entities/burger/api/burgerApi";
import { searchByName } from "../../../../entities/product/api/productApi";
import { listProducts } from "../../../../entities/menu/api/menuApi";

export function useListProducts() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [ingredients, setIngredients] = useState<IngredientsResponseDTO[]>([]);
    const [numberPage, setNumberPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const [productCategoryId, setProductCategoryId] = useState<number | undefined>(undefined);
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

    const handleUseListProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            let response;

            if (name.trim() !== "") {

                response = await searchByName(name, numberPage);
                setIngredients(response.data.items);
                setTotalPage(response.data.totalPages);
            } else {

                response = await listProducts(numberPage);
                setIngredients(response.data.items);
                setTotalPage(response.data.totalPages);
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
        handleUseListProducts();
    }, [numberPage, productCategoryId, name]);

    return { loading, error, ingredients, numberPage, totalPage, nextPage, prevPage, handleUseListProducts, productCategoryId, setProductCategoryId, setName, name };
}

