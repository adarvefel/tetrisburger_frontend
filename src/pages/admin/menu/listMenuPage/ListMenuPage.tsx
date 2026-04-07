import React from 'react'
import "./listMenuPage.css"
import AdminSidebar from '../../components/adminSidebar/AdminSidebar'
import ListMenu from '../../../../features/admin/menu/ui/listMenu/ListMenu'

export default function ListMenuPage() {
  return (
    <div className="listMenuPage__container-global">
      <AdminSidebar />
      <div className="listMenuPage__container-content">
        <ListMenu />
      </div>
    </div>
  )
}
