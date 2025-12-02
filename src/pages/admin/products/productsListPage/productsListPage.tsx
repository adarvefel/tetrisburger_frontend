import React from "react";
import "./productsListPage.css"
import ProductList from "../../../../features/admin/product/ui/productList/productList";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";

export default function ProductsListPage() {
    return (
        <div className="productsListPage__container-global">
            <AdminSidebar />
            {<div className="productsListPage__container-content">
                <ProductList />
            </div> }
        </div>
    )
}