import React from 'react'
import "./listConfigurationsPage.css"
import AdminSidebar from '../../components/adminSidebar/AdminSidebar'
import ButtonCasual from '../../../../shared/components/buttonCasual/ButtonCasual'
import { PiWhatsappLogoDuotone } from "react-icons/pi";
import { FaHamburger } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import ButtonButton from '../../../../shared/components/buttonButton/ButtonButton';
import ListConfigurations from '../../../../features/admin/configuration/ui/listConfigurations/ListConfigurations';

export default function ListConfigurationsPage() {
    return (
        <div className="listConfigurationsPage__container-global">
            <AdminSidebar />
            <div className="listConfigurationsPage__container-content">
                <ListConfigurations/>
            </div>
        </div>
    )
}
