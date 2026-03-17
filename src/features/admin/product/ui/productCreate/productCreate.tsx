import React from "react";
import "./productCreate.css";
import { useProductCreate } from "../../hooks/useProductCreate";
import ProductForm from "../../../../../shared/components/formsCruds/productForm/ProductForm";
import { CreateProductDto } from "../../../../../entities/product/dto/productDto";

export default function ProductCreate() {
  const { error, loading, handleProductCreate } = useProductCreate();

  return (
    <div>
      <ProductForm
        mode="admin-create"
        onSubmit={(data) =>  handleProductCreate(data)}
        loading={loading}
      />
    </div>
  );
}
