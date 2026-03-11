import "./updateBurgerConfigurations.css"
import { IoIosSettings } from "react-icons/io";
import SubTittleCrud from '../../../../../shared/components/componetsCrud/subTittle/SubTittleCrud'
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import useGetSettingsBurger from "../../hooks/useGetSettingsBurger";
import CheckboxCrud from "../../../../../shared/components/componetsCrud/fields/checkboxCrud/CheckboxCrud";
import InputNumberCrud from "../../../../../shared/components/componetsCrud/fields/inputNumberCrud/InputNumberCrud";
import LoadingSpinner from "../../../../../shared/components/loadings/loadingSpinner/LoadingSpinner";
import Line from "../../../../../shared/components/componetsCrud/fields/line/Line";
import ButtonSubmitCrud from "../../../../../shared/components/componetsCrud/buttonSubmit/ButtonSubmitCrud";
import { useUpdateSettingsBurger } from "../../hooks/useUpdateSettingsBurger";
import { toast } from "sonner";
import { UpdateBurgerSettingsRequestDTO } from "../../../../../entities/settings/dto/settingsDto";

interface Props {
    onClose: () => void

}

export default function UpdateBurgerConfigurations({ onClose }: Props) {

    const { loading: getLoading, settingBurger, handleGetSettingsBurger } = useGetSettingsBurger();
    const {loading: updateLoading, handleUpdateSettingsBurger} = useUpdateSettingsBurger();


    const [form, setForm] = useState({
        customBurgerMinPrice: 0,
        customBurgerMaxPrice: 0,
        minIngredients: 0,
        maxIngredients: 0,
        customBurgersEnabled: false
    });

    useEffect(() => {
        handleGetSettingsBurger();
    }, []);

    useEffect(() => {
        if (settingBurger) {
            setForm({
                customBurgerMinPrice: settingBurger.customBurgerMinPrice,
                customBurgerMaxPrice: settingBurger.customBurgerMaxPrice,
                minIngredients: settingBurger.minIngredients,
                maxIngredients: settingBurger.maxIngredients,
                customBurgersEnabled: settingBurger.customBurgersEnabled
            });
        }
    }, [settingBurger]);

    const onInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const { name, value, type, checked } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : Number(value)
        }));
    };

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        const settingsToUpdate : UpdateBurgerSettingsRequestDTO = {
            ...form
        }

        const response = await handleUpdateSettingsBurger(settingsToUpdate);

        if (response?.status === 200) {
            toast.success("Configuracion cambiada con exito.");
            onClose();
        }
    }

    const formIsEqual =
    (settingBurger?.customBurgerMinPrice ?? 0) === form.customBurgerMinPrice &&
    (settingBurger?.customBurgerMaxPrice ?? 0) === form.customBurgerMaxPrice &&
    (settingBurger?.minIngredients ?? 0) === form.minIngredients &&
    (settingBurger?.maxIngredients ?? 0) === form.maxIngredients &&
    (settingBurger?.customBurgersEnabled ?? false) === form.customBurgersEnabled;

    return (
        <div className="UpdateBurgerConfigurations__container-global">
            <form className="UpdateBurgerConfigurations__container" onSubmit={handleSubmit}>
                <div className="UpdateBurgerConfigurations__container-tittle">
                    <SubTittleCrud icon={<IoIosSettings size={22} color="red" />} title='Configuaraiones de hamburguesas' />
                    <button className='UpdateBurgerConfigurations__button-close' type='button' onClick={onClose}><IoMdClose size={22} color='black' /></button>
                </div>

                <Line/>

                {getLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <InputNumberCrud
                            id="burger-settings-minPrice"
                            label="Precio mínimo hamburguesa personalizada"
                            name="customBurgerMinPrice"
                            value={form.customBurgerMinPrice}
                            onChange={onInputChange}
                            required
                        />

                        <InputNumberCrud
                            id="burger-settings-maxPrice"
                            label="Precio máximo hamburguesa personalizada"
                            name="customBurgerMaxPrice"
                            value={form.customBurgerMaxPrice}
                            onChange={onInputChange}
                            required
                        />

                        <InputNumberCrud
                            id="burger-settings-minIngredients"
                            label="Ingredientes mínimos"
                            name="minIngredients"
                            value={form.minIngredients}
                            onChange={onInputChange}
                            required
                        />

                        <InputNumberCrud
                            id="burger-settings-maxIngredients"
                            label="Ingredientes máximos"
                            name="maxIngredients"
                            value={form.maxIngredients}
                            onChange={onInputChange}
                            required
                        />

                        <CheckboxCrud
                            id="burger-settings-enabled"
                            label="Hamburguesas personalizadas"
                            checkboxLabel="Habilitar hamburguesas personalizadas"
                            name="customBurgersEnabled"
                            checked={form.customBurgersEnabled}
                            onChange={onInputChange}
                        />
                    </>
                )}

                <Line/>

                <ButtonSubmitCrud id="burger-settings-submit" label="Actualizar configuraciones" disabled={formIsEqual} loading={updateLoading}/>
            </form>
        </div>

    )
}
