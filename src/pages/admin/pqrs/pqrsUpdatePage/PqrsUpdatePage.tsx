import React from 'react'
import AdminSidebar from '../../components/adminSidebar/AdminSidebar'
import "./pqrsUpdatePage.css"
import PqrsForm from '../../../../shared/components/pqrsForm/PqrsForm'

export default function PqrsUpdatePage() {
    return (
    <div className="pqrsUpdatePage__container-global">
        <AdminSidebar/>
        <div className="pqrsUpdatePage__container-content">
            <PqrsForm/>
        </div>
    </div>
  )
}
