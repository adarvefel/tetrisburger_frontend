import React from 'react'
import "./updateBurgerPage.css"
import UpdateBurger from '../../../../features/admin/burger/ui/updateBurger/UpdateBurger'
import AdminSidebar from '../../components/adminSidebar/AdminSidebar'

export default function UpdateBurgerPage() {
  return (
    <div className="updateBurgerPage___container-global">
      <AdminSidebar />
      <div className="updateBurgerPage___container-content">
        <UpdateBurger />
      </div>
    </div>
  )
}
