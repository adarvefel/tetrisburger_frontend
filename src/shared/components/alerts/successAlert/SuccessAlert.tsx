import React, { useEffect, useState } from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import "./succesAlert.css"


interface Props {
    mensaje: string
    onClosed: () => void;
}

export default function SuccessAlert(props: Props) {

    const { mensaje, onClosed } = props;


    useEffect(() => {


        const timer = setTimeout(() => {
            onClosed();
        }, 4000);

        return () => clearTimeout(timer);


    }, [])



    return (
        <div className="successAlert__container">

            <div className="successAlert__icono">
                <FaCircleCheck size={27} />
            </div>

            <div className="successAlert__mensaje">
                <p className='successAlert__p'>{mensaje}</p>
            </div>

        </div>
    )
}
