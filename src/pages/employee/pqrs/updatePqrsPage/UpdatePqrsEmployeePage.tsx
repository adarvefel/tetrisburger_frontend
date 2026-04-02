import React from 'react'
import "./updatePqrsEmployeePage.css"
import PqrsUpdate from '../../../../features/admin/pqrs/ui/pqrsUpdate/PqrsUpdate'
import EmployeeSidebar from '../../components/employeeSidebar/EmployeeSidebar'

export default function UpdatePqrsEmployeePage() {
    return (
    <div className="pqrsUpdatePage__container-global">
        <EmployeeSidebar/>
        <div className="pqrsUpdatePage__container-content">
            <PqrsUpdate isEmployee/>
        </div>
    </div>
  )
}
