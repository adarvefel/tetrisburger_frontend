import { useState } from "react";

export function useListBurger() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [burgers, setBurgers] = useState<PqrsFetchList[]>([]);

    const [numberPage, setNumberPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
}