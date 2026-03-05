import React from 'react'
import "./listBurgerPage.css"
import AdminSidebar from '../../components/adminSidebar/AdminSidebar'
import ListBurger from '../../../../features/admin/burger/ui/listBurger/ListBurger'

export default function ListBurgerPage() {
  return (
    <div className="listBurgerPage__container-global">
      <AdminSidebar />
      <div className="listBurgerPage__container-content">
        <ListBurger/>
      </div>
    </div>
  )
}
