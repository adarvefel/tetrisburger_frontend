import React from 'react'
import CardProduct from '../cardProduct/CardProduct';
import { useListBurger } from '../../../features/admin/burger/hooks/useListBurger';
import { useListProducts } from '../../../features/admin/menu/hooks/useListProducts';
import { useProductList } from '../../../features/admin/product/hooks/useProdustList';
import { useListAddition } from '../../../features/admin/addition/hooks/useListAddtion';

export default function ViewTest() {


    const { burgers } = useListBurger();

    const { products } = useProductList();

    const {additions} = useListAddition();

    return (
        <div>
            {burgers.map((burger) => (
                <CardProduct key={burger.idBurger}
                    id={burger.idBurger}
                    imageUrl={burger.imageUrl}
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
            ))}

            {
                products.map((product) => (
                    <CardProduct key={product.idProduct}
                        id={product.idProduct}
                        imageUrl={product.imageUrl}
                        description={product.description}
                        name={product.name}
                        price={product.price}
                        typeProduct="PRODUCT"

                    />
                ))
            }


            {
                additions.map((addition) => (
                    <CardProduct key={addition.idAddition}
                        id={addition.idAddition}
                        imageUrl={addition.imageUrl}
                        description={addition.description}
                        name={addition.name}
                        price={addition.price}
                        typeProduct="ADICION"

                    />
                ))
            }


        </div>
    )
}
