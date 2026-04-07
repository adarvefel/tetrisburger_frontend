import { MdClose } from "react-icons/md";

interface Ingredient {
    idBurgerIngredient: number;
    productName: string;
    quantity: number;
    priceAtTime: number;
    subtotal: number;
}

interface Props {
    burgerName: string;
    ingredients: Ingredient[];
    onClose: () => void;
}

export default function BurgerIngredientsModal({ burgerName, ingredients, onClose }: Props) {
    return (
        <div className="oam__backdrop" onClick={onClose}>
            <div className="oam__panel" onClick={(e) => e.stopPropagation()}>

                <div className="oam__header">
                    <div>
                        <span className="oam__tag">Ingredientes</span>
                        <h2 className="oam__title">{burgerName}</h2>
                    </div>
                    <button className="oam__close" onClick={onClose}>
                        <MdClose size={20} />
                    </button>
                </div>

                <section className="oam__section">
                    <div className="oam__items-wrapper">
                        <table className="oam__items-table">
                            <thead>
                                <tr>
                                    <th>Ingrediente</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ingredients.map((ing) => (
                                    <tr key={ing.idBurgerIngredient}>
                                        <td>{ing.productName}</td>
                                        <td>{ing.quantity}</td>
                                        <td>
                                            {new Intl.NumberFormat('es-CO', {
                                                style: 'currency',
                                                currency: 'COP',
                                                minimumFractionDigits: 0
                                            }).format(ing.priceAtTime)}
                                        </td>
                                        <td>
                                            {new Intl.NumberFormat('es-CO', {
                                                style: 'currency',
                                                currency: 'COP',
                                                minimumFractionDigits: 0
                                            }).format(ing.subtotal)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

            </div>
        </div>
    );
}