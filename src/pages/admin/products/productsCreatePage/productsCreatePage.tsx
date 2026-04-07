import React from 'react'
import "./productsCreatePage.css"
import ProductCreate from '../../../../features/admin/product/ui/productCreate/productCreate'
import AdminSidebar from '../../components/adminSidebar/AdminSidebar'

export default function ProductsCreatePage() {
  return (
    <div className="productsCreate__container-global">
        <AdminSidebar/>
        <div className="productsCreate__container-content">
            <ProductCreate/> 
        </div>
    </div>
  )
}