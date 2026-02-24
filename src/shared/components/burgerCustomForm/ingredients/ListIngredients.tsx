import React from 'react'
import "./listIngredients.css"
import { useListIngredients } from './useListIngredients'
import { IngredientsRequestDTO, IngredientsResponseDTO } from './ingredientsDTO'

interface Props {
    onClose: () => void
    newIngredient: (data: IngredientsRequestDTO) => void
}

export default function ListIngredients({ onClose, newIngredient }: Props) {

    const { loading, error, ingredients, handleUseListIngredients } = useListIngredients();



    return (
        <>
            <table className='listIngredients__table'>
                <thead className='listIngredients__thead'>
                    <tr className='listIngredients__tr'>
                        <th className='listIngredients__th'>ID producto</th>
                        <th className='listIngredients__th'>Name</th>
                        <th className='listIngredients__th'>Description</th>
                        <th className='listIngredients__th'>Price</th>
                    </tr>
                </thead>
                <tbody className='listIngredients__tbody'>
                    {
                        ingredients.map((ingredient) => (
                            <tr key={ingredient.idProduct} className='listIngredients__tr'>
                                <td className='listIngredients__td'>{ingredient.idProduct}</td>
                                <td className='listIngredients__td'>{ingredient.name}</td>
                                <td className='listIngredients__td'>{ingredient.description}</td>
                                <td className='listIngredients__td'>{ingredient.price}</td>
                                <td className='listIngredients__td'>
                                    <button className='listIngredients__button' type='button' onClick={() => newIngredient({
                                        idProduct: ingredient.idProduct,
                                        name: ingredient.name,
                                        quantity: 1,
                                        isOptional: false
                                    })}>Agregar</button>
                                </td>

                            </tr>


                        ))}

                </tbody>
            </table>
            <button className='listIngredients__button' type='button' onClick={onClose}>Cancelar</button>
        </>
    )
}
