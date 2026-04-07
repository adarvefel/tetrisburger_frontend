import React, { useState } from 'react'
import "./burgerCustom.css"
import CreateBurgerCustom from '../../user/burgerCustom/ui/createBurgerCustom/CreateBurgerCustom'
import ListBurgerCustom from '../../user/burgerCustom/ui/listBurgerCustom/ListBurgerCustom'
import UpdateBurgerCustom from '../../user/burgerCustom/ui/updateBurgerCustom/UpdateBurgerCustom'

export default function BurgerCustom() {

  const [burgerToEdit, setBurgerToEdit] = useState<any>(null)

  return (
    <div className="burgerCustom__container">

      <div className="burgerCustom__container-form">

        {!burgerToEdit ? (
          <CreateBurgerCustom />
        ) : (
          <UpdateBurgerCustom
            burger={burgerToEdit}
            onCancel={() => setBurgerToEdit(null)}
          />
        )}

      </div>

      <div className="burgerCustom__container-list">
        <ListBurgerCustom onEditBurger={setBurgerToEdit} />
      </div>

    </div>
  )
}