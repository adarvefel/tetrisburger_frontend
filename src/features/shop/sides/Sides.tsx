import React, { useState } from 'react'
import { usePublicProducts } from '../../../shared/hooks/usePublicProducts'
import { usePublicCategories } from '../../../shared/hooks/usePublicCategories'
import CardProduct from '../../../shared/components/cardProduct/CardProduct'
import LoadingSpinner from '../../../shared/components/loadings/loadingSpinner/LoadingSpinner'
import "./sides.css"
import InputSearch from '../../../shared/components/componetsCrud/fields/inputSearch/InputSearch'
import SelectCrud from '../../../shared/components/componetsCrud/fields/selectCrud/SelectCrud'

export default function Sides() {
    const [name, setName] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

    const { categories } = usePublicCategories()
    const { products, isLoading } = usePublicProducts(undefined, selectedCategory)

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(name.toLowerCase())
    )

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setSelectedCategory(value === "" ? null : Number(value))
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    return (
        <div className="sides__container">
            <div className="sides__container-search">
                <InputSearch
                    name={name}
                    placeholder='Buscar Acompañantes'
                    onInput={onInputChange}
                    value={name}
                />
                <SelectCrud
                    label="Filtrar por categoria"
                    name="productCategoryId"
                    placeholder="Todas las categorias"
                    options={categories.map(cat => ({ value: String(cat.id), label: cat.name }))}
                    onChange={handleCategoryChange}
                    value={selectedCategory !== null ? String(selectedCategory) : ""}  // ← fix
                />
            </div>

            <div className='sides'>
                {isLoading
                    ? <LoadingSpinner />
                    : filtered.map(product => (
                        <CardProduct
                            key={product.idProduct}
                            id={product.idProduct}
                            imageUrl={product.imageUrl ?? ""}
                            available={product.availability}
                            description={product.description}
                            name={product.name}
                            price={product.price}
                            typeProduct="PRODUCT"
                        />
                    ))
                }
            </div>
        </div>
    )
  }
