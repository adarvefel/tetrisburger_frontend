import { toast } from "sonner"
import { create } from "zustand"
import { useAuthStore } from "./useAuthStore"
import { axiosClient } from "../api/axiosClient"
import { endPoints } from "../api/endPoints"

let syncTimeout: ReturnType<typeof setTimeout> | null = null

export interface CartItem {
    typeProduct: "BURGER" | "PRODUCT" | "ADDITION"
    idProduct: number
    name: string
    price: number
    imageUrl?: string
    quantity: number
}

interface CartStore {
    items: CartItem[]

    addProduct: (product: Omit<CartItem, "quantity">) => void
    increaseQuantity: (type: CartItem["typeProduct"], id: number) => void
    decreaseQuantity: (type: CartItem["typeProduct"], id: number) => void
    removeProduct: (type: CartItem["typeProduct"], id: number) => void
    clearCart: () => void

    loadCart: () => Promise<void>
    saveCart: (items: CartItem[]) => Promise<void>
    
    syncNow: () => Promise<void>
    getTotal: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],

    saveCart: async (items) => {
        localStorage.setItem("cart", JSON.stringify(items))

        if (!useAuthStore.getState().isAuthenticated) return

        if (syncTimeout) clearTimeout(syncTimeout)

        syncTimeout = setTimeout(async () => {
            try {
                await axiosClient.post(endPoints.user.cart.sync, items)
            } catch {
                // fallback a localStorage
            }
        })
    },

    loadCart: async () => {
        if (!useAuthStore.getState().isAuthenticated) {
            const raw = localStorage.getItem("cart")
            if (raw) set({ items: JSON.parse(raw) })
            return
        }

        try {
            const { data } = await axiosClient.get<CartItem[]>(endPoints.user.cart.get)
            localStorage.setItem("cart", JSON.stringify(data))
            set({ items: data })
        } catch {
            const raw = localStorage.getItem("cart")
            if (raw) set({ items: JSON.parse(raw) })
        }
    },

    clearCart: async () => {
        if (syncTimeout) {
            clearTimeout(syncTimeout)
            syncTimeout = null
        }

        localStorage.removeItem("cart")
        set({ items: [] })

        if (!useAuthStore.getState().isAuthenticated) return

        try {
            await axiosClient.delete(endPoints.user.cart.clear)
        } catch {}
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
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                        price: product.price,
                        name: product.name
                    }
                    : item
            )

            toast.info("Producto ya estaba en el carrito, se aumentó la cantidad")
        } else {
            updatedItems = [...items, { ...product, quantity: 1 }]
            toast.success("Producto agregado al carrito")
        }

        set({ items: updatedItems })
        get().saveCart(updatedItems)
    },

    increaseQuantity: (type, id) => {
        const updatedItems = get().items.map((item) =>
            item.idProduct === id && item.typeProduct === type
                ? { ...item, quantity: item.quantity + 1 }
                : item
        )

        set({ items: updatedItems })
        get().saveCart(updatedItems)
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

        set({ items: updatedItems })
        get().saveCart(updatedItems)
    },

    removeProduct: (type, id) => {
        const updatedItems = get().items.filter(
            (item) =>
                !(item.idProduct === id && item.typeProduct === type)
        )

        set({ items: updatedItems })
        get().saveCart(updatedItems)

        toast.error("Producto eliminado del carrito")
    },

    syncNow: async () => {
        if (syncTimeout) {
            clearTimeout(syncTimeout)  
            syncTimeout = null
        }

        if (!useAuthStore.getState().isAuthenticated) return

        try {
            const items = get().items
            await axiosClient.post(endPoints.user.cart.sync, items)
        } catch {
            // fallback silencioso
        }
   },

    getTotal: () =>
        get().items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        ),
}))