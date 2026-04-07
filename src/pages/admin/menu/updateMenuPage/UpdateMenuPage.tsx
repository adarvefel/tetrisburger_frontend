import React from 'react'
import "./updateMenuPage.css"
import AdminSidebar from '../../components/adminSidebar/AdminSidebar'
import UpdateMenu from '../../../../features/admin/menu/ui/updateMenu/UpdateMenu'

export default function UpdateMenuPage() {
  return (
    <div className="updateMenuPage__container-global">

      <AdminSidebar />

      <div className="updateMenuPage__container-content">
        <UpdateMenu />
      </div>
    </div>
  )
}
