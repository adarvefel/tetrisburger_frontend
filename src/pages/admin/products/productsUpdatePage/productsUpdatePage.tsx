import React from 'react'
import "./productsUpdatePage.css";
import ProductUpdate from '../../../../features/admin/product/ui/productUpdate/productUpdate';
import AdminSidebar from '../../components/adminSidebar/AdminSidebar';

export default function ProductsUpdatePage() {
    return (
        <div className="productUpdatePage__container-global">

            <AdminSidebar />

            <div className="productUpdatePage__container-content">
                <ProductUpdate />
            </div>
        </div>
    )
}