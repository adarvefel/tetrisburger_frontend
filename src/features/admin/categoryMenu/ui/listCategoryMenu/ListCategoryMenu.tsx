import React, { useState } from 'react'
import { TableActions, TableBody, TableHead, TableLayout, TablePagination, Td, Th } from '../../../../../shared/components/componetsCrud/table/TableComponents';
import "./listCategoryMenu.css"
import ConfirmDeleteModal from '../../../../../shared/components/confirmDeleteModal/ConfirmDeleteModal';
import { toast } from 'sonner';
import { useDeleteEntity } from '../../../../../shared/hooks/useDeleteEntity';
import { deleteCategoryMenu } from '../../../../../entities/categoryMenu/api/categoryMenuApi';
import ButtonCasual from '../../../../../shared/components/buttonCasual/ButtonCasual';
import { useListCategoryMenu } from '../../hooks/useListCategoryMenu';
import LoadingSpinner from '../../../../../shared/components/loadings/loadingSpinner/LoadingSpinner';
import { dateFormat } from '../../../../../shared/utils/dateUtils';

export default function ListCategoryMenu() {

    const { loading, error, categorysMenu, numberPage, totalPage, nextPage, prevPage, handleListCategoryMenu } = useListCategoryMenu();

    // ---------- DELETE STATE ----------
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<any>(null);

    const { loading: deleting, remove } = useDeleteEntity(deleteCategoryMenu);

    const openDeleteModal = (item: any) => {
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setItemToDelete(null);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;

        await remove(itemToDelete.idMenuCategory);
        closeDeleteModal();
        handleListCategoryMenu();
        toast.success("Categoria menu eliminado con exito.");
    };

    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <div className="listCategoryMenu__container-global">

            {/* ---------- DELETE MODAL ---------- */}

            {showDeleteModal && itemToDelete && (
                <ConfirmDeleteModal
                    title="Eliminar Categoria menu"
                    description={`Estas a punto de eliminar permanentemente la Categoria menu con nombre "${itemToDelete.menuCategoryName}". Esta acción es irreversible.`}
                    loading={deleting}
                    onConfirm={confirmDelete}
                    onClose={closeDeleteModal}
                />
            )}


            <div className="listCategoryMenu__container-top">


                <ButtonCasual linkRedireccion='/admin/category-menu-create' mensagge='+ Nueva categoria menu' />

            </div>

            <TableLayout>

                <TableHead>
                    <tr>
                        <Th>ID</Th>
                        <Th>NOMBRE</Th>
                        <Th>DESCRIPCION</Th>
                        <Th>FECHA DE CREACIÓN</Th>
                        <Th>FECHA DE ACTUALIZACIÓN</Th>
                        <Th>CREADO POR</Th>
                        <Th>ACTUALIZADO POR</Th>
                        <Th>ACCIONES</Th>
                    </tr>
                </TableHead>

                <TableBody>
                    {categorysMenu?.map((categoryMenu) => (
                        <tr key={categoryMenu.idMenuCategory}>

                            <Td>{categoryMenu.idMenuCategory}</Td>
                            <Td>{categoryMenu.menuCategoryName}</Td>
                            <Td>{categoryMenu.description}</Td>

                            <Td>{dateFormat(categoryMenu.createdAt)}</Td>
                            <Td>{dateFormat(categoryMenu.updatedAt)}</Td>
                            <Td>{categoryMenu.createdBy ?? "---"}</Td>
                            <Td>{categoryMenu.updatedBy ?? "---"}</Td>


                            <Td>
                                <TableActions
                                    linkEdit={`/admin/category-menu/update/${categoryMenu.idMenuCategory}`}
                                    onDelete={() => openDeleteModal(categoryMenu)}
                                />
                            </Td>

                        </tr>
                    ))}
                </TableBody>

            </TableLayout>

            <TablePagination numberPage={numberPage} totalPage={totalPage} onNext={nextPage} onPrev={prevPage} />

        </div>
    )
}
