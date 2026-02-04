import React from 'react'
import "./productsCreatePage.css"
import AdminSidebar2 from '../../components/adminSidebar/AdminSidebar'
import ProductCreate from '../../../../features/admin/product/ui/productCreate/productCreate'

export default function ProductsCreatePage() {
  return (
    <div className="productsCreate__container-global">
        <AdminSidebar2/>
        <div className="productsCreate__container-content">
            <ProductCreate/> 
        </div>
    </div>
  )
}