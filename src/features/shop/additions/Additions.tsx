import React from 'react'
import LoadingSpinner from '../../../shared/components/loadings/loadingSpinner/LoadingSpinner'
import CardProduct from '../../../shared/components/cardProduct/CardProduct'
import { useListAddition } from '../../admin/addition/hooks/useListAddtion'
import "./additions.css"
import { TablePagination } from '../../../shared/components/componetsCrud/table/TableComponents'
import InputSearch from '../../../shared/components/componetsCrud/fields/inputSearch/InputSearch'
import { useProductCategories } from '../../admin/product/hooks/useProductCategory'

export default function Additions() {

  const { totalPage, prevPage, nextPage, setName, name, numberPage, loading, additions } = useListAddition();

  const onInputChange = async(e:React.ChangeEvent<HTMLInputElement>) =>{
    setName(e.target.value);
  }

  return (

    <div className="additions__container">

      <div className="additions__container-search">
        <div><InputSearch name={name} placeholder='Buscar Adicion ...' onInput={onInputChange} value={name}/></div>
      </div>

      <div className='additions'>



        {loading ? <LoadingSpinner /> :

          additions.map((addition) => (
            <CardProduct key={addition.idAddition}
              id={addition.idAddition}
              imageUrl={addition.imageUrl}
              available={addition.available}
              description={addition.description}
              name={addition.name}
              price={addition.price}
              typeProduct="ADDITION"

            />
          ))
        }

        
      </div>

      <TablePagination numberPage={numberPage} onNext={nextPage} onPrev={prevPage} totalPage={totalPage} />


    </div>
  )
}
