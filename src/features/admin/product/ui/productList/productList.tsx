import React, { useState} from "react";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

import "./productList.css";
import { Link } from "react-router-dom";
import { useProductList } from "../../hooks/useProdustList";
import { useProductDelete } from "../../hooks/useProductDelete";
import { ProductFetchList } from "../../dto/productsAdminDto";
import ProductDelete from "../productDelete/productDelete";
import SuccessAlert from "../../../../../shared/components/alerts/successAlert/SuccessAlert";
import ButtonHome from "../../../../../shared/components/buttonHome/ButtonHome";
import ButtonCasual from "../../../../../shared/components/buttonCasual/ButtonCasual";
import { FaSearch } from "react-icons/fa";

export default function ProductList() {

    const { error, loading, numberPage, totalPage, products, prevPage, nextPage, fetchProductList } = useProductList();

    const [showModelDelete, setShowModelDelete] = useState(false);
    const [productToDelete, setProductToDelete] = useState<ProductFetchList>();

    const onCloseModelDelete = () => {
        setShowModelDelete(false);
    }

    const onOpenModelDelete = (product: ProductFetchList) => {
        setProductToDelete(product);
        setShowModelDelete(true);
    }

    const [alertSucces, setAlertSucces] = useState<null | string>(null);
    const onClosedAlertSucces = () => {
        setAlertSucces(null);
    }

    const removeSucces = () => {
        setAlertSucces("Producto eliminado con exito.");
        fetchProductList();
    }

    return (
        <div className="productList__container-global">
            {alertSucces ? <SuccessAlert mensaje={alertSucces} onClosed={onClosedAlertSucces} /> : null}
            {showModelDelete && productToDelete ?
                <ProductDelete onClose={onCloseModelDelete} onDeleted={removeSucces} product={productToDelete} /> : null
            }

            <div className="productList__container-top">

                <div className="productList__container-search">
                    <FaSearch className="productList__icon-search" size={13} />
                    <input
                        className='productList__input-search'
                        type="search"
                        placeholder="Buscar producto..."
                    />
                </div>

                <ButtonCasual linkRedireccion="/admin/product/create" mensagge="Nuevo Producto" />
            </div>

            <table className="productList__table">
                <thead className="productList__thead">
                    <tr className="productList__tr">
                        <th className="productList__th">ID</th>
                        <th className="productList__th">Nombre</th>
                        <th className="productList__th">Descripcion</th>
                        <th className="productList__th">Precio</th>
                        <th className="productList__th">Stock</th>
                        <th className="productList__th">Disponibilidad</th>
                        <th className="productList__th">Tipo Producto</th>
                        <th className="productList__th">Acciones</th>
                    </tr>
                </thead>
                <tbody className="productList__tbody">
                    {products.map((product) => (
                        <tr key={product.id} className="productList__tr">
                            <td className="productList__td">{product.id}</td>
                            <td className="productList__td">{product.name}</td>
                            <td className="productList__td">{product.description}</td>
                            <td className="productList__td">${product.price}</td>
                            <td className="productList__td">{product.quantity}</td>
                            <td className="productList__td">{product.availability ? "Disponible" : "No Disponible"}</td>
                            <td className="productList__td">{product.productType}</td>
                            <td className="productList__td">
                                <div className="productList__container-actions">
                                    <Link className="productList__button-edit" to={`/admin/product/update/${product.id}`}><CiEdit size={18} /></Link>
                                    <button className="productList__button-delete" onClick={() => onOpenModelDelete(product)}><MdDeleteOutline size={18} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="productList__container-pages">
                <button className="productList__button" onClick={prevPage} disabled={numberPage == 0}><FaArrowLeft size={18} /></button>
                <p className="userList__p">Pagina {numberPage + 1} de: {totalPage}</p>
                <button className="productList__button" onClick={nextPage} disabled={numberPage + 1 == totalPage}><FaArrowRight size={18} /></button>
            </div>
        </div>
    );
}