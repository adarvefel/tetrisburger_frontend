import React from 'react'
import "./createMenuPage.css"
import AdminSidebar from '../../components/adminSidebar/AdminSidebar'
import CreateMenu from '../../../../features/admin/menu/ui/createMenu/CreateMenu'

export default function CreateMenuPage() {
  return (
    <div className="createMenuPage__container-global">
      <AdminSidebar />

      <div className="createMenuPage__container-content">
        <CreateMenu />
      </div>
    </div>
  )
}
