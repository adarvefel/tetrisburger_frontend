import React, { SelectHTMLAttributes, useId } from 'react'
import "./selectCrud.css"

interface SelectOption {
  value: string;
  label: string;
}

interface SelectCrudProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
  id?: string;
}

export default function SelectCrud({ label, name, id, options, placeholder, ...rest }: SelectCrudProps) {

  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div className="selectCrud__container-select">
      <label htmlFor={selectId} className='selectCrud__label'>{label}</label>
      <select id={selectId} className='selectCrud__select' name={name} {...rest}>
        {placeholder && (
          <option className='selectCrud__option' value="">{placeholder}</option>
        )}
        {options.map((option) => (
          <option className='selectCrud__option' key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}