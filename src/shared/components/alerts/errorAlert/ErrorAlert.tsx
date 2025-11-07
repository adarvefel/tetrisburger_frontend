import React, { useState, useEffect } from "react";
import { IoWarning } from "react-icons/io5";
import "./errorAlert.css";


interface Props {
    mensaje: string
    onClosed: () => void;
}

export function ErrorAlert(props: Props) {

    const { mensaje, onClosed } = props;



    useEffect(() => {

        const timer = setTimeout(() => {
            onClosed();
        }, 4000);

        return () => clearTimeout(timer);
    
    }, []);



return (
    <div className="errorAlert__container">
        <div className="errorAlert__icono">
            <IoWarning size={27} />
        </div>
        <div className="errorAlert__mensaje">
            <p className="errorAlert__p">{mensaje}</p>
        </div>
    </div>
);
}
