import React, { TextareaHTMLAttributes, useId } from 'react'
import "./textareaCrud.css"

interface TextareaCrudProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  id?: string
}

export default function TextareaCrud({label, name, id,  ...rest}: TextareaCrudProps) {

    const generatedId = useId();
    const textareaId = id ?? generatedId;

    return (
        <div className="textareaCrud__container-textarea">
            <label htmlFor={textareaId} className='textareaCrud__label'>{label}</label>
            <textarea id={textareaId} className='textareaCrud__textarea' name={name} {...rest}/>
        </div>
    )
}
