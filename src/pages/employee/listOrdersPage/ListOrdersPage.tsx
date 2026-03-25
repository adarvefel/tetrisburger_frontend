
import React from 'react'
import "./listOrdersPage.css"
import EmployeeSidebar from '../components/employeeSidebar/EmployeeSidebar'
import ListOrder from '../../../features/employee/order/ui/listOrder/ListOrder'


export default function ListOrdersPage() {
    return (
        <div className="listOrdersPage__container-global">
            <EmployeeSidebar />
            <div className="listOrdersPage__container-content">
                <ListOrder/>
            </div>
        </div>
    )
}
