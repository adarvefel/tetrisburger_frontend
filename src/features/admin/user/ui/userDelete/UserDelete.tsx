import React, { useState } from 'react'
import { AiOutlineWarning } from "react-icons/ai";
import "./userDelete.css"
import { useUserDelete } from '../../hooks/useUserDelete';
import { UserFectchList } from '../../dto/usersAdminDto';

interface Props {
    user: UserFectchList;
    onClose: () => void;
    onDeleted: () => void;
}

export default function UserDelete(props: Props) {

    const { user, onClose, onDeleted } = props;


    const { loading, error, removeUser } = useUserDelete();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            const response = await removeUser(user.idUser);
            if (response !== undefined) {
                onDeleted();
                onClose();
            }
        }catch(err: any){
            console.log(err || "error al eliminar el user")
        }
        
        
        
    }



    return (

        <div className="userDelete__container">
            <form onSubmit={onSubmit} className='userDelete__form' action="">
                <div className="userDelete__container-icono">
                    <AiOutlineWarning size={38} color='#F87171' />
                </div>
                <div className="userDelete__container-encabezado">
                    <p className='userDelete__p-encabezado'>¿Seguro de eliminar este usuario permanentemente?</p>
                </div>
                <div className="userDelete__container-texto">
                    <p className='userDelete__p-texto'>Estas apunto de eliminar eliminar permanentemente <strong className='userDelete__strong'>{user.email}</strong>. Esta accion es irreversible. Se perderan todos los datos asociados a este usuario.</p>
                </div>
                <div className="userDelete__container-button">
                    <button className='userDelete__button-acept' disabled={loading ? true : false} type='submit'>Eliminar usuario</button>
                    <button className='userDelete__button-cancel' type='button' onClick={onClose}>Cancelar</button>
                </div>
            </form>
        </div>

    )
}
