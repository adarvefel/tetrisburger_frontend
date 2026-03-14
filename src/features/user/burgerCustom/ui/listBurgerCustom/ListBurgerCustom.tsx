import React, { useState } from 'react'
import "./listBurgerCustom.css"
import SubTittleCrud from '../../../../../shared/components/componetsCrud/subTittle/SubTittleCrud'
import { FaListUl, FaShoppingCart, FaHeart, FaEye } from "react-icons/fa"
import useListFavorites from '../../hooks/useListFavorites'
import LoadingSpinner from '../../../../../shared/components/loadings/loadingSpinner/LoadingSpinner'
import burgerCustom from "../../../../../assets/burgerCustom.png"
import { useCartStore } from '../../../../../shared/store/useCartStore'
import ConfirmDeleteModal from '../../../../../shared/components/confirmDeleteModal/ConfirmDeleteModal'
import { useDeleteEntity } from '../../../../../shared/hooks/useDeleteEntity'
import { deleteBurgerFavorite } from '../../api/burgerCustomApi'
import { toast } from 'sonner'

export default function ListBurgerCustom() {

  const { error, loading, burgersFavorites, handleListFavorites } = useListFavorites()
  const addProduct = useCartStore((state) => state.addProduct)

  const handleAddToCart = (burger: any) => {

    addProduct({
      typeProduct: "BURGER",
      idProduct: burger.burger.idBurger,
      name: burger.burger.name,
      price: burger.burger.finalPrice,
      imageUrl: burgerCustom
    })
  }

  // ---------- DELETE STATE ----------
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<any>(null)

  const { loading: deleting, remove } = useDeleteEntity(deleteBurgerFavorite)

  const openDeleteModal = (item: any) => {
    setItemToDelete(item)
    setShowDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
    setItemToDelete(null)
  }

  const confirmDelete = async () => {
    if (!itemToDelete) return

    await remove(itemToDelete.burger.idBurger)

    closeDeleteModal()
    handleListFavorites()

    toast.success("Hamburguesa quitada de favoritos con éxito")
  }

  return (
    <div className='listBurgerCustom__container'>

      {/* DELETE MODAL */}
      {showDeleteModal && itemToDelete && (
        <ConfirmDeleteModal
          title="¿Quitar Hamburguesa de favoritos?"
          description={`Estas a punto de eliminar permanentemente la hamburguesa "${itemToDelete.burger.name}". Esta acción es irreversible.`}
          loading={deleting}
          onConfirm={confirmDelete}
          onClose={closeDeleteModal}
        />
      )}

      <SubTittleCrud
        title='Lista de hamburguesas guardadas.'
        icon={<FaListUl color='red' size={18} />}
      />

      {loading && <LoadingSpinner />}

      {!loading && !error && burgersFavorites.length === 0 && (
        <p className='listBurgerCustom__empty'>
          No tienes hamburguesas personalizadas guardadas.
        </p>
      )}

      {!loading && !error && burgersFavorites.length > 0 && (

        <div className='listBurgerCustom__grid'>

          {burgersFavorites.map((burger) => (

            <div key={burger.idFavorite} className='burgerCard'>

              <div className='burgerCard__image'>
                <img
                  src={burgerCustom}
                  alt="Hamburguesa personalizada"
                />
              </div>

              <div className='burgerCard__info'>
                <h3 className='burgerCard__name'>
                  {burger.burger.name}
                </h3>

                <p className='burgerCard__price'>
                  ${burger.burger.finalPrice.toLocaleString()}
                </p>
              </div>

              <div className='burgerCard__actions'>

                <button
                  className='burgerCard__btn cart'
                  onClick={() => handleAddToCart(burger)}
                >
                  <FaShoppingCart />
                </button>

                <button className='burgerCard__btn view'>
                  <FaEye />
                </button>

                <button
                  className='burgerCard__btn favorite'
                  onClick={() => openDeleteModal(burger)}
                >
                  <FaHeart />
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  )
}
