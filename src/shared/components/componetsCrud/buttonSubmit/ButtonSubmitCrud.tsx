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
        {loading ? (
          <span className="buttonSubmitCrud__spinner"></span>
        ) : (
          <FaSave size={18} />
        )}

        {loading ? "Enviando..." : label}
      </button>
    </div>
  )
}