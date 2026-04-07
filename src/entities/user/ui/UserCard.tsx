import React from 'react'
import imgPrueba from "./../../../assets/photoPerfilUndefined.webp"
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";


import "./userCard.css"
import { Link } from 'react-router-dom';



interface Props {
    userId: number;
    userName: string;
    userEmail: string;
    userRole: string;

    deleteUser?: () => void;
}

export default function UserCard(props: Props) {


    const {userId, userName, userEmail, userRole, deleteUser} = props; 


    return (
        <div className="userCard__container">
            <div className="userCard__container-top">
                <div className="userCard__container-top-left">
                    <div className="userCard__container-img">
                        <img className='userCard__img' src={imgPrueba} alt={`Foto de perfil de: ${userName}`} />
                    </div>

                    <div className="userCard__container-info-user">
                        <strong className='userCard__p-name'>{userName}</strong>
                        <p className='userCard__p-correo'>{userEmail}</p>
                    </div>
                </div>

                <div className="userCard__container-top-right">
                    <div className="userCard__container-icons">

                        <Link className='userCard__button' to={`/prueba12/${userId}`}><MdEdit size={25} color='black' /></Link>
                        <button className='userCard__button' onClick={ deleteUser}><MdDelete size={25} color='black'  /></button>
                    </div>
                </div>
            </div>

            <div className="userCard__separator"></div>

            <div className="userCard__container-buttom">
                <div className="userCard__container-rol">
                    <strong className='userCard__p-rol'>{userRole}</strong>
                </div>

                <div className="userCard__container-active">
                    <strong className='userCard__p-active'>ID: {userId}</strong>
                </div>
            </div>
        </div>
    )
}
