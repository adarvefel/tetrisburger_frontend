
import React from 'react'
import "./listAdditionPage.css"
import AdminSidebar from '../../components/adminSidebar/AdminSidebar'
import ListAddition from '../../../../features/admin/addition/ui/listAddition/ListAddition'


export default function ListAdditionPage() {
    return (
        <div className="listAdditionPage__container-global">
            <AdminSidebar />
            <div className="listAdditionPage__container-content">
                <ListAddition />
            </div>
        </div>
    )
}
