import React, { useState } from "react";
import "./productList.css";
import "./../../../../../shared/components/componetsCrud/table/tableComponents.css";
import { useProductList } from "../../hooks/useProdustList";
import ButtonCasual from "../../../../../shared/components/buttonCasual/ButtonCasual";
import { FaSearch } from "react-icons/fa";
import { useDeleteEntity } from "../../../../../shared/hooks/useDeleteEntity";
import ConfirmDeleteModal from "../../../../../shared/components/confirmDeleteModal/ConfirmDeleteModal";
import { deleteProduct } from "../../../../../entities/product/api/productApi";
import { toast } from "sonner";
import imageProductoNotFound from "./../../../../../assets/productNotFound.png"
import { TableLayout, TableHead, TableBody, Th, Td, TableActions, TablePagination } from "./../../../../../shared/components/componetsCrud/table/TableComponents";
import LoadingSpinner from "../../../../../shared/components/loadings/loadingSpinner/LoadingSpinner";
import { dateFormat } from "../../../../../shared/utils/dateUtils";

export default function ProductList() {

    const { error, loading, numberPage, totalPage, setName, name, products, prevPage, nextPage, fetchProductList } = useProductList();


    //Search by Name


    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    // ---------- DELETE STATE ----------
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setproductToDelete] = useState<any>(null);

    const { loading: deleting, remove } = useDeleteEntity(deleteProduct);

    const openDeleteModal = (product: any) => {
        setproductToDelete(product);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setproductToDelete(null);
    };

    const confirmDelete = async () => {
        if (!productToDelete) return;

        await remove(productToDelete.idProduct);
        closeDeleteModal();
        fetchProductList();
        toast.success("Producto eliminado con exito.");
    };



    return (
        <div className="productList__container-global">

            {/* ---------- DELETE MODAL ---------- */}

            {showDeleteModal && productToDelete && (
                <ConfirmDeleteModal
                    title="Eliminar Producto"
                    description={`Estas a punto de eliminar permanentemente el producto "${productToDelete.name}". Esta acción es irreversible.`}
                    loading={deleting}
                    onConfirm={confirmDelete}
                    onClose={closeDeleteModal}
                />
            )}

            <div className="productList__container-top">

                <div className="productList__container-search">
                    <FaSearch className="productList__icon-search" size={13} />
                    <input
                        name="name"
                        className='productList__input-search'
                        type="search"
                        placeholder="Buscar producto..."
                        onChange={onInputChange}
                        value={name}
                    />
                </div>

                <ButtonCasual linkRedireccion="/admin/product/create" mensagge="+ Nuevo Producto" />
            </div>

            {loading ? <LoadingSpinner /> : (
                <TableLayout>

                    <TableHead>
                        <tr>
                            <Th>ID</Th>
                            <Th>FOTO</Th>
                            <Th>NOMBRE</Th>
                            <Th>TIPO</Th>
                            <Th>PRECIO</Th>
                            <Th>STOCK</Th>
                            <Th>DISPONIBILIDAD</Th>
                            <Th>FECHA DE CREACIÓN</Th>
                            <Th>FECHA DE ACTUALIZACIÓN</Th>
                            <Th>CREADO POR</Th>
                            <Th>ACTUALIZADO POR</Th>
                            <Th>ACCIONES</Th>
                        </tr>
                    </TableHead>

                    <TableBody>
                        {products.map((product) => (
                            <tr key={product.idProduct}>

                                <Td>{product.idProduct}</Td>

                                <Td>
                                    <div className="tableComponents__container-img">
                                        <img className="tableComponents__img" src={product.imageUrl ? product.imageUrl : imageProductoNotFound} alt="" />
                                    </div>
                                </Td>

                                <Td>{product.name}</Td>
                                <Td>{product.productType === "SIDE" ? "Acompañamiento" : product.productType === "INGREDIENT" ? "Ingrediente" : "Bebida"}</Td>
                                <Td>{`$${product.price}`}</Td>
                                <Td>{product.quantity}</Td>


                                <Td><span className={`tableComponents__span-${product.availability ? "green" : "red"}`}> {product.availability ? "Disponible" : "No disponible"} </span> </Td>


                                <Td>{dateFormat(product.createdAt)}</Td>
                                <Td>{dateFormat(product.updatedAt)}</Td>
                                <Td>{product.createdBy ?? "---"}</Td>
                                <Td>{product.updatedBy ?? "---"}</Td>

                                <Td>
                                    <TableActions
                                        linkEdit={`/admin/product/update/${product.idProduct}`}
                                        onDelete={() => openDeleteModal(product)}
                                    />
                                </Td>

                            </tr>
                        ))}
                    </TableBody>

                </TableLayout>
            )}



            <TablePagination numberPage={numberPage} totalPage={totalPage} onNext={nextPage} onPrev={prevPage} />


        </div>
    );
}