import React from 'react'
import { FaCircleExclamation } from "react-icons/fa6";
import "./subTittleCrud.css"

interface TittleCrudProps {
  title: string
  icon?: React.ReactNode
}

export default function SubTittleCrud({ title, icon }: TittleCrudProps) {
  return (
    <h2 className='tittleCrud__h2'>
      {icon}
      {title}
    </h2>
  )
}