import { useState } from "react";
import { updateProduct } from "../../../../entities/product/api/productApi";
import { UpdateProductDto, UpdateProductWithImageDto } from "../../../../entities/product/dto/productDto";

export function useProductUpdate (){

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleProductUpdate = async (id: number, data : UpdateProductWithImageDto) => {
        try{
            setLoading(true);
            setError(null);
            const response = await updateProduct(id, data);
            return response
        }catch(err: any){
            setError(err.message || "Error al actualizar datos de este producto.");
        }finally{
            setLoading(false);
        }
    }

    return {error, loading,  handleProductUpdate};

}