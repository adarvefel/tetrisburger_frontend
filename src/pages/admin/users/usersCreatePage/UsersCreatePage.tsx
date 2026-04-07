import React from 'react'
import "./usersCreatePage.css"
import AdminSidebar2 from '../../components/adminSidebar/AdminSidebar'
import UserCreate from '../../../../features/admin/user/ui/userCreate/UserCreate'

export default function UsersCreatePage() {
  return (
    <div className="usersCreate__container-global">
        <AdminSidebar2/>

        <div className="usersCreate__container-content">
           <UserCreate/>
        </div>
    </div>
  )
}
