import React from 'react'
import "./titulo.css"

interface Props {
    textTitulo : string
}

export default function TituloForm(props: Props) {

  return (
    <h1 className='tituloForm__h1'>{props.textTitulo}</h1>
  )
}
