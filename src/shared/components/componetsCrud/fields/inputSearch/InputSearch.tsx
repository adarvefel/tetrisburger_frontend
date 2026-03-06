import React, { InputHTMLAttributes, useId } from 'react'
import { FaSearch } from 'react-icons/fa'
import "./inputSearch.css"

interface InputSearchProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string
  id?: string
}

export default function InputSearch({ name = "search", id,  ...rest }: InputSearchProps) {

  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="inputSearch__container">
      <FaSearch className="inputSearch__icon" />
      <input id={inputId} name={name} type="text" className="inputSearch__input"  {...rest}/>
    </div>
  )
}