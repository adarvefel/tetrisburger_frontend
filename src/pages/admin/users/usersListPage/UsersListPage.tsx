import React from 'react'
import "./usersListPage.css"
import UserList from '../../../../features/admin/user/ui/userList/UserList'
import AdminSidebar from '../../components/adminSidebar/AdminSidebar'

export default function UsersListPage() {
  return (
    <div className="usersListPage__container-global">
        <AdminSidebar/>
        <div className="usersListPage__container-content">
            <UserList/>
        </div>
    </div>
  )
}
