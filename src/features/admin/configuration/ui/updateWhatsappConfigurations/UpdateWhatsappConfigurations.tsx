import "./updateWhatsappConfigurations.css"
import { IoIosSettings } from "react-icons/io";
import SubTittleCrud from '../../../../../shared/components/componetsCrud/subTittle/SubTittleCrud'
import { IoMdClose } from "react-icons/io";

interface Props {
    onClose: () => void

}

export default function UpdateWhatsappConfigurations({ onClose }: Props) {
    return (
        <div className="updateWhatsappConfigurations__container-global">
            <div className="updateWhatsappConfigurations__container">
                <div className="updateWhatsappConfigurations__container-tittle">
                    <SubTittleCrud icon={<IoIosSettings  size={22} color="red" />} title='Configuaraiones de WhatsApp' />
                    <button className='updateWhatsappConfigurations__button-close' type='button' onClick={onClose}><IoMdClose size={22} color='black' /></button>
                </div>
            </div>
        </div>

    )
}
