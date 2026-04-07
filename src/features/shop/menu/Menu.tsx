import { useNavigate } from 'react-router-dom'
import { useListMenu } from '../../admin/menu/hooks/useListMenu'
import "./menu.css"
import photoNotFound from "../../../assets/productNotFound.png"
import LoadingSpinner from '../../../shared/components/loadings/loadingSpinner/LoadingSpinner'
import ButtonButton from '../../../shared/components/buttonButton/ButtonButton'
import TittleCrud from '../../../shared/components/componetsCrud/tittle/TittleCrud'
import { TablePagination } from '../../../shared/components/componetsCrud/table/TableComponents'

export default function Menu() {

    const { loading, menus, nextPage, numberPage, prevPage, totalPage } = useListMenu()
    const navigate = useNavigate()

    return (

        <div className="menu__container">

            <TittleCrud tittle='Nuestros Menús' description=' Descubre nuestras combinaciones especiales de hamburguesas, bebidas y acompañamientos.
                    Elige tu menú favorito y disfruta de la experiencia TetriBurger.'  />

            <div className="menu__container-card">

                {loading ?
                    <div className="menu__loading">
                        <LoadingSpinner />
                    </div> : menus?.map(menu => (

                        <div
                            key={menu.idMenu}
                            className="menu-card"
                        >

                            <img
                                src={menu.imageUrl ?? photoNotFound}
                                alt={menu.name}
                                className="menu-card__image"
                            />

                            <div className="menu-card__overlay">

                                <h3 className="menu-card__title">
                                    {menu.name}
                                </h3>

                                <ButtonButton
                                    message={menu.isAvailable ? "Ver" : "No disponible"}
                                    disabled={!menu.isAvailable}
                                    onClick={(e) => {
                                        e.stopPropagation()

                                        if (menu.isAvailable) {
                                            navigate(`/menu/${menu.idMenu}`)
                                        }
                                    }}
                                />

                            </div>

                        </div>

                    ))}

            </div>






            <div className="menu__container-pagination">
                <TablePagination numberPage={numberPage} onNext={nextPage} onPrev={prevPage} totalPage={totalPage} />
            </div>


        </div>


    )
}