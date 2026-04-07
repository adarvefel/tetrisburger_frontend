import React from 'react'
import "./buttonSubmit.css"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  textButton: string
  loading?: boolean
}

export default function ButtonSubmit(props: Props) {

  const { textButton, loading = false, disabled, ...rest } = props
  
  const isDisabled = loading || disabled

  return (
    <button 
      className='buttonSubmit__button' 
      disabled={isDisabled} 
      {...rest}
    >

      {loading && <span className="buttonSubmit__spinner"></span>}

      {loading ? "Enviando..." : textButton}

    </button>
  )
}