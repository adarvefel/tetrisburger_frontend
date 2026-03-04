import React from 'react'
import CreateAddition from '../../../../features/admin/addition/ui/createAddition/CreateAddition'
import AdminSidebar from '../../components/adminSidebar/AdminSidebar'
import "./CreateAdditionPage.css"

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
