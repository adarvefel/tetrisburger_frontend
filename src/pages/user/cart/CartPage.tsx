import React from 'react'
import "./cartPage.css"
import AdminSidebar from '../../admin/components/adminSidebar/AdminSidebar'
import Navbar from '../../../shared/components/navbar/Navbar'
import Cart from '../../../features/user/cart/Cart'

export default function CartPage() {
  return (
    <div className="cartPage__container-global">
        <Navbar/>
        <div className="cartPage__container-content">
            <Cart/>
        </div>
    </div>
  )
}
