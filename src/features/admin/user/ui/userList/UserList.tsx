import React, { useState } from 'react'
import pictureProfle from "./../../../../../assets/photoPerfilUndefined.webp"
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

import "./userList.css"
import { Link } from 'react-router-dom';
import { useUserList } from '../../hooks/useUserList';
import { useUserDelete } from '../../hooks/useUserDelete';
import { UserFectchList } from '../../dto/usersAdminDto';
import UserDelete from '../userDelete/UserDelete';
import SuccessAlert from '../../../../../shared/components/alerts/successAlert/SuccessAlert';
import ButtonHome from '../../../../../shared/components/buttonHome/ButtonHome';
import ButtonCasual from '../../../../../shared/components/buttonCasual/ButtonCasual';
import { FaSearch } from "react-icons/fa";
import ConfirmDeleteModal from '../../../../../shared/components/confirmDeleteModal/ConfirmDeleteModal';
import { useDeleteEntity } from '../../../../../shared/hooks/useDeleteEntity';
import { deleteUser } from '../../../../../entities/user/api/userApi';
import { toast } from 'sonner';

export default function UserList() {

    const { error, loading, numberPage, totalPage, setEmail, email, users, prevPage, nextPage, fetchUserList } = useUserList();

    //Search by EMail


    const onInputChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
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

            <table className='userList__table'>
                <thead className='userList__thead'>
                    <tr className='userList__tr'>
                        <th className='userList__th'>ID</th>
                        <th className='userList__th'>FOTO</th>
                        <th className='userList__th'>NOMBRE</th>
                        <th className='userList__th'>EMAIL</th>
                        <th className='userList__th'>ROL</th>
                        <th className='userList__th'>ACCIONES</th>
                    </tr>
                </thead>
                <tbody className='userList__tbody'>
                    {
                        users.map((user) => (

                            <tr key={user.idUser} className='userList__tr'>
                                <td className='userList__td'>{user.idUser}</td>
                                <td className='userList__td'>
                                    <div className="userList__container-img">
                                        <img className='userList__img' src={user.userImage ? user.userImage : pictureProfle} alt="" />
                                    </div>
                                </td>
                                <td className='userList__td'>{user.userName}</td>
                                <td className='userList__td'>{user.email}</td>
                                <td className='userList__td'><p className={
                                    user.role === "ADMIN" ? "userList__p-admin" :
                                        user.role === "EMPLOYEE" ? "userList__p-empleado" :
                                            "userList__p-user"
                                }>{
                                        user.role === "ADMIN" ? "Administrador" :
                                            user.role === "EMPLOYEE" ? "Empleado" :
                                                "Cliente"

                                    }</p></td>
                                <td className='userList__td'>
                                    <div className="userList__container-actions">
                                        <Link className="userList__button-edit" to={`/admin/users/update/${user.idUser}`} ><CiEdit size={18} /></Link>
                                        <button className='userList__button-delete' onClick={() => openDeleteModal(user)}> <MdDeleteOutline size={18} /> </button>
                                    </div>
                                </td>
                            </tr>

                        ))
                    }

                </tbody>
            </table>

            <div className="userList__container-pages">
                <button className='userList__button' onClick={prevPage} disabled={numberPage == 0} ><FaArrowLeft size={18} /></button>
                <p className='userList__p'>Pagina {numberPage + 1} de: {totalPage} </p>
                <button className='userList__button' onClick={nextPage} disabled={numberPage + 1 == totalPage}><FaArrowRight size={18} /></button>
            </div>
        </div>
    )
}
