import React from 'react'
import "./menuDetailsPage.css"
import Navbar from '../../../../shared/components/navbar/Navbar'
import MenuDetails from '../../../../features/shop/menuDetails/MenuDetails'

export default function MenuDetailsPage() {
    return (
        <div className="menuDetailsPage__container-global">
            <Navbar />
            <div className="menuDetailsPage__container-content">
                <MenuDetails />
            </div>
        </div>

    )
}
