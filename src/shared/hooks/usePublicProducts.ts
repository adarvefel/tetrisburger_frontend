import { useEffect, useState } from "react"
import { axiosClient } from "../api/axiosClient"
import { endPoints } from "../api/endPoints"

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

export const usePublicProducts = (
    productType?: "SIDE" | "BEVERAGE",
    categoryId?: number | null
) => {
    const [products, setProducts] = useState<PublicProduct[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        axiosClient
            .get<PublicProductResponse>(
                endPoints.public.products.list({   
                    productType,
                    categoryId: categoryId ?? undefined,
                    page: 0,
                    size: 20,
                })
            )
            .then(res => setProducts(res.data.items ?? []))
            .catch(console.error)
            .finally(() => setIsLoading(false))
    }, [productType, categoryId])

    return { products, isLoading }
}
