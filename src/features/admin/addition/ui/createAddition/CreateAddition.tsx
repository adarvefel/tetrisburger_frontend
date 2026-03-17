import React from 'react'
import "./createAddition.css"
import AdditionForm from '../../../../../shared/components/formsCruds/additionForm/AdditionForm'
import useCreateAddition from '../../hooks/useCreateAddition'

export default function CreateAddition() {

  const {loading, handleCreateAdition} = useCreateAddition();

  return (
    <AdditionForm mode='admin-create' onSubmit={handleCreateAdition} loading={loading}/>
  )
}
