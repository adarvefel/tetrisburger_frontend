import React from 'react'
import "./listBurgerCustom.css"
import TittleCrud from '../../../../../shared/components/componetsCrud/tittle/TittleCrud'
import SubTittleCrud from '../../../../../shared/components/componetsCrud/subTittle/SubTittleCrud'
import { FaListUl } from "react-icons/fa";
import useListFavorites from '../../hooks/useListFavorites';
import LoadingSpinner from '../../../../../shared/components/loadings/loadingSpinner/LoadingSpinner';

export default function ListBurgerCustom() {

  const {error, handleListFavorites, loading, burgersFavorites} = useListFavorites();

  

  return (
    <div className='listBurgerCustom__container'>
     <SubTittleCrud title='Lista de hamburguesas guardadas.' icon={<FaListUl color='red' size={18}/>}/>
     {!loading ? (burgersFavorites.map((burger)=>(

        <div>
          {burger.idFavorite}
          {burger.burger.finalPrice}
        </div>

     ))) : <LoadingSpinner/> }
    </div>
  )
}
