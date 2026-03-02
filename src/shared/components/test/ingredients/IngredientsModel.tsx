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

export default function IngredientsModel() {

    const tipoOptions = [
        { value: "PETITION", label: "Peticion" },
        { value: "COMPLAINT", label: "Queja" },
        { value: "CLAIM", label: "Reclamo" },
        { value: "SUGGESTION", label: "Sugerencia" },
        { value: "REPORT", label: "Denuncia" },
        { value: "CONGRATULATIONS", label: "Felicitaciones" },
    ]

    const { loading, error, ingredients, nextPage, numberPage, prevPage, totalPage, handleUseListIngredients } = useIngredientsModel();

   

    return (
        <div className="ingredientsModel__container-global">
            <div className="ingredientsModel__container">
                <div className="ingredientsModel__container-tittle">
                    <SubTittleCrud icon={<GiForkKnifeSpoon size={22} color="red" />} title='Selecciona ingredientes' />
                    <button className='ingredientsModel__button-close' type='button'><IoMdClose size={22} color='black' /></button>
                </div>
                <Line />

                <div className="ingredientsModel__container-filter">
                    <InputSearch placeholder='Busque el ingrediente...' />
                    <div><SelectCrud label="Filtrar por categoria" name="category" placeholder="Seleccione una categoria..." options={tipoOptions} /></div>
                </div>

                <Line />

                <div className="ingredientsModel__container-list">

                    {
                        ingredients.map((ingredient) => (
                            <div className="ingredientsModel__card-ingredient">

                                <div className="ingredientsModel__container-img">
                                    <img className='ingredientsModel__img' src={ingredient.imageUrl ?? photoNotFound} />
                                </div>

                                <span className='igredientsModel__span'>{ingredient.name}</span>

                                <span className='igredientsModel__span'>${ingredient.price} / unit</span>


                                <span className='igredientsModel__span'>{ingredient.availability ? "Disponible" : "No disponible"}</span>

                                <button className='ingredientsModel_button-add'>Agregar</button>

                            </div>
                        ))}

                </div>

                <Line />

                <TablePagination numberPage={numberPage} totalPage={totalPage} onNext={nextPage} onPrev={prevPage}/>

            </div>
        </div>
    )
}
