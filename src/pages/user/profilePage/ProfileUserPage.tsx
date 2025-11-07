import React from 'react'
import UpdateProfile from '../../../features/user/profile/ui/UpdateProfile'
import "./profileUser.css"
import Navbar from '../../../shared/components/navbar/Navbar'
import { useAuthStore } from '../../../shared/store/useAuthStore';
import { Link } from 'react-router-dom';
import { GrUserAdmin } from "react-icons/gr";
import ButtonLogout from '../../../shared/components/buttonLogout/ButtonLogout';



export default function ProfileUserPage() {

  const { isAdmin} = useAuthStore();

  return (
    <div className="profileUser__container-global">
        <Navbar/>
        <UpdateProfile/>
        <div className="profileUser__container-buttons">
          <ButtonLogout/>
          {
            isAdmin ? <Link className='profileUser__link' to={"/admin/users-list"}><GrUserAdmin size={27}/> Dashboard Administrador</Link> : null
          }
        </div>
    </div>
  )
}
