import React, { useEffect } from 'react'
import { useFindByIdBurger } from '../../hooks/useFindByIdBurger';
import { useParams } from 'react-router-dom';
import BurgerCustomForm from '../../../../../shared/components/formsCruds/burgerCustomForm/BurgerCustomForm';
import { useUpdateBurger } from '../../hooks/useUpdateBurger';

export default function UpdateBurger() {


    const { bruger, handleFindByIdBurger } = useFindByIdBurger();

    const {handleUpdateBurger} = useUpdateBurger();


    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            handleFindByIdBurger(Number(id));
        }
    }, [id])


    return (
        <BurgerCustomForm mode='admin-update' initialData={bruger} onSubmit={(data)=>handleUpdateBurger(Number(id), data)} />
    )
}
