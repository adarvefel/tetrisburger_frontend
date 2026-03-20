import React, { useState } from 'react'
import "./productsPage.css"
import Navbar from '../../../shared/components/navbar/Navbar'
import ProductFilters, { ProductFilter } from '../../../shared/components/productFilters/ProductFilters';
import Products from '../../../features/shop/products/Products';

export default function ProductsPage() {
  return (
    <div className="productsPage__container-global">
      <Navbar />
      <div className="productsPage__container-content">
        <Products/>
      </div>
    </div>
  )
}
