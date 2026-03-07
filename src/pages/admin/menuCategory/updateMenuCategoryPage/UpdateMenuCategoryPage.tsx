import React from 'react'
import "./updateMenuCategoryPage.css"
import AdminSidebar from '../../components/adminSidebar/AdminSidebar'
import UpdateCategoryMenu from '../../../../features/admin/categoryMenu/ui/updateCategoryMenu/UpdateCategoryMenu'

export default function UpdateMenuCategoryPage() {
  return (
    <div className="updateCategoryMenuPage__container-global">

      <AdminSidebar />

      <div className="updateCategoryMenuPage__container-content">
        <UpdateCategoryMenu />
      </div>
    </div>
  )
}
