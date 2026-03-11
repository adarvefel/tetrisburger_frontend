import "./updateAdditionsConfigurations.css"
import { IoIosSettings } from "react-icons/io";
import SubTittleCrud from '../../../../../shared/components/componetsCrud/subTittle/SubTittleCrud'
import { IoMdClose } from "react-icons/io";
import InputNumberCrud from "../../../../../shared/components/componetsCrud/fields/inputNumberCrud/InputNumberCrud";
import CheckboxCrud from "../../../../../shared/components/componetsCrud/fields/checkboxCrud/CheckboxCrud";
import Line from "../../../../../shared/components/componetsCrud/fields/line/Line";
import ButtonSubmitCrud from "../../../../../shared/components/componetsCrud/buttonSubmit/ButtonSubmitCrud";
import { useEffect, useState } from "react";
import useGetSettingsAddition from "../../hooks/useGetSettingsAddition";
import LoadingSpinner from "../../../../../shared/components/loadings/loadingSpinner/LoadingSpinner";

interface Props {
    onClose: () => void

}

export default function UpdateAdditionsConfigurations({ onClose }: Props) {

    const { loading: getLoading, settingAddition, handleGetSettingsAddition } = useGetSettingsAddition();

    const [form, setForm] = useState({
        maxAdditionsPerItem: 0,
        maxTotalPrice: 0,
        additionsEnabled: false
    });

    useEffect(() => {
        handleGetSettingsAddition();
    }, []);

    useEffect(() => {
        if (settingAddition) {
            setForm({
                maxAdditionsPerItem: settingAddition.maxAdditionsPerItem,
                maxTotalPrice: settingAddition.maxTotalPrice,
                additionsEnabled: settingAddition.additionsEnabled
            });
        }
    }, [settingAddition]);

    const onInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const { name, value, type, checked } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : Number(value)
        }));
    };

    const formIsEqual =
        (settingAddition?.maxAdditionsPerItem ?? 0) === form.maxAdditionsPerItem &&
        (settingAddition?.maxTotalPrice ?? 0) === form.maxTotalPrice &&
        (settingAddition?.additionsEnabled ?? false) === form.additionsEnabled;

    return (
        <div className="updateAdditionsConfigurations__container-global">
            <div className="updateAdditionsConfigurations__container">
                <div className="updateAdditionsConfigurations__container-tittle">
                    <SubTittleCrud icon={<IoIosSettings size={22} color="red" />} title='Configuaraiones de adiciones' />
                    <button className='updateAdditionsConfigurations__button-close' type='button' onClick={onClose}><IoMdClose size={22} color='black' /></button>
                </div>

                <Line />

                {getLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <InputNumberCrud
                            id="addition-settigs-maxAdditionPerItem"
                            label="maxAdditionsPerItem"
                            name="maxAdditionsPerItem"
                            value={form.maxAdditionsPerItem}
                            onChange={onInputChange}
                        />

                        <InputNumberCrud
                            id="addition-settigs-maxTotalPrice"
                            label="maxTotalPrice"
                            name="maxTotalPrice"
                            value={form.maxTotalPrice}
                            onChange={onInputChange}
                        />

                        <CheckboxCrud
                            id="addition-settigs-additionsEnabled"
                            label="additionsEnabled"
                            checkboxLabel="Marcar como disponible"
                            name="additionsEnabled"
                            checked={form.additionsEnabled}
                            onChange={onInputChange}
                        />
                    </>
                )}

                <Line />

                <ButtonSubmitCrud id="addition-settings-submit" label="Actualizar configuraciones" disabled={formIsEqual} />

            </div>
        </div>

    )
}
