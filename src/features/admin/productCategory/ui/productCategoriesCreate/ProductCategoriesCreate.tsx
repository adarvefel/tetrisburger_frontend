import CategoryForm from "../../../../../shared/components/categoryForm/CategoryForm";
import { useCategoryCreate } from "../../hooks/useProductCategoryCreate";
import { CreateProductCategoryDto } from "../../../../../entities/productCategory/dto/productCategoryDto";
import { useNavigate } from "react-router-dom";

export default function CategoryCreate() {
  const { handleCategoryCreate } = useCategoryCreate();
  
  return (
    <CategoryForm
      mode="admin-create"
      onSubmit={(data)=>handleCategoryCreate(data)}
    />
  );
}
