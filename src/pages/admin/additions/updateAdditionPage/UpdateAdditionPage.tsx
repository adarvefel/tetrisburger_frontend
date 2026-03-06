import React from 'react'
import UpdateAddition from '../../../../features/admin/addition/ui/updateAddition/UpdateAddition'
import AdminSidebar from '../../components/adminSidebar/AdminSidebar'
import "./updateAdditionPage.css"

export default function UpdateAdditionPage() {
  return (
    <div className="updateAdditionPage__container-global">
        
        <AdminSidebar/>

        <div className="updateAdditionPage__container-content">
            <UpdateAddition/>
        </div>
    </div>
  )
}
