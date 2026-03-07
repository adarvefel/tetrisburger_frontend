import React from 'react'
import "./listMenuCategoryPage.css"
import AdminSidebar from '../../components/adminSidebar/AdminSidebar'
import ListCategoryMenu from '../../../../features/admin/categoryMenu/ui/listCategoryMenu/ListCategoryMenu'

export default function ListMenuCategoryPage() {
  return (
    <div className="listCategoryMenuPage__container-global">
      <AdminSidebar />
      <div className="listCategoryMenuPage__container-content">
        <ListCategoryMenu />
      </div>
    </div>
  )
}
