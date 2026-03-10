import React from 'react'
import "./listModelBurgers.css"
import { BurgerResponseDTO, IngredientsResponseDTO } from '../../../../../entities/burger/dto/burgerDto'
import SubTittleCrud from '../../../../../shared/components/componetsCrud/subTittle/SubTittleCrud'
import Line from '../../../../../shared/components/componetsCrud/fields/line/Line'
import InputSearch from '../../../../../shared/components/componetsCrud/fields/inputSearch/InputSearch'
import { TablePagination } from '../../../../../shared/components/componetsCrud/table/TableComponents'
import { GiForkKnifeSpoon } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import photoNotFound from "../../../../../assets/burgerNotFound.png"
import LoadingSpinner from '../../../../../shared/components/loadings/loadingSpinner/LoadingSpinner'
import { useListBurger } from '../../hooks/useListBurger'
import { FaHamburger } from "react-icons/fa";

interface Props {
  onClose: () => void
  onAddIngredient: (data: BurgerResponseDTO) => void
}

export default function ListModelBurgers({onClose, onAddIngredient }: Props) {
  const { loading, error, burgers, numberPage, totalPage, nextPage, prevPage, handleListBurgers, name, setName } = useListBurger();

  const onInputChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  return (
    <div className="listModelBurgers__container-global">
      <div className="listModelBurgers__container">
        <div className="listModelBurgers__container-tittle">
          <SubTittleCrud icon={<FaHamburger  size={22} color="red" />} title='Selecciona hamburguesas' />
          <button className='listModelBurgers__button-close' type='button' onClick={onClose}><IoMdClose size={22} color='black' /></button>
        </div>
        <Line />

        <div className="listModelBurgers__container-filter">
          <InputSearch placeholder='Busque hamburguesa...' name='name' onChange={onInputChangeName} value={name} />
        </div>

        <Line />

        {loading ? <LoadingSpinner /> : (
          <div className="listModelBurgers__container-list">

            {
              burgers.map((burger) => (
                <div key={burger.idBurger} className="listModelBurgers__card-ingredient">

                  <div className="listModelBurgers__container-img">
                    <img className='listModelBurgers__img' src={burger.imageUrl ?? photoNotFound} />
                  </div>

                  <span className='listModelBurgers__span'>{burger.name}</span>

                  <span className='listModelBurgers__span'>${burger.finalPrice} / unit</span>


                  <span className='listModelBurgers__span'>{burger.availability ? "Disponible" : "No disponible"}</span>

                  <button className='listModelBurgers__button-add' type='button' onClick={() => onAddIngredient(burger)}>Agregar</button>

                </div>
              ))}

          </div>
        )}

        <Line />

        <TablePagination numberPage={numberPage} totalPage={totalPage} onNext={nextPage} onPrev={prevPage} />

      </div>
    </div>
  )
}
