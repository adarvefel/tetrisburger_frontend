import React from 'react'
import "./analitycPage.css"
import AdminSidebar from '../components/adminSidebar/AdminSidebar'
import DashboardMain from '../../../shared/components/test/metrics/dashboardMain/DashboardMain'

export default function AnalitycPage() {
    return (
        <div className="analitycPage__container-global">
            <AdminSidebar />
            <div className="analitycPage__container-content">
                <DashboardMain />
            </div>
        </div>
    )
}
