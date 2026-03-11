import React, { useState } from 'react'
import "./listConfigurations.css"
import { PiWhatsappLogoDuotone } from "react-icons/pi";
import { FaHamburger } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import ButtonButton from '../../../../../shared/components/buttonButton/ButtonButton';
import UpdateAdditionsConfigurations from '../updateAdditionsConfigurations/UpdateAdditionsConfigurations';
import UpdateWhatsappConfigurations from '../updateWhatsappConfigurations/UpdateWhatsappConfigurations';
import UpdateBurgerConfigurations from '../updateBurgerConfigurations/UpdateBurgerConfigurations';

export default function ListConfigurations() {

    const [activeModal, setActiveModal] = useState(null);

    const openModal = (modal: any) => {
        setActiveModal(modal);
    }

    const closeModal = () => {
        setActiveModal(null);
    }

    return (
        <div className="listConfigurations__container">
            <div className="listConfigurations__card">
                <IoFastFood size={33} color='red' />
                <h2 className='listConfigurations__h2'>Adiciones</h2>
                <p className='listConfigurations__p'>Administra los ingredientes adicionales que los clientes pueden agregar a sus hamburguesas.</p>
                <ButtonButton message='Configraciones' onClick={() => openModal("additions")} />
            </div>
            <div className="listConfigurations__card">
                <PiWhatsappLogoDuotone size={33} color='green' />
                <h2 className='listConfigurations__h2' >WhatsApp</h2>
                <p className='listConfigurations__p'>Configura el número de WhatsApp utilizado para recibir pedidos y contactar a los clientes.</p>
                <ButtonButton message='Configraciones' onClick={() => openModal("whatsapp")} />
            </div>
            <div className="listConfigurations__card">
                <FaHamburger size={33} color='orange' />
                <h2 className='listConfigurations__h2' >Hamburguesas</h2>
                <p className='listConfigurations__p'>Gestiona las configuraciones relacionadas con las hamburguesas del menú.</p>
                <ButtonButton message='Configraciones' onClick={() => openModal("burgers")} />
            </div>

            {activeModal === "additions" && (
                <UpdateAdditionsConfigurations onClose={closeModal}/>
            )}

            {activeModal === "whatsapp" && (
                <UpdateWhatsappConfigurations onClose={closeModal}/>
            )}

            {activeModal === "burgers" && (
                <UpdateBurgerConfigurations onClose={closeModal}/>
            )}
        </div>
    )
}
