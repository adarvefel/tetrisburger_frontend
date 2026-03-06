import React from 'react'
import "./createBurgerPage.css"
import AdminSidebar from '../../components/adminSidebar/AdminSidebar'
import CreateBurger from '../../../../features/admin/burger/ui/createBurger/CreateBurger'

export default function CreateBurgerPage() {
  return (
    <div className="createBurgerPage__container-global">
      <AdminSidebar />
      <div className="createBurgerPage__container-content">
        <CreateBurger />
      </div>
    </div>
  )
}
