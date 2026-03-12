import "./productFilters.css"
import { PiHamburgerFill } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { RiDrinks2Fill } from "react-icons/ri";
import { FaHamburger } from "react-icons/fa";

export type ProductFilter = "BURGER" | "SIDE" | "ADDITION";

interface Props {
    activeFilter: ProductFilter;
    onChangeFilter: (filter: ProductFilter) => void;
}

export default function ProductFilters({ activeFilter, onChangeFilter }: Props) {

    return (
        <div className="productFilters">

            <button
                className={`productFilters__button ${activeFilter === "BURGER" ? "active" : ""}`}
                onClick={() => onChangeFilter("BURGER")}
            >
                <FaHamburger /> Hamburguesas
            </button>

            <button
                className={`productFilters__button ${activeFilter === "SIDE" ? "active" : ""}`}
                onClick={() => onChangeFilter("SIDE")}
            >
                <RiDrinks2Fill /> Acompañantes
            </button>

            <button
                className={`productFilters__button ${activeFilter === "ADDITION" ? "active" : ""}`}
                onClick={() => onChangeFilter("ADDITION")}
            >
                <FaPlus />  Adiciones
            </button>

        </div>
    );
}