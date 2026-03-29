import React from "react";
import "./buttonDownload.css";
import { IoMdDownload } from "react-icons/io";

interface ButtonFilterProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
}

export default function ButtonDownload({
    text = "Descargar archivo",
    ...props
}: ButtonFilterProps) {
    return (
        <button className="buttonDownload" {...props}>
            <IoMdDownload />
            {text}
        </button>
    );
}