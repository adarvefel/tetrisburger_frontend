import React from 'react'
import "./tittleCrud.css"

interface Props{
    tittle: string,
    description?: string
}

export default function TittleCrud({tittle, description} : Props) {
    return (
        <div className="tittleCrud__container-text">
            <h1 className="tittleCrud__h1">
                {tittle}
            </h1>
            <p className="tittleCrud__p">
                {description}
            </p>
        </div>
    )
}
