import { InputHTMLAttributes, useId } from 'react'
import "./inputCrud.css"

interface InputCrudProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  id?: string;
}

export default function InputCrud({ label, name, id, ...rest }: InputCrudProps) {

  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="inputCrud__container-inputs">
      <label htmlFor={inputId} className='inputCrud__label'>{label}</label>
      <input id={inputId} className='inputCrud__input' name={name} {...rest} />
    </div>
  )
}