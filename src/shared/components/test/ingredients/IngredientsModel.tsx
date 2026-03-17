import React from 'react'
import "./ingredientsModel.css"
import SubTittleCrud from '../../componetsCrud/subTittle/SubTittleCrud'
import { GiForkKnifeSpoon } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import InputSearch from '../../componetsCrud/fields/inputSearch/InputSearch';
import SelectCrud from '../../componetsCrud/fields/selectCrud/SelectCrud';
import Line from '../../componetsCrud/fields/line/Line';
import photoNotFound from "./../../../../assets/productNotFound.png"
import { TablePagination } from '../../componetsCrud/table/TableComponents';
import { useIngredientsModel } from './useIngredientsModel';
import { useProductCategories } from '../../../../features/admin/product/hooks/useProductCategory';
import { IngredientsResponseDTO } from '../dto';

interface Props{
    onClose: ()=>void
    onAddIngredient: (data: IngredientsResponseDTO) => void
}

export default function IngredientsModel({onClose, onAddIngredient}: Props) {



    const { loading, error, ingredients, nextPage, numberPage, prevPage, totalPage, handleUseListIngredients, productCategoryId, setProductCategoryId, setName, name } = useIngredientsModel();
    const { items: categories, loading: loadingCategories } = useProductCategories();

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setProductCategoryId(value === "" ? undefined : Number(value))
    }

    const onInputChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    return (
        <div className="ingredientsModel__container-global">
            <div className="ingredientsModel__container">
                <div className="ingredientsModel__container-tittle">
                    <SubTittleCrud icon={<GiForkKnifeSpoon size={22} color="red" />} title='Selecciona ingredientes' />
                    <button className='ingredientsModel__button-close' type='button' onClick={onClose}><IoMdClose size={22} color='black' /></button>
                </div>
                <Line />

                <div className="ingredientsModel__container-filter">
                    <InputSearch placeholder='Busque el ingrediente...' name='name' onChange={onInputChangeName} value={name} />
                    <div><SelectCrud label="Filtrar por categoria" name="productCategoryId" placeholder="Todas las categorias" options={categories.map((cat) => ({ value: String(cat.id), label: cat.name }))} onChange={handleCategoryChange} value={productCategoryId ?? undefined} /></div>
                </div>

                <Line />

                <div className="ingredientsModel__container-list">

                    {
                        ingredients.map((ingredient) => (
                            <div key={ingredient.idProduct} className="ingredientsModel__card-ingredient">

                                <div className="ingredientsModel__container-img">
                                    <img className='ingredientsModel__img' src={ingredient.imageUrl ?? photoNotFound} />
                                </div>

                                <span className='igredientsModel__span'>{ingredient.name}</span>

                                <span className='igredientsModel__span'>${ingredient.price} / unit</span>


                                <span className='igredientsModel__span'>{ingredient.availability ? "Disponible" : "No disponible"}</span>

                                <button className='ingredientsModel_button-add' type='button' onClick={()=>onAddIngredient(ingredient)}>Agregar</button>

                            </div>
                        ))}

                </div>

                <Line />

                <TablePagination numberPage={numberPage} totalPage={totalPage} onNext={nextPage} onPrev={prevPage} />

            </div>
        </div>
    )
}
