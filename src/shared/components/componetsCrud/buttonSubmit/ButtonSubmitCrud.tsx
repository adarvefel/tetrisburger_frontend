import { ButtonHTMLAttributes } from "react"
import "./buttonSubmitCrud.css"
import { FaSave } from "react-icons/fa";

interface ButtonSubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  loading?: boolean
}

export default function ButtonSubmitCrud({
  label = "Enviar",
  loading = false,
  disabled,
  ...rest
}: ButtonSubmitProps) {

  const isDisabled = loading || disabled

  return (
    <div className="buttonSubmitCrud__container-button">
      <button
        type="submit"
        className="buttonSubmitCrud__button"
        disabled={isDisabled}
        {...rest}
      >
        <FaSave size={20} />
        {loading ? "Enviando..." : label}
      </button>
    </div>
  )
}