import React from 'react'
import "./listPqrsEmployeePage.css"
import PqrsList from '../../../../features/admin/pqrs/ui/pqrsList/PqrsList'
import EmployeeSidebar from '../../components/employeeSidebar/EmployeeSidebar'

export default function ListPqrsEmployeePage() {
  return (
    <div className="pqrsListPage__container-global">
      <EmployeeSidebar />

      <div className="pqrsListPage__container-table">
          <PqrsList mode='employee'/>
      </div>
    </div>
  )
}
