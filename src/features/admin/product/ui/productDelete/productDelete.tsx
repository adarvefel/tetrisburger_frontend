import React, { useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";
import "./productDelete.css"
import { useProductDelete } from "../../hooks/useProductDelete";
import { ProductFetchList } from "../../dto/productsAdminDto";

interface Props {
    product: ProductFetchList;
    onClose: () => void;
    onDeleted: () => void;
}

export default function ProductDelete(props: Props) {

    const { product, onClose, onDeleted } = props;


    const { loading, error, removeProduct } = useProductDelete();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            const response = await removeProduct(product.id);
            if (response !== undefined) {
                onDeleted();
                onClose();
            }
        }catch(err: any){
            console.log(err || "error al eliminar el producto")
        }



    }



    return (

        <div className="productDelete__container">
            <form onSubmit={onSubmit} className='productDelete__form' action="">
                <div className="productDelete__container-icono">
                    <AiOutlineWarning size={38} color='#F87171' />
                </div>
                <div className="productDelete__container-encabezado">
                    <p className='productDelete__p-encabezado'>¿Seguro de eliminar este producto permanentemente?</p>
                </div>
                <div className="productDelete__container-texto">
                    <p className='productDelete__p-texto'>Estas apunto de eliminar eliminar permanentemente <strong className='productDelete__strong'>{product.name}</strong>. Esta accion es irreversible. Se perderan todos los datos asociados a este producto.</p>
                </div>
                <div className="productDelete__container-button">
                    <button className='productDelete__button-acept' disabled={loading ? true : false} type='submit'>Eliminar producto</button>
                    <button className='productDelete__button-cancel' type='button' onClick={onClose}>Cancelar</button>
                </div>
            </form>
        </div>
        
    )
}