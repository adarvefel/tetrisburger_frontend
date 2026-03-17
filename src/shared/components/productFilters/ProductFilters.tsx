import "./productFilters.css"
import { PiHamburgerFill } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { RiDrinks2Fill } from "react-icons/ri";
import { FaHamburger } from "react-icons/fa";
import { PiHamburgerDuotone } from "react-icons/pi";
import { useAuthStore } from '../../../shared/store/useAuthStore'
import { useNavigate } from "react-router-dom";


export type ProductFilter = "BURGER" | "SIDE" | "ADDITION" | "BURGERCUSTOM";

interface Props {
    activeFilter: ProductFilter;
    onChangeFilter: (filter: ProductFilter) => void;
}

export default function ProductFilters({ activeFilter, onChangeFilter }: Props) {

    const navigate = useNavigate()
    const { user } = useAuthStore()
    const handleBurgerCustom = () => {
        if (!user) {
            navigate('/login')
        } else {
            onChangeFilter("BURGERCUSTOM")
        }
    }


    return (
        <div className="productFilters">

            <div className="productFilters__container-left">
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

            <button
                className={`productFilters__button ${activeFilter === "BURGERCUSTOM" ? "active" : ""}`}
                onClick={handleBurgerCustom}
            >
                <PiHamburgerDuotone size={22}/> Hamburguesas personalizadas
            </button>



        </div>
    );
}