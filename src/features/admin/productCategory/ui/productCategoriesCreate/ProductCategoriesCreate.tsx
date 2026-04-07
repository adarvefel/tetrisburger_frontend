import CategoryForm from "../../../../../shared/components/formsCruds/categoryForm/CategoryForm";
import { useCategoryCreate } from "../../hooks/useProductCategoryCreate";
import { CreateProductCategoryDto } from "../../../../../entities/productCategory/dto/productCategoryDto";
import { useNavigate } from "react-router-dom";

export default function CategoryCreate() {
  const { loading, handleCategoryCreate } = useCategoryCreate();
  
  return (
    <CategoryForm
      mode="admin-create"
      onSubmit={(data)=>handleCategoryCreate(data)}
      loading = {loading}
    />
  );
}
