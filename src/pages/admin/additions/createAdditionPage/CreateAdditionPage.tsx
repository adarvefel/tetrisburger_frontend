import React from 'react'
import "./updateAdditionPage.css"
import CreateAddition from '../../../../features/admin/addition/ui/createAddition/CreateAddition'
import AdminSidebar from '../../components/adminSidebar/AdminSidebar'
import "./updateAdditionPage.css"

export default function CreateAdditionPage() {
  return (
    <div className="createAddtionPage__container-global">
            <AdminSidebar/>
    
            <div className="createAddtionPage__container-content">
               <CreateAddition/>
            </div>
        </div>
  )
}
