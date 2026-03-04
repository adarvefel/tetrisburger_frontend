import React, { useEffect } from 'react'
import "./updateAddition.css"
import AdditionForm from '../../../../../shared/components/formsCruds/additionForm/AdditionForm'
import { useFindByIdAddition } from '../../hooks/useFindByIdAddition'
import { useUpdateAddition } from '../../hooks/useUpdateAddition';
import { useParams } from 'react-router-dom';

export default function UpdateAddition() {

  const { addition, handleFindByIdAddition } = useFindByIdAddition();

  const { handleUpdateAddition } = useUpdateAddition();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      handleFindByIdAddition(Number(id));
    }
  }, [id])

  return (
    <AdditionForm mode='admin-update' initialData={addition} onSubmit={(data) => handleUpdateAddition(Number(id), data)} />
  )
}
