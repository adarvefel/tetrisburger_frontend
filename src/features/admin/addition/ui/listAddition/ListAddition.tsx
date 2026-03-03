import React, { useState } from 'react'
import "./listAddition.css"
import { useListAddition } from '../../hooks/useListAddtion'
import ButtonCasual from '../../../../../shared/components/buttonCasual/ButtonCasual';
import InputSearch from '../../../../../shared/components/componetsCrud/fields/inputSearch/InputSearch';
import { TableActions, TableBody, TableHead, TableLayout, TablePagination, Td, Th } from '../../../../../shared/components/componetsCrud/table/TableComponents';
import photoNotFound from "../../../../../assets/productNotFound.png"
import { toast } from 'sonner';
import { useDeleteEntity } from '../../../../../shared/hooks/useDeleteEntity';
import { deleteAddition } from '../../../../../entities/addition/api/additionApi';
import ConfirmDeleteModal from '../../../../../shared/components/confirmDeleteModal/ConfirmDeleteModal';

export default function ListAddition() {

  const { loading, error, additions, numberPage, totalPage, setName, name, nextPage, prevPage, handleListAdditions } = useListAddition();


  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // ---------- DELETE STATE ----------
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null);

  const { loading: deleting, remove } = useDeleteEntity(deleteAddition);

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

    await remove(itemToDelete.idAddition);
    closeDeleteModal();
    handleListAdditions();
    toast.success("Adicion eliminado con exito.");
  };

  return (
    <div className="listAddition__container-global">

      {/* ---------- DELETE MODAL ---------- */}

      {showDeleteModal && itemToDelete && (
        <ConfirmDeleteModal
          title="Eliminar Adicion"
          description={`Estas a punto de eliminar permanentemente la Adicion con nombre "${itemToDelete.name}". Esta acción es irreversible.`}
          loading={deleting}
          onConfirm={confirmDelete}
          onClose={closeDeleteModal}
        />
      )}


      <div className="listAddition__container-top">

        <div className="listAddition__container-input-search">
          <InputSearch placeholder='Buscar por nombre ...' name='name' onChange={onInputChange} value={name} />
        </div>

        <ButtonCasual linkRedireccion='/admin/addition-create' mensagge='+ Nueva adicion' />

      </div>

      <TableLayout>

        <TableHead>
          <tr>
            <Th>ID</Th>
            <Th>FOTO</Th>
            <Th>NOMBRE</Th>
            <Th>PRECIO</Th>
            <Th>DISPONIBILIDAD</Th>
            <Th>ACCIONES</Th>
          </tr>
        </TableHead>

        <TableBody>
          {additions?.map((addition) => (
            <tr key={addition.idAddition}>

              <Td>{addition.idAddition}</Td>

              <Td>
                <div className="tableComponents__container-img">
                  <img className="tableComponents__img" src={addition.imageUrl ? addition.imageUrl : photoNotFound} alt="" />
                </div>
              </Td>

              <Td>{addition.name}</Td>
              <Td>${addition.price}</Td>

              <Td><span className={`tableComponents__span-${addition.available ? "green" : "red"}`}> {addition.available ? "DIsponible" : "No disponible"} </span> </Td>

              <Td>
                <TableActions
                  linkEdit={`/admin/additions/update/${addition.idAddition}`}
                  onDelete={() => openDeleteModal(addition)}
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
