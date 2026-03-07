import React, { useEffect } from 'react'
import "./updateCategoryMenu.css"
import CategoryMenuForm from '../../../../../shared/components/formsCruds/categoryMenuForm/CategoryMenuForm'
import { useUpdateCategoryMenu } from '../../hooks/useUpdateCategoryMenu'
import { useFindByIdCategoryMenu } from '../../hooks/useFindByIdCategoryMenu';
import { useParams } from 'react-router-dom';

export default function UpdateCategoryMenu() {

  const {handleUpdateCategoryMenu} = useUpdateCategoryMenu();
  const {handleFindByIdCategoryMenu, categoryMenu} = useFindByIdCategoryMenu();

  const {id} = useParams<{id: string}>()

  useEffect(()=>{
    handleFindByIdCategoryMenu(Number(id));
  }, [id])

  return (
    <CategoryMenuForm mode='admin-update' initialData={categoryMenu} onSubmit={(data)=>handleUpdateCategoryMenu(Number(id), data)} />
  )
}
