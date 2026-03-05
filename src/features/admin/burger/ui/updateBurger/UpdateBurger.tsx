import React, { useEffect } from 'react'
import { useFindByIdBurger } from '../../hooks/useFindByIdBurger';
import { useParams } from 'react-router-dom';
import BurgerCustomForm from '../../../../../shared/components/formsCruds/burgerCustomForm/BurgerCustomForm';

export default function UpdateBurger() {


    const { bruger, handleFindByIdBurger } = useFindByIdBurger();


    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            handleFindByIdBurger(Number(id));
        }
    }, [id])

    const handleTestSubmit = async (data: any) => {
        console.log("Datos enviados del formulario:");
        console.log(data);

        return Promise.resolve(data);
    };

    return (
        <BurgerCustomForm mode='admin-create' initialData={bruger} onSubmit={handleTestSubmit} />
    )
}
