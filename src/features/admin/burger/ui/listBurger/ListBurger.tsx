import React, { useState } from 'react'
import "./listBurger.css"
import { useListBurger } from '../../hooks/useListBurger'
import { TableActions, TableBody, TableHead, TableLayout, TablePagination, Td, Th } from '../../../../../shared/components/componetsCrud/table/TableComponents';
import ButtonCasual from '../../../../../shared/components/buttonCasual/ButtonCasual';
import InputSearch from '../../../../../shared/components/componetsCrud/fields/inputSearch/InputSearch';
import ConfirmDeleteModal from '../../../../../shared/components/confirmDeleteModal/ConfirmDeleteModal';
import photoBurgerNotFound from "../../../../../assets/burgerNotFound.png"
import { useDeleteEntity } from '../../../../../shared/hooks/useDeleteEntity';
import { toast } from 'sonner';
import { deleteBurger } from '../../../../../entities/burger/api/burgerApi';
import LoadingSpinner from '../../../../../shared/components/loadings/loadingSpinner/LoadingSpinner';
import { dateFormat } from '../../../../../shared/utils/dateUtils';


export default function ListBurger() {

    const { loading, error, burgers, numberPage, totalPage, nextPage, prevPage, handleListBurgers, name, setName } = useListBurger();


    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }


    // ---------- DELETE STATE ----------
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<any>(null);

    const { loading: deleting, remove } = useDeleteEntity(deleteBurger);

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

        await remove(itemToDelete.idBurger);
        closeDeleteModal();
        handleListBurgers();
        toast.success("Hamburguesa eliminado con exito.");
    };



    return (
        <div className="listBurger__container-global">

            {/* ---------- DELETE MODAL ---------- */}

            {showDeleteModal && itemToDelete && (
                <ConfirmDeleteModal
                    title="Eliminar Hamburguesa"
                    description={`Estas a punto de eliminar permanentemente la Hamburguesa con nombre "${itemToDelete.name}". Esta acción es irreversible.`}
                    loading={deleting}
                    onConfirm={confirmDelete}
                    onClose={closeDeleteModal}
                />
            )}


            <div className="listBurger__container-top">

                <div className="listBurger__container-input-search">
                    <InputSearch placeholder='Buscar por nombre ...' name='name' onChange={onInputChange} value={name} />
                </div>

                <ButtonCasual linkRedireccion='/admin/burger-create' mensagge='+ Nueva Hamburguesa' />

            </div>

            {loading ? <LoadingSpinner /> : (
                <TableLayout>

                    <TableHead>
                        <tr>
                            <Th>ID</Th>
                            <Th>FOTO</Th>
                            <Th>NOMBRE</Th>
                            <Th>PRECIO FINAL</Th>
                            <Th>DISPONIBILIDAD</Th>
                            <Th>FECHA DE CREACIÓN</Th>
                            <Th>FECHA DE ACTUALIZACIÓN</Th>
                            <Th>CREADO POR</Th>
                            <Th>ACTUALIZADO POR</Th>
                            <Th>ACCIONES</Th>
                        </tr>
                    </TableHead>

                    <TableBody>
                        {burgers?.map((burger) => (
                            <tr key={burger.idBurger}>

                                <Td>{burger.idBurger}</Td>

                                <Td>
                                    <div className="tableComponents__container-img">
                                        <img className="tableComponents__img" src={burger.imageUrl ? burger.imageUrl : photoBurgerNotFound} alt="" />
                                    </div>
                                </Td>

                                <Td>{burger.name}</Td>
                                <Td>${burger.finalPrice}</Td>

                                <Td><span className={`tableComponents__span-${burger.availability ? "green" : "red"}`}> {burger.availability ? "DIsponible" : "No disponible"} </span> </Td>

                                <Td>{dateFormat(burger.createdAt)}</Td>
                                <Td>{dateFormat(burger.updatedAt)}</Td>
                                <Td>{burger.createdBy ?? "---"}</Td>
                                <Td>{burger.updatedBy ?? "---"}</Td>
                                <Td>
                                    <TableActions
                                        linkEdit={`/admin/burger/update/${burger.idBurger}`}
                                        onDelete={() => openDeleteModal(burger)}
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
