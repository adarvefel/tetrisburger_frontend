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

export default function UserList() {

    const { error, loading, numberPage, totalPage, users, prevPage, nextPage, fetchUserList } = useUserList();

    const [showModelDelete, setShowModelDelete] = useState(false);
    const [userToDelete, setUserToDelete] = useState<UserFectchList>();

    const onCloseModelDelete = () => {
        setShowModelDelete(false);
    }

    const onOpenModelDelete = (user: UserFectchList) => {
        setUserToDelete(user);
        setShowModelDelete(true);
    }

    const [alertSucces, setAlertSucces] = useState<null | string>(null);
    const onClosedAlertSucces = () => {
        setAlertSucces(null);
    }

    const removeSucces = () => {
        setAlertSucces("Usuario eliminado con exito.");
        fetchUserList();
    }


    return (
        <div className="userList__container-global">
            {alertSucces ? <SuccessAlert mensaje={alertSucces} onClosed={onClosedAlertSucces} /> : null}
            {showModelDelete && userToDelete ?
                <UserDelete onClose={onCloseModelDelete} onDeleted={removeSucces} user={userToDelete} /> : null
            }



            <div className="userList__container-top">

                <div className="userList__container-search">
                    <FaSearch className="userList__icon-search" size={13} />
                    <input
                        className='userList__input-search'
                        type="search"
                        placeholder='Buscar por email'
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
                                        <img className='userList__img' src={pictureProfle} alt="" />
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
                                        <button className='userList__button-delete' onClick={() => onOpenModelDelete(user)}> <MdDeleteOutline size={18} /> </button>
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
