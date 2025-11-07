import React from 'react'
import "./usersUpdatePage.css"
import UserUpdate from '../../../../features/admin/user/ui/userUpdate/UserUpdate'
import AdminSidebar from '../../components/adminSidebar/AdminSidebar'

export default function UsersUpdatePage() {
  return (
    <div className="usersUpdatePage__container-global">
        
        <AdminSidebar/>

        <div className="usersUpdatePage__container-content">
            <UserUpdate/>
        </div>
    </div>
  )
}
