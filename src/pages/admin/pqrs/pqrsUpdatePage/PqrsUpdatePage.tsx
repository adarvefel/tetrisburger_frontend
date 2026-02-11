import React from 'react'
import AdminSidebar from '../../components/adminSidebar/AdminSidebar'
import "./pqrsUpdatePage.css"
import PqrsUpdate from '../../../../features/admin/pqrs/ui/pqrsUpdate/PqrsUpdate'

export default function PqrsUpdatePage() {
    return (
    <div className="pqrsUpdatePage__container-global">
        <AdminSidebar/>
        <div className="pqrsUpdatePage__container-content">
            <PqrsUpdate/>
        </div>
    </div>
  )
}
