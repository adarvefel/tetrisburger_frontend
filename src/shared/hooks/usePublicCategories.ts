import { useEffect, useState } from "react"
import { axiosClient } from "../api/axiosClient"
import { endPoints } from "../api/endPoints"

export interface PublicCategory {
    id: number
    name: string
}

interface PublicCategoryResponse {
    items: PublicCategory[]
    totalElements: number
}

export const usePublicCategories = () => {
    const [categories, setCategories] = useState<PublicCategory[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        axiosClient
            .get<PublicCategory[]>(endPoints.public.productCategory.list)  
            .then(res => setCategories(res.data ?? []))                    
            .catch(console.error)
            .finally(() => setIsLoading(false))
    }, [])

    return { categories, isLoading }
}