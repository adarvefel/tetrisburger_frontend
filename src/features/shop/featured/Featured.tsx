import React from 'react'
import "./featured.css"
import useListFeatured from '../../user/burgerCustom/hooks/useListFeatured'
import LoadingSpinner from '../../../shared/components/loadings/loadingSpinner/LoadingSpinner';
import CardProduct from '../../../shared/components/cardProduct/CardProduct';

export default function Featured() {

    const {burgersFeatured, loading, handleListFeatured} = useListFeatured();

    return (
        <div className="burgers__container">

            <div className='burgers'>
                {loading ? <LoadingSpinner /> :

                    burgersFeatured.map((burger) => (
                        <CardProduct key={burger.idBurger}
                            id={burger.idBurger}
                            imageUrl={burger.imageUrl}
                            available={burger.availability}
                            description={burger.description}
                            name={burger.name}
                            price={burger.finalPrice}
                            typeProduct="BURGER"
                            ingredients={burger.ingredients.map((ingredient) => ({
                                imageUrl: ingredient.imageUrl,
                                quantity: ingredient.quantity,
                                name: ingredient.productName
                            }))}
                        />
                    ))
                }

            </div>

            
        </div>
    )
}
