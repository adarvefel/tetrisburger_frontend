import React from 'react'
import "./createMenuCategoryPage.css"
import AdminSidebar from '../../components/adminSidebar/AdminSidebar'
import CreateCategoryMenu from '../../../../features/admin/categoryMenu/ui/createCategoryMenu/CreateCategoryMenu'

export default function CreateMenuCategoryPage() {
  return (
    <div className="createCategoryMenuPage__container-global">
      <AdminSidebar />

      <div className="createCategoryMenuPage__container-content">
        <CreateCategoryMenu />
      </div>
    </div>
  )
}
