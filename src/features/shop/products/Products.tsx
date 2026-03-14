import React, { useState } from 'react'
import "./products.css"
import ProductFilters, { ProductFilter } from '../../../shared/components/productFilters/ProductFilters';
import Burgers from '../burgers/Burgers';
import Sides from '../sides/Sides';
import Additions from '../additions/Additions';
import Line from '../../../shared/components/componetsCrud/fields/line/Line';
import BurgerCustom from '../burgerCustom/BurgerCustom';

export default function Products() {

  const [filter, setFilter] = useState<ProductFilter>("BURGER");
  return (
    <div className='products'>
      <ProductFilters
        activeFilter={filter}
        onChangeFilter={setFilter}
      />

      <Line/>

      {filter === "BURGER" && <Burgers/>}
      {filter === "SIDE" && <Sides/>}
      {filter === "ADDITION" && <Additions/>}
      {filter === "BURGERCUSTOM" && <BurgerCustom/>}
    </div>
  )
}
