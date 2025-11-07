import React from 'react'
import "./buttonSubmit.css"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  textButton: string
}

export default function ButtonSubmit(props: Props) {

  const {  textButton, ...rest } = props;

  return (
    <button  className='buttonSubmit__button' {...rest}>{textButton}</button>
  )
}
