import { useEffect, useState } from "react"
import { axiosClient } from "../api/axiosClient"
import { endPoints } from "../api/endPoints"
import { toast } from "sonner"

export interface PublicProductCategory {
    id: number
    name: string
}

export interface PublicProduct {
    idProduct: number
    name: string
    description: string
    quantity: number
    price: number
    availability: boolean
    productType: "SIDE" | "BEVERAGE"
    imageUrl: string | null
    productCategory: PublicProductCategory | null
}

interface PublicProductResponse {
    items: PublicProduct[]
    page: number
    size: number
    totalElements: number
    totalPages: number
}

export const usePublicProducts = () => {
    const [products, setProducts] = useState<PublicProduct[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [numberPage, setNumberPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)

    const [productType, setProductType] = useState<"SIDE" | "BEVERAGE" | undefined>()
    const [categoryId, setCategoryId] = useState<number | null>(null)

    const nextPage = () => {
        if (numberPage < totalPage - 1) {
            setNumberPage(prev => prev + 1)
        }
    }

    const prevPage = () => {
        if (numberPage > 0) {
            setNumberPage(prev => prev - 1)
        }
    }

    const handleGetProducts = async () => {
        try {
            setLoading(true)
            setError(null)

            const response = await axiosClient.get<PublicProductResponse>(
                endPoints.public.products.list({
                    productType,
                    categoryId: categoryId ?? undefined,
                    page: numberPage,
                    size: 10,
                })
            )

            setProducts(response.data.items ?? [])
            setTotalPage(response.data.totalPages)

        } catch (err: any) {
            const msg = err.response?.data?.message || "Error al traer los productos"
            setError(msg)
            toast.error(msg)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleGetProducts()
    }, [numberPage, productType, categoryId])

    return {
        products,
        loading,
        error,
        numberPage,
        totalPage,
        productType,
        setProductType,
        categoryId,
        setCategoryId,
        nextPage,
        prevPage,
        handleGetProducts,
    }
}