import CategoryForm from "../../../../../shared/components/categoryForm/CategoryForm";
import { useCategoryCreate } from "../../hooks/useProductCategoryCreate";
import { CreateProductCategoryDto } from "../../../../../entities/productCategory/dto/productCategoryDto";
import { useNavigate } from "react-router-dom";

export default function CategoryCreate() {
  const { handleCategoryCreate } = useCategoryCreate();
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateProductCategoryDto) => {
    await handleCategoryCreate(data);
    setTimeout(() => {
      navigate("/admin/category-list");
    }, 2000);
  };

  return (
    <CategoryForm
      mode="admin-create"
      onSubmit={handleSubmit}
    />
  );
}
