import React from 'react'
import AdminSidebar from '../components/adminSidebar/AdminSidebar'
import ListOrder from '../../../features/employee/order/ui/listOrder/ListOrder'

export default function ListOrderAdminPage() {
    return (
        <div className="listOrdersPage__container-global">
            <AdminSidebar />
            <div className="listOrdersPage__container-content">
                <ListOrder />
            </div>
        </div>
    )
}
