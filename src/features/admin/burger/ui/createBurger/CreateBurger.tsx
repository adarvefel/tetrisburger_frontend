import React from 'react'
import BurgerCustomForm from '../../../../../shared/components/formsCruds/burgerCustomForm/BurgerCustomForm'
import useCreateBurger from '../../hooks/useCreateBurger'

export default function CreateBurger() {

  const {handleCreateBurger} = useCreateBurger();

  return (
    <BurgerCustomForm mode="admin-create" onSubmit={handleCreateBurger} />
  )
}
