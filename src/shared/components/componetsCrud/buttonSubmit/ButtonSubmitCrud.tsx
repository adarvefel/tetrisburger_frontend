import { ButtonHTMLAttributes } from "react"
import "./buttonSubmitCrud.css"
import { FaSave } from "react-icons/fa";

interface ButtonSubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
}

export default function ButtonSubmitCrud({ label = "Enviar", ...rest }: ButtonSubmitProps) {
  return (

    <div className="buttonSubmitCrud__container-button">
      <button type="submit" className="buttonSubmitCrud__button" {...rest}>
        <FaSave size={20} /> {label}
      </button>
    </div>

  )
}