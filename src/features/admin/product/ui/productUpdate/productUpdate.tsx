import "./productUpdate.css";
import { useParams } from "react-router-dom";
import ProductForm from "../../../../../shared/components/productForm/ProductForm";
import { useProductFindById } from "../../hooks/useProductFindById";
import { useProductUpdate } from "../../hooks/useProductUpdate";
import { useEffect } from "react";

export default function ProductUpdate() {

    const { error: findError, loading: findLoading, product, handleProductFindById } = useProductFindById();
    const { error: updateError, loading: updateLoading, handleProductUpdate } = useProductUpdate();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            handleProductFindById(Number(id));
        }
    }, [id]);

    return (

        <ProductForm
            mode="admin-update"
            initialData={product}
            onSubmit={(data) => handleProductUpdate(Number(id), data)}
        />
    )

}