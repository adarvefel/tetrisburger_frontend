import React, { useState } from 'react'
import pictureProfle from "./../../../../../assets/photoPerfilUndefined.webp"
import "./userList.css"
import "./../../../../../shared/components/componetsCrud/table/tableComponents.css";
import { useUserList } from '../../hooks/useUserList';
import ButtonCasual from '../../../../../shared/components/buttonCasual/ButtonCasual';
import { FaSearch } from "react-icons/fa";
import ConfirmDeleteModal from '../../../../../shared/components/confirmDeleteModal/ConfirmDeleteModal';
import { useDeleteEntity } from '../../../../../shared/hooks/useDeleteEntity';
import { deleteUser } from '../../../../../entities/user/api/userApi';
import { toast } from 'sonner';
import { TableLayout, TableHead, TableBody, Th, Td, TableActions, TablePagination } from "./../../../../../shared/components/componetsCrud/table/TableComponents";
import LoadingSpinner from '../../../../../shared/components/loadings/loadingSpinner/LoadingSpinner';

export default function UserList() {

    const { error, loading, numberPage, totalPage, setEmail, email, users, prevPage, nextPage, fetchUserList } = useUserList();

    //Search by EMail


    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }


    // ---------- DELETE STATE ----------
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState<any>(null);

    const { loading: deleting, remove } = useDeleteEntity(deleteUser);

    const openDeleteModal = (user: any) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setUserToDelete(null);
    };

    const confirmDelete = async () => {
        if (!userToDelete) return;

        await remove(userToDelete.idUser);
        closeDeleteModal();
        fetchUserList();
        toast.success("Usuario eliminado con exito.");
    };


    return (
        <div className="userList__container-global">

            {/* ---------- DELETE MODAL ---------- */}

            {showDeleteModal && userToDelete && (
                <ConfirmDeleteModal
                    title="Eliminar Usuario"
                    description={`Estas a punto de eliminar permanentemente el Usuario con email "${userToDelete.email}". Esta acción es irreversible.`}
                    loading={deleting}
                    onConfirm={confirmDelete}
                    onClose={closeDeleteModal}
                />
            )}

            <div className="userList__container-top">

                <div className="userList__container-search">
                    <FaSearch className="userList__icon-search" size={13} />
                    <input
                        name='email'
                        className='userList__input-search'
                        type="search"
                        placeholder='Buscar por email'
                        onChange={onInputChange}
                        value={email}
                    />
                </div>

                <ButtonCasual linkRedireccion='/admin/users-create' mensagge='+ Nuevo Usuario' />

            </div>

            {loading ? <LoadingSpinner /> : (
            <TableLayout>

                <TableHead>
                    <tr>
                        <Th>ID</Th>
                        <Th>FOTO</Th>
                        <Th>NOMBRE</Th>
                        <Th>CORREO</Th>
                        <Th>ROL</Th>
                        <Th>ACCIONES</Th>
                    </tr>
                </TableHead>

                <TableBody>
                    {users.map((user) => (
                        <tr key={user.idUser}>

                            <Td>{user.idUser}</Td>

                            <Td>
                                <div className="tableComponents__container-img">
                                    <img className="tableComponents__img" src={user.userImage ? user.userImage : pictureProfle} alt="" />
                                </div>
                            </Td>

                            <Td>{user.userName}</Td>
                            <Td>{user.email}</Td>

                            <Td><span className={`tableComponents__span-${user.role === "ADMIN" ? "red" : user.role === "EMPLOYEE" ? "orange" : "blue"}`}> {user.role === "ADMIN" ? "Administrador" : user.role === "EMPLOYEE" ? "Empleado" : "Cliente"} </span> </Td>

                            <Td>
                                <TableActions
                                    linkEdit={`/admin/users/update/${user.idUser}`}
                                    onDelete={() => openDeleteModal(user)}
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
