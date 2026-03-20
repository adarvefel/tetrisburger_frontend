import React from 'react'
import "./burgers.css"
import { useListBurger } from '../../admin/burger/hooks/useListBurger'
import CardProduct from '../../../shared/components/cardProduct/CardProduct';
import LoadingSpinner from '../../../shared/components/loadings/loadingSpinner/LoadingSpinner';
import InputSearch from '../../../shared/components/componetsCrud/fields/inputSearch/InputSearch';
import { TablePagination } from '../../../shared/components/componetsCrud/table/TableComponents';

export default function Burgers() {

  const { totalPage, prevPage, nextPage, setName, name, numberPage, burgers, loading } = useListBurger();

  const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  return (

    <div className="burgers__container">

      <div className="burgers__container-search">
        <div><InputSearch name={name} placeholder='Buscar Hamburguesa ...' onInput={onInputChange} value={name} /></div>
      </div>

      <div className='burgers'>
        {loading ? <LoadingSpinner /> :

          burgers.map((burger) => (
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

        <TablePagination numberPage={numberPage} onNext={nextPage} onPrev={prevPage} totalPage={totalPage} />

    </div>

  )
}
