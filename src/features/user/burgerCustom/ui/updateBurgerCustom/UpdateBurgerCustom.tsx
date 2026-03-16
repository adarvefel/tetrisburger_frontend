import React, { useMemo, useState } from 'react'
import "./updateBurgerCustom.css"
import BurgerCustomForm from '../../../../../shared/components/formsCruds/burgerCustomForm/BurgerCustomForm'
import useUpdateBurgerCustom from '../../hooks/useUpdateBurgerCustom'
import TittleCrud from '../../../../../shared/components/componetsCrud/tittle/TittleCrud'
import { FaArrowLeft } from "react-icons/fa"



interface Props {
  burger: any
  onCancel: () => void
}


export default function UpdateBurgerCustom({ burger, onCancel }: Props) {

  const { handleUpdateBurgerCustom, loading } = useUpdateBurgerCustom();

  const initialData = useMemo(() => ({
    idBurger: burger.burger.idBurger,
    name: burger.burger.name,
    description: "",
    basePrice: burger.burger.finalPrice,
    finalPrice: burger.burger.finalPrice,
    margin: 0,
    marginPercentage: 0,
    sellingAtLoss: false,
    isOnMenu: false,
    isFeatured: false,
    availability: true,
    imageUrl: burger.burger.imageUrl ?? "",
    timesOrdered: 0,
    ingredients: burger.burger.ingredients
  }), [burger]);

  return (
    <div className="updateBurgerCustom">
      <button
        className="updateBurgerCustom__backBtn"
        onClick={onCancel}
      >
        <FaArrowLeft size={14} />
        Volver a crear hamburguesa
      </button>
      <TittleCrud tittle='Actualiza tu hamburguesa personalida' description='Une tus gustos, proporciones en una misma hamburguesa' />
      <BurgerCustomForm loading={loading} initialData={initialData} mode='user-update' onSubmit={((data) => handleUpdateBurgerCustom(burger.burger.idBurger, data))} />
    </div>

  )
}
