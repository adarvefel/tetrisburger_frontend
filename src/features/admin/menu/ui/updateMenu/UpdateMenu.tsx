import React, { useEffect } from 'react'
import { useUpdateMenu } from '../../hooks/useUpdateMenu';
import { useFindByIdMenu } from '../../hooks/useFindByIdMenu';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../../../../shared/components/loadings/loadingSpinner/LoadingSpinner';
import MenuForm from '../../../../../shared/components/formsCruds/menuForm/MenuForm';

export default function UpdateMenu() {
    const { loading: updateLoading, handleUpdateMenu } = useUpdateMenu();
    const { loading: findLoading, handleFindByIdMenu, menu } = useFindByIdMenu();

    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        handleFindByIdMenu(Number(id));
    }, [id])

    if (findLoading) {
        return <LoadingSpinner />
    }
    return (
        <MenuForm mode='admin-update' onSubmit={(data) => handleUpdateMenu(Number(id), data)} initialData={menu} loading={updateLoading}/>
    )
}
