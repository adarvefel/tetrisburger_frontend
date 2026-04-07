import React, { useState } from 'react'
import { useLocation } from "react-router-dom";
import "./products.css"
import ProductFilters, { ProductFilter } from '../../../shared/components/productFilters/ProductFilters';
import Burgers from '../burgers/Burgers';
import Sides from '../sides/Sides';
import Additions from '../additions/Additions';
import Line from '../../../shared/components/componetsCrud/fields/line/Line';
import BurgerCustom from '../burgerCustom/BurgerCustom';
import Featured from '../featured/Featured';

export default function Products() {

  const location = useLocation();
  const initialFilterFromState = location.state?.initialFilter;

  const [filter, setFilter] = useState<ProductFilter>(
    initialFilterFromState || "FEATURED"
  );

  return (
    <div className='products'>
      <ProductFilters
        activeFilter={filter}
        onChangeFilter={setFilter}
      />

      <Line />

      {filter === "FEATURED" && <Featured />}
      {filter === "BURGER" && <Burgers />}
      {filter === "SIDE" && <Sides />}
      {filter === "ADDITION" && <Additions />}
      {filter === "BURGERCUSTOM" && <BurgerCustom />}

    </div>
  )
}