import React from 'react'
import { useProductList } from '../../admin/product/hooks/useProdustList'
import CardProduct from '../../../shared/components/cardProduct/CardProduct';
import LoadingSpinner from '../../../shared/components/loadings/loadingSpinner/LoadingSpinner';
import "./sides.css"
import { TablePagination } from '../../../shared/components/componetsCrud/table/TableComponents';
import InputSearch from '../../../shared/components/componetsCrud/fields/inputSearch/InputSearch';
import { useProductCategories } from '../../admin/product/hooks/useProductCategory';
import SelectCrud from '../../../shared/components/componetsCrud/fields/selectCrud/SelectCrud';

export default function Sides() {

  const { totalPage, prevPage, nextPage, setName, numberPage, name, loading, products, productCategoryId, setProductCategoryId } = useProductList();

  const { items: categories, loading: loadingCategories } = useProductCategories();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setProductCategoryId(value === "" ? undefined : Number(value));
  }

  const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  return (
    <div className="sides__container">

      <div className="sides__container-search">
        <div><InputSearch name={name} placeholder='Buscar Adiciones ...' onInput={onInputChange} value={name} /></div>
        <div><SelectCrud label="Filtrar por categoria" name="productCategoryId" placeholder="Todas las categorias" options={categories.map((cat) => ({ value: String(cat.id), label: cat.name }))} onChange={handleCategoryChange} value={productCategoryId ?? undefined} /></div>
      </div>


      <div className='sides'>
        {loading ? <LoadingSpinner /> :

          products.map((product) => (
            <CardProduct key={product.idProduct}
              id={product.idProduct}
              imageUrl={product.imageUrl}
              available={product.availability}
              description={product.description}
              name={product.name}
              price={product.price}
              typeProduct="PRODUCT"

            />
          ))
        }

      </div>

      <TablePagination numberPage={numberPage} onNext={nextPage} onPrev={prevPage} totalPage={totalPage} />
    </div>
  )
}
