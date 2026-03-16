import React, { useEffect } from 'react'
import "./menuDetails.css"
import { useParams } from 'react-router-dom'
import { useFindByIdMenu } from '../../admin/menu/hooks/useFindByIdMenu';
import photoNotFound from "../../../assets/productNotFound.png"
import CardProduct from '../../../shared/components/cardProduct/CardProduct';
import LoadingSpinner from '../../../shared/components/loadings/loadingSpinner/LoadingSpinner';
import Line from '../../../shared/components/componetsCrud/fields/line/Line';

export default function MenuDetails() {

    const { menuId } = useParams();

    const { loading, menu, error, handleFindByIdMenu } = useFindByIdMenu();

    useEffect(() => {
        handleFindByIdMenu(Number(menuId));
    }, [menuId])

    if (loading) return <LoadingSpinner />

    return (
        <div className='menuDetails__container'>

            <div className="menuDetails__header">

                <img
                    className="menuDetails__image"
                    src={menu?.imageUrl ?? photoNotFound}
                    alt={menu?.name}
                />

                <div className="menuDetails__info">

                    <span className="menuDetails__category">
                        {menu?.menuCategory?.menuCategoryName}
                    </span>

                    <h1 className="menuDetails__title">
                        {menu?.name}
                    </h1>

                    <p className="menuDetails__description">
                        {menu?.description}
                    </p>

                </div>

            </div>

            <Line/>


            <div className="menuDetails__items">

                <h2 className="menuDetails__items-title">
                    Incluye este menú
                </h2>

                <div className="menuDetails__items-list">

                    {menu?.items.map((item) => (

                        item.itemType === "BURGER" ?

                            <CardProduct
                                key={item.idMenuItem}
                                typeProduct="BURGER"
                                name={item.burger?.name ?? "Error"}
                                available={true}
                                description={item.burger?.description ?? ""}
                                id={item.burger?.idBurger ?? 0}
                                imageUrl={item.burger?.imageUrl ?? photoNotFound}
                                price={item.burger?.finalPrice ?? 0}
                            />

                            :

                            <CardProduct
                                key={item.idMenuItem}
                                typeProduct="PRODUCT"
                                name={item.product?.name ?? "Error"}
                                available={true}
                                description={item.product?.description ?? "Error"}
                                id={item.product?.idProduct ?? 0}
                                imageUrl={item.product?.imageUrl ?? photoNotFound}
                                price={item.product?.price ?? 0}
                            />

                    ))}

                </div>

            </div>

        </div>
    )
}