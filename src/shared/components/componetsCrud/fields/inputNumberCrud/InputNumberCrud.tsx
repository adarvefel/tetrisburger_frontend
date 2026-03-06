import React from "react"
import "./inputNumberCrud.css"

interface InputNumberCrudProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export default function InputNumberCrud({
  label,
  ...props
}: InputNumberCrudProps) {
  return (
    <div className="inputNumberCrud__container-input">
      {label && (
        <label className="inputNumberCrud__label">
          {label}
        </label>
      )}

      <input
        className="inputNumberCrud__input"
        type="number"
        {...props}
      />
    </div>
  )
}