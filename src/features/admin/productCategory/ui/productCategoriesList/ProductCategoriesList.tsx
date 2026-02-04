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

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [categoryToDelete, setCategoryToDelete] =
    useState<ProductCategoryFetchList>();

  const onCloseModalDelete = () => setShowModalDelete(false);

  const onOpenModalDelete = (category: ProductCategoryFetchList) => {
    setCategoryToDelete(category);
    setShowModalDelete(true);
  };

  const [alertSuccess, setAlertSuccess] = useState<null | string>(null);
  const onClosedAlertSuccess = () => setAlertSuccess(null);

  const removeSuccess = () => {
    setAlertSuccess("Categoría eliminada con éxito.");
    fetchCategoryList();
  };

  return (
    <div className="productList__container-global">
      {alertSuccess && (
        <SuccessAlert mensaje={alertSuccess} onClosed={onClosedAlertSuccess} />
      )}

      {showModalDelete && categoryToDelete && (
        <CategoryDelete
          onClose={onCloseModalDelete}
          onDeleted={removeSuccess}
          category={categoryToDelete}
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
                    onClick={() => onOpenModalDelete(category)}
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
