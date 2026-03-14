import React from 'react'
import "./burgerCustom.css"
import CreateBurgerCustom from '../../user/burgerCustom/ui/createBurgerCustom/CreateBurgerCustom'
import ListBurgerCustom from '../../user/burgerCustom/ui/listBurgerCustom/ListBurgerCustom'

export default function BurgerCustom() {
  return (
    <div className="burgerCustom__container">
      <div className="burgerCustom__container-form">
        <CreateBurgerCustom />
      </div>
      <div className="burgerCustom__container-list">
        <ListBurgerCustom />
      </div>

    </div>
  )
}
