import "./productCategoryUpdate.css";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CategoryForm from "../../../../../shared/components/categoryForm/CategoryForm";
import { useCategoryFindById } from "../../hooks/useProductCategoryFindById";
import { useCategoryUpdate } from "../../hooks/useProductCategoryUpdate";
import { UpdateProductCategoryDto } from "../../../../../entities/productCategory/dto/productCategoryDto";

export default function CategoryUpdate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    loading: findLoading,
    error: findError,
    category,
    handleCategoryFindById,
  } = useCategoryFindById();

  const {
    loading: updateLoading,
    error: updateError,
    handleCategoryUpdate,
  } = useCategoryUpdate();

  useEffect(() => {
    if (id) {
      handleCategoryFindById(Number(id));
    }
  }, [id]);

  const handleSubmit = async (data: UpdateProductCategoryDto) => {
    if (!id) return;
    await handleCategoryUpdate(Number(id), data);
    setTimeout(() => {
      navigate("/admin/category-list");
    }, 3000);;
  };

  if (findLoading) return <p style={{ padding: 16 }}>Cargando categoría...</p>;
  if (findError)
    return (
      <p style={{ padding: 16, color: "red" }}>
        Error al cargar la categoría: {findError}
      </p>
    );
  if (!category)
    return (
      <p style={{ padding: 16 }}>No se encontró la categoría con id {id}.</p>
    );

return (
  <CategoryForm
    mode="admin-update"
    initialData={{
      id: category.id,
      name: category.name,
      description: category.description,
      available: category.available,
    }}
    onSubmit={handleSubmit}
  />
);

}
