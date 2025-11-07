import React from 'react'
import "./inputForm.css"

interface Props extends React.InputHTMLAttributes<HTMLInputElement>{
  
}

export default function InputForm(props: Props) {

  const {...rest} = props;

  return (
    <input className='inputForm__input' {...rest} />
  )
}
