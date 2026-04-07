import React from "react";
import { FaFilter } from "react-icons/fa6";
import "./buttonFIlter.css";

interface ButtonFilterProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
}

export default function ButtonFilter({
    text = "Filtrar",
    ...props
}: ButtonFilterProps) {
    return (
        <button className="buttonFilter" {...props}>
            <FaFilter />
            {text}
        </button>
    );
}