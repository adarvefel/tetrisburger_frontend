import React from 'react'
import EmployeeSidebar from '../components/employeeSidebar/EmployeeSidebar'
import ListConfigurations from '../../../features/admin/configuration/ui/listConfigurations/ListConfigurations'

export default function ListConfigurationsEmployeePage() {
    return (
        <div className="listConfigurationsPage__container-global">
            <EmployeeSidebar />
            <div className="listConfigurationsPage__container-content">
                <ListConfigurations isEmployee/>
            </div>
        </div>
    )
}
