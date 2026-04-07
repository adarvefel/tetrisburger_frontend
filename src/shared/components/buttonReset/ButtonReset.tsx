import React from "react";
import "./buttonReset.css";

interface ButtonFilterProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
}

export default function ButtonReset({
    text = "Resetear",
    ...props
}: ButtonFilterProps) {
    return (
        <button className="buttonReset" {...props}>
            {text}
        </button>
    );
}