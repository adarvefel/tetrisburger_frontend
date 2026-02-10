import React from 'react'
import "./pqrsListPage.css"
import AdminSidebar from '../../components/adminSidebar/AdminSidebar'
import PqrsList from '../../../../features/admin/pqrs/ui/pqrsList/PqrsList'

export default function PqrsListPage() {
  return (
    <div className="pqrsListPage__container-global">
      <AdminSidebar />

      <div className="pqrsListPage__container-table">
          <PqrsList/>
      </div>
    </div>
  )
}
