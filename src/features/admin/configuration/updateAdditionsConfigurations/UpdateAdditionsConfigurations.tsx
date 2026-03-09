import "./updateAdditionsConfigurations.css"
import { IoIosSettings } from "react-icons/io";
import SubTittleCrud from '../../../../shared/components/componetsCrud/subTittle/SubTittleCrud'
import { IoMdClose } from "react-icons/io";

interface Props {
    onClose: () => void

}

export default function UpdateAdditionsConfigurations({ onClose }: Props) {
    return (
        <div className="updateAdditionsConfigurations__container-global">
            <div className="updateAdditionsConfigurations__container">
                <div className="updateAdditionsConfigurations__container-tittle">
                    <SubTittleCrud icon={<IoIosSettings  size={22} color="red" />} title='Configuaraiones de adiciones' />
                    <button className='updateAdditionsConfigurations__button-close' type='button' onClick={onClose}><IoMdClose size={22} color='black' /></button>
                </div>
            </div>
        </div>

    )
}
