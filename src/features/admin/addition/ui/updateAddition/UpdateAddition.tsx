import React, { useEffect } from 'react'
import "./updateAddition.css"
import AdditionForm from '../../../../../shared/components/formsCruds/additionForm/AdditionForm'
import { useFindByIdAddition } from '../../hooks/useFindByIdAddition'
import { useUpdateAddition } from '../../hooks/useUpdateAddition';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../../../../shared/components/loadings/loadingSpinner/LoadingSpinner';

export default function UpdateAddition() {

  const {loading: findLoading, addition, handleFindByIdAddition } = useFindByIdAddition();

  const {loading: updateLoading, handleUpdateAddition } = useUpdateAddition();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      handleFindByIdAddition(Number(id));
    }
  }, [id])

  if (findLoading) {
    return <LoadingSpinner/>
  }

  return (
    <AdditionForm mode='admin-update' initialData={addition} onSubmit={(data) => handleUpdateAddition(Number(id), data)} loading={updateLoading}/>
  )
}
