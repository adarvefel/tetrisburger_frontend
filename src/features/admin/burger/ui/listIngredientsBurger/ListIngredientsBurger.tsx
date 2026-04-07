import React from 'react'
import "./listIngredientsBurger.css"
import { IngredientsResponseDTO } from '../../../../../entities/burger/dto/burgerDto'
import { useProductCategories } from '../../../product/hooks/useProductCategory'
import { useListIngredientsBurger } from '../../hooks/useListIngredientsBurger'
import SubTittleCrud from '../../../../../shared/components/componetsCrud/subTittle/SubTittleCrud'
import Line from '../../../../../shared/components/componetsCrud/fields/line/Line'
import InputSearch from '../../../../../shared/components/componetsCrud/fields/inputSearch/InputSearch'
import SelectCrud from '../../../../../shared/components/componetsCrud/fields/selectCrud/SelectCrud'
import { TablePagination } from '../../../../../shared/components/componetsCrud/table/TableComponents'
import { GiForkKnifeSpoon } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import photoNotFound from "../../../../../assets/productNotFound.png"
import { useListProducts } from '../../../menu/hooks/useListProducts'
import LoadingSpinner from '../../../../../shared/components/loadings/loadingSpinner/LoadingSpinner'

type FormMode = "menu" | "burger";
interface Props {
  mode?: FormMode;
  onClose: () => void
  onAddIngredient: (data: IngredientsResponseDTO) => void
}

export default function ListIngredientsBurger({ mode = "burger", onClose, onAddIngredient }: Props) {

  const burgerHook = useListIngredientsBurger();
  const productHook = useListProducts();

  const data = mode === "burger" ? burgerHook : productHook;

  const {
    loading,
    error,
    ingredients,
    numberPage,
    totalPage,
    nextPage,
    prevPage,
    productCategoryId,
    setProductCategoryId,
    setName,
    name
  } = data;

  const { items: categories, loading: loadingCategories } = useProductCategories();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setProductCategoryId(value === "" ? undefined : Number(value));
  }

  const onInputChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  return (
    <div className="listIngredientsBurger__container-global">
      <div className="listIngredientsBurger__container">
        <div className="listIngredientsBurger__container-tittle">
          <SubTittleCrud icon={<GiForkKnifeSpoon size={22} color="red" />} title={mode === "burger" ? "Seleccione ingredientes" : "Seleccione productos"} />
          <button className='listIngredientsBurger__button-close' type='button' onClick={onClose}><IoMdClose size={22} color='black' /></button>
        </div>
        <Line />

        <div className="listIngredientsBurger__container-filter">
          <InputSearch placeholder={mode === "burger" ? "Busque ingrediente..." : "Busque producto..."}name='name' onChange={onInputChangeName} value={name} />
          <div><SelectCrud label="Filtrar por categoria" name="productCategoryId" placeholder="Todas las categorias" options={categories.map((cat) => ({ value: String(cat.id), label: cat.name }))} onChange={handleCategoryChange} value={productCategoryId ?? undefined} /></div>
        </div>

        <Line />

        {loading ? <LoadingSpinner /> : (
          <div className="listIngredientsBurger__container-list">

            {
              ingredients.map((ingredient) => (
                <div key={ingredient.idProduct} className="listIngredientsBurger__card-ingredient">

                  <div className="listIngredientsBurger__container-img">
                    <img className='listIngredientsBurger__img' src={ingredient.imageUrl ?? photoNotFound} />
                  </div>

                  <span className='listIngredientsBurger__span'>{ingredient.name}</span>

                  <span className='listIngredientsBurger__span'>${ingredient.price} / unit</span>


                  <span className='listIngredientsBurger__span'>{ingredient.availability ? "Disponible" : "No disponible"}</span>

                  <button className='listIngredientsBurger__button-add' type='button' onClick={() => onAddIngredient(ingredient)}>Agregar</button>

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
