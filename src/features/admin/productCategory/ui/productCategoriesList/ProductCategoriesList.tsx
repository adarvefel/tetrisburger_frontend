import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

import "./productCategoryList.css";
import { Link } from "react-router-dom";
import { useProductCategoryList } from "../../hooks/useProductCategoryList";
import { ProductCategoryFetchList } from "../../dto/productCategoriesAdminDto";
import CategoryDelete from "../productCategoryDelete/ProductCategoryDelete";
import SuccessAlert from "../../../../../shared/components/alerts/successAlert/SuccessAlert";
import ButtonCasual from "../../../../../shared/components/buttonCasual/ButtonCasual";
import { deleteProductCategory } from "../../../../../entities/productCategory/api/productCategoryApi";
import { useDeleteEntity } from "../../../../../shared/hooks/useDeleteEntity";
import ConfirmDeleteModal from "../../../../../shared/components/confirmDeleteModal/ConfirmDeleteModal";
import { toast } from "sonner";

export default function CategoryList() {
  const {
    error,
    loading,
    numberPage,
    totalPage,
    categories,
    prevPage,
    nextPage,
    fetchCategoryList,
  } = useProductCategoryList();


  // ---------- DELETE STATE ----------
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productCategoryToDelete, setproductCategoryToDelete] = useState<any>(null);

  const { loading: deleting, remove } = useDeleteEntity(deleteProductCategory);

  const openDeleteModal = (productCategory: any) => {
    setproductCategoryToDelete(productCategory);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setproductCategoryToDelete(null);
  };

  const confirmDelete = async () => {
    if (!productCategoryToDelete) return;

    await remove(productCategoryToDelete.id);
    closeDeleteModal();
    fetchCategoryList();
    toast.success("productCategory eliminado con exito.");
  };

  return (
    <div className="productList__container-global">
      {/* ---------- DELETE MODAL ---------- */}
      
      {showDeleteModal && productCategoryToDelete && (
        <ConfirmDeleteModal
          title="Eliminar Categoria de Producto"
          description={`Estas a punto de eliminar permanentemente el productCategory  "${productCategoryToDelete.name}". Esta acción es irreversible.`}
          loading={deleting}
          onConfirm={confirmDelete}
          onClose={closeDeleteModal}
        />
      )}

      <div className="productList__container-top">
        <ButtonCasual
          linkRedireccion="/admin/category/create"
          mensagge="Nueva Categoría"
        />
      </div>

      <table className="productList__table">
        <thead className="productList__thead">
          <tr className="productList__tr">
            <th className="productList__th">ID</th>
            <th className="productList__th">Nombre</th>
            <th className="productList__th">Descripción</th>
            <th className="productList__th">Disponible</th>
            <th className="productList__th">Acciones</th>
          </tr>
        </thead>
        <tbody className="productList__tbody">
          {categories.map(category => (
            <tr key={category.id} className="productList__tr">
              <td className="productList__td">{category.id}</td>
              <td className="productList__td">{category.name}</td>
              <td className="productList__td">{category.description}</td>
              <td className="productList__td">
                {category.available ? "Activa" : "Inactiva"}
              </td>
              <td className="productList__td">
                <div className="productList__container-actions">
                  <Link
                    className="productList__button-edit"
                    to={`/admin/category/update/${category.id}`}
                  >
                    <CiEdit size={18} />
                  </Link>
                  <button
                    className="productList__button-delete"
                    onClick={() => openDeleteModal(category)}
                  >
                    <MdDeleteOutline size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="productList__container-pages">
        <button
          className="productList__button"
          onClick={prevPage}
          disabled={numberPage === 0}
        >
          <FaArrowLeft size={18} />
        </button>
        <p className="userList__p">
          Pagina {numberPage + 1} de: {totalPage}
        </p>
        <button
          className="productList__button"
          onClick={nextPage}
          disabled={numberPage + 1 === totalPage}
        >
          <FaArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
