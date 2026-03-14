import React from 'react'
import "./createBurgerCustom.css"
import BurgerCustomForm from '../../../../../shared/components/formsCruds/burgerCustomForm/BurgerCustomForm'
import useCreateBurgerCustom from '../../hooks/useCreateBurgerCustom'
import TittleCrud from '../../../../../shared/components/componetsCrud/tittle/TittleCrud';

export default function CreateBurgerCustom() {

  const { loading, error, handleCreateBurgerCustom } = useCreateBurgerCustom();

  return (
    <div className="createBurgerCustom__container">
      <TittleCrud tittle='Crea tu propia hamburguesa personalida' description='Une tus gustos, proporciones en una misma hamburguesa'/>
      <BurgerCustomForm mode='user-create' onSubmit={handleCreateBurgerCustom} loading={loading} />
    </div>
  )
}
