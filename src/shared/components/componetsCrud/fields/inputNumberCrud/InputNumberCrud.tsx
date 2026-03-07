import React, { useId } from "react"
import "./inputNumberCrud.css"

interface InputNumberCrudProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  id?: string
}

export default function InputNumberCrud({
  label, id,
  ...props
}: InputNumberCrudProps) {

  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <div className="inputNumberCrud__container-input">
      {label && (
        <label htmlFor={inputId} className="inputNumberCrud__label">
          {label}
        </label>
      )}

      <input
        id={inputId}
        className="inputNumberCrud__input"
        type="number"
        {...props}
      />
    </div>
  )
}