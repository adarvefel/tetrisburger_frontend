import { InputHTMLAttributes, useId } from 'react'
import "./checkboxCrud.css"

interface CheckboxCrudProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  checkboxLabel?: string;
  id?: string;
}

export default function CheckboxCrud({ label, name, id, checkboxLabel, ...rest }: CheckboxCrudProps) {

  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  return (
    <div className="checkboxCrud__container-input">
      <label className="checkboxCrud__label">{label}</label>
      <div className="checkboxCrud__container-checkbox">
        <input
          id={checkboxId}
          className="checkboxCrud__checkbox"
          type="checkbox"
          name={name}
          {...rest}
        />
        {checkboxLabel && (
          <label htmlFor={checkboxId} className="checkboxCrud__checkbox-text">
            {checkboxLabel}
          </label>
        )}
      </div>
    </div>
  )
}