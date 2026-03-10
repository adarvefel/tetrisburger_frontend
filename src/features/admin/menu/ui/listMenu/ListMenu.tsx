import React, { useState } from 'react'
import { TableActions, TableBody, TableHead, TableLayout, TablePagination, Td, Th } from '../../../../../shared/components/componetsCrud/table/TableComponents';
import "./listMenu.css"
import { useListMenu } from '../../hooks/useListMenu';
import ConfirmDeleteModal from '../../../../../shared/components/confirmDeleteModal/ConfirmDeleteModal';
import { useDeleteEntity } from '../../../../../shared/hooks/useDeleteEntity';
import { deleteMenu } from '../../../../../entities/menu/api/menuApi';
import { toast } from 'sonner';
import ButtonCasual from '../../../../../shared/components/buttonCasual/ButtonCasual';
import LoadingSpinner from '../../../../../shared/components/loadings/loadingSpinner/LoadingSpinner';
import photoNotFound from "../../../../../assets/productNotFound.png"

export default function ListMenu() {

    const { loading, error, menus, numberPage, totalPage, nextPage, prevPage, handleListMenu } = useListMenu();

    // ---------- DELETE STATE ----------
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<any>(null);

    const { loading: deleting, remove } = useDeleteEntity(deleteMenu);

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

        await remove(itemToDelete.idMenu);
        closeDeleteModal();
        handleListMenu();
        toast.success("Menu eliminado con exito.");
    };

    return (
        <div className="listMenu__container-global">

            {/* ---------- DELETE MODAL ---------- */}

            {showDeleteModal && itemToDelete && (
                <ConfirmDeleteModal
                    title="Eliminar Menu"
                    description={`Estas a punto de eliminar permanentemente la menu con nombre "${itemToDelete.name}". Esta acción es irreversible.`}
                    loading={deleting}
                    onConfirm={confirmDelete}
                    onClose={closeDeleteModal}
                />
            )}


            <div className="listMenu__container-top">

                <ButtonCasual linkRedireccion='/admin/menu-create' mensagge='+ Nuevo Menu' />

            </div>

            {loading ? <LoadingSpinner /> : (
                <TableLayout>

                    <TableHead>
                        <tr>
                            <Th>ID</Th>
                            <Th>FOTO</Th>
                            <Th>NOMBRE</Th>
                            <Th>DESCRIPCION</Th>
                            <Th>DISPONIBILIDAD</Th>
                            <Th>ACCIONES</Th>
                        </tr>
                    </TableHead>

                    <TableBody>
                        {menus?.map((menu) => (
                            <tr key={menu.idMenu}>

                                <Td>{menu.idMenu}</Td>

                                <Td>
                                    <div className="tableComponents__container-img">
                                        <img className="tableComponents__img" src={menu.imageUrl ? menu.imageUrl : photoNotFound} alt="" />
                                    </div>
                                </Td>

                                <Td>{menu.name}</Td>

                                <Td>{menu.description}</Td>

                                <Td><span className={`tableComponents__span-${menu.isAvailable ? "green" : "red"}`}> {menu.isAvailable ? "DIsponible" : "No disponible"} </span> </Td>

                                <Td>
                                    <TableActions
                                        linkEdit={`/admin/menu/update/${menu.idMenu}`}
                                        onDelete={() => openDeleteModal(menu)}
                                    />
                                </Td>

                            </tr>
                        ))}
                    </TableBody>

                </TableLayout>
            )}

            <TablePagination numberPage={numberPage} totalPage={totalPage} onNext={nextPage} onPrev={prevPage} />

        </div>
    )
}
