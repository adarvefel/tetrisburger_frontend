import React from "react";
import "./productCategoryDelete.css";
import { ProductCategoryFetchList } from "../../dto/productCategoriesAdminDto";
import { useProductCategoryDelete } from "../../hooks/useProductCategoryDelete";

interface CategoryDeleteProps {
  category: ProductCategoryFetchList;
  onClose: () => void;
  onDeleted: () => void;
}

export default function CategoryDelete({
  category,
  onClose,
  onDeleted,
}: CategoryDeleteProps) {
  const { loading, error, handleCategoryDelete } = useProductCategoryDelete();

  const handleConfirm = async () => {
    await handleCategoryDelete(category.id);
    onDeleted();
    onClose();
  };

  return (
    <div className="productDelete__overlay">
      <div className="productDelete__modal">
        <h3 className="productDelete__title">Eliminar categoría</h3>
        <p className="productDelete__text">
          Estas apunto de eliminar eliminar permanentemente{" "}<b>{category.name}</b> Esta accion es irreversible. Se perderan todos los datos asociados a este producto.</p>

        {error && (
          <p className="productDelete__error">
            {error}
          </p>
        )}

        <div className="productDelete__actions">
          <button type="button" className="productDelete__button productDelete__button--cancel" onClick={onClose}>Cancelar</button>
          <button type="button"className="productDelete__button productDelete__button--confirm"onClick={handleConfirm}disabled={loading}>{loading ? "Eliminando..." : "Eliminar"}</button>
        </div>
      </div>
    </div>
  );
}
