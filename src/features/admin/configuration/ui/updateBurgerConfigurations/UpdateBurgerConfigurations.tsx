import "./updateBurgerConfigurations.css"
import { IoIosSettings } from "react-icons/io";
import SubTittleCrud from '../../../../../shared/components/componetsCrud/subTittle/SubTittleCrud'
import { IoMdClose } from "react-icons/io";

interface Props {
    onClose: () => void

}

export default function UpdateBurgerConfigurations({ onClose }: Props) {
    return (
        <div className="UpdateBurgerConfigurations__container-global">
            <div className="UpdateBurgerConfigurations__container">
                <div className="UpdateBurgerConfigurations__container-tittle">
                    <SubTittleCrud icon={<IoIosSettings  size={22} color="red" />} title='Configuaraiones de hamburguesas' />
                    <button className='UpdateBurgerConfigurations__button-close' type='button' onClick={onClose}><IoMdClose size={22} color='black' /></button>
                </div>
            </div>
        </div>

    )
}
