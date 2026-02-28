import "./productCategoryUpdate.css";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CategoryForm from "../../../../../shared/components/categoryForm/CategoryForm";
import { useCategoryFindById } from "../../hooks/useProductCategoryFindById";
import { useCategoryUpdate } from "../../hooks/useProductCategoryUpdate";
import { UpdateProductCategoryDto } from "../../../../../entities/productCategory/dto/productCategoryDto";

export default function CategoryUpdate() {
  
  const { id } = useParams<{ id: string }>();

  const { loading: findLoading, error: findError, category, handleCategoryFindById } = useCategoryFindById();

  const { loading: updateLoading, error: updateError, handleCategoryUpdate, } = useCategoryUpdate();

  useEffect(() => {
    if (id) {
      handleCategoryFindById(Number(id));
    }
  }, [id]);


  return (
    <CategoryForm
      mode="admin-update"
      initialData={category}
      onSubmit={(data)=> handleCategoryUpdate(Number(id), data)}
    />
  );

}
