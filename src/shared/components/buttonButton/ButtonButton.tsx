import React from 'react'
import "./buttonButton.css"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    message: string;
}

export default function ButtonButton({ message, ...rest }: Props) {
    return (
        <button className="buttonButton" {...rest}>
            {message}
        </button>
    )
}