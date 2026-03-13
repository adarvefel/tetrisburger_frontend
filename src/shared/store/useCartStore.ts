import { toast } from "sonner"
import { create } from "zustand"

export interface CartItem {
    typeProduct: "BURGER" | "PRODUCT" | "ADICION"
    idProduct: number
    name: string
    price: number
    imageUrl: string
    quantity: number
}

interface CartStore {
    items: CartItem[]

    addProduct: (product: Omit<CartItem, "quantity">) => void
    increaseQuantity: (type: CartItem["typeProduct"], id: number) => void
    decreaseQuantity: (type: CartItem["typeProduct"], id: number) => void
    removeProduct: (type: CartItem["typeProduct"], id: number) => void
    clearCart: () => void

    loadCart: () => void
    saveCart: (items: CartItem[]) => void

    getTotal: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],

    saveCart: (items) => {
        localStorage.setItem("cart", JSON.stringify(items))
    },

    loadCart: () => {
        const cart = localStorage.getItem("cart")

        if (cart) {
            set({
                items: JSON.parse(cart)
            })
        }
    },

    addProduct: (product) => {
        const items = get().items

        const existing = items.find(
            (item) =>
                item.idProduct === product.idProduct &&
                item.typeProduct === product.typeProduct
        )

        let updatedItems: CartItem[]

        if (existing) {

            updatedItems = items.map((item) =>
                item.idProduct === product.idProduct &&
                    item.typeProduct === product.typeProduct
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )

            toast.info("Producto ya estaba en el carrito, se aumentó la cantidad")

        } else {

            updatedItems = [...items, { ...product, quantity: 1 }]

            toast.success("Producto agregado al carrito")
        }

        get().saveCart(updatedItems)

        set({
            items: updatedItems
        })
    },

    increaseQuantity: (type, id) => {
        const updatedItems = get().items.map((item) =>
            item.idProduct === id && item.typeProduct === type
                ? { ...item, quantity: item.quantity + 1 }
                : item
        )

        get().saveCart(updatedItems)

        set({ items: updatedItems })
    },

    decreaseQuantity: (type, id) => {
        const items = get().items

        const target = items.find(
            (item) => item.idProduct === id && item.typeProduct === type
        )

        if (!target) return

        if (target.quantity === 1) {
            toast.warning("No puedes disminuir más la cantidad")
            return
        }

        const updatedItems = items.map((item) =>
            item.idProduct === id && item.typeProduct === type
                ? { ...item, quantity: item.quantity - 1 }
                : item
        )

        get().saveCart(updatedItems)

        set({ items: updatedItems })
    },

    removeProduct: (type, id) => {

        const updatedItems = get().items.filter(
            (item) =>
                !(item.idProduct === id && item.typeProduct === type)
        )

        get().saveCart(updatedItems)

        set({ items: updatedItems })

        toast.error("Producto eliminado del carrito")
    },

    clearCart: () => {
        localStorage.removeItem("cart")

        set({
            items: []
        })
    },

    getTotal: () =>
        get().items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        )
}))