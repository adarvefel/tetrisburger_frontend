import React from 'react'
import BurgerCustomForm from '../formsCruds/burgerCustomForm/BurgerCustomForm';

export default function ViewTest() {

    const handleSubmitTest = async (data: any) => {
        console.log("Datos enviados del formulario:", data);

        // simulando llamada al backend
        return Promise.resolve({
            success: true
        });
    };

    return (
        <BurgerCustomForm 
            mode="user-create"
            onSubmit={handleSubmitTest}
        />
    )
}