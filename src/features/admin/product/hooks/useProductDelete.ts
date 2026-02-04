import { useState } from "react";
import { deleteProduct } from "../../../../entities/product/api/productApi";

export function useProductDelete(){

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const removeProduct = async(id: number) =>{
        try{
            setLoading(true);
            setError(null);
            const response = await deleteProduct(id);
            return response;

        }catch(err: any){
            setError(err.message || "Error al eliminar producto")
            
        }finally{
            setLoading(false);
        }
    }

    return {loading, error, removeProduct};

} 