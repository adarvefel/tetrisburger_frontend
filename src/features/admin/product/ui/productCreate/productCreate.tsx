import React from "react";
import "./productCreate.css";
import { useProductCreate } from "../../hooks/useProductCreate";
import ProductForm from "../../../../../shared/components/productForm/ProductForm";
import { CreateProductDto } from "../../../../../entities/product/dto/productDto";

export default function ProductCreate() {
  const { error, loading, handleProductCreate } = useProductCreate();

  return (
    <div>
      <ProductForm
        mode="admin-create"
        onSubmit={async (data: CreateProductDto) => {
          await handleProductCreate(data);
        }}
      />
    </div>
  );
}
