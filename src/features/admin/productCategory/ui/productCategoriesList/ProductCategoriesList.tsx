import { useState } from "react";
import "./productCategoryList.css";
import "./../../../../../shared/components/componetsCrud/table/tableComponents.css";
import { useProductCategoryList } from "../../hooks/useProductCategoryList";
import ButtonCasual from "../../../../../shared/components/buttonCasual/ButtonCasual";
import { deleteProductCategory } from "../../../../../entities/productCategory/api/productCategoryApi";
import { useDeleteEntity } from "../../../../../shared/hooks/useDeleteEntity";
import ConfirmDeleteModal from "../../../../../shared/components/confirmDeleteModal/ConfirmDeleteModal";
import { toast } from "sonner";
import { TableLayout, TableHead, TableBody, Th, Td, TableActions, TablePagination } from "./../../../../../shared/components/componetsCrud/table/TableComponents";
import LoadingSpinner from "../../../../../shared/components/loadings/loadingSpinner/LoadingSpinner";


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
    toast.success("Categoria producto eliminado con exito.");
  };

  if (loading) {
    return <LoadingSpinner />
  }

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

      <TableLayout>

        <TableHead>
          <tr>
            <Th>ID</Th>
            <Th>NOMBRE</Th>
            <Th>DESCRIPCION</Th>
            <Th>DISPONIBILIDAD</Th>
            <Th>ACCIONES</Th>
          </tr>
        </TableHead>

        <TableBody>
          {categories.map((category) => (
            <tr key={category.id}>

              <Td>{category.id}</Td>
              <Td>{category.name}</Td>
              <Td>{category.description}</Td>
              <Td><span className={`tableComponents__span-${category.available ? "green" : "red"}`}> {category.available ? "Disponible" : "No disponible"} </span> </Td>



              <Td>
                <TableActions
                  linkEdit={`/admin/category/update/${category.id}`}
                  onDelete={() => openDeleteModal(category)}
                />
              </Td>

            </tr>
          ))}
        </TableBody>

      </TableLayout>

      <TablePagination numberPage={numberPage} totalPage={totalPage} onNext={nextPage} onPrev={prevPage} />
    </div>
  );
}
