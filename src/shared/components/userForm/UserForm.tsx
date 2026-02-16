import React, { useEffect, useRef, useState } from 'react'
import imgProfile from "./../../../assets/photoPerfilUndefined.webp"
import "./userForm.css"
import { UpdateProfileRequestDto } from '../../../features/user/profile/dto/profileDto';
import { ErrorAlert } from '../alerts/errorAlert/ErrorAlert';
import SuccessAlert from '../alerts/successAlert/SuccessAlert';
import { useNavigate } from 'react-router-dom';
import { CreateUserDto, CreateUserWithImageDto, UpdateUserDto, UpdateUserWithImageDto } from '../../../entities/user/dto/userDto';

type FormMode = "create" | "user-update" | "admin-update";

interface UserFormProps {
    mode: FormMode;
    initialData?: {
        idUser?: number;
        userName?: string;
        email?: string;
        userImage?: string;
        phone?: string;
        role?: string;
    }
    onSubmit: (data: any) => Promise<any>
}

export default function UserForm({ mode, initialData, onSubmit }: UserFormProps) {

    const [formData, setFormData] = useState({
        idUser: initialData?.idUser || 0,
        userName: initialData?.userName || "",
        email: initialData?.email || "",
        userImage: initialData?.userImage || "",
        password: "",
        role: initialData?.role || "",
        phone: initialData?.phone || ""
    })

    useEffect(() => {
        if (initialData) {
            setFormData({
                idUser: initialData.idUser || 0,
                userName: initialData.userName || "",
                email: initialData.email || "",
                userImage: initialData.userImage || "",
                password: "",
                role: initialData.role || "",
                phone: initialData.phone || ""
            });
        }
    }, [initialData]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }



    // VUelta pa las alertas

    const [showAlertSuccess, showSetAlertSuccess] = useState(false);
    const [showAlertError, showSetAlertError] = useState(false);

    const [alertError, setAlertError] = useState<string | null>(null);
    const [alertSuccess, setAlertSuccess] = useState<string | null>(null);

    const onCloseAlertSucces = () => {
        setAlertSuccess(null);
    }

    const onCloseAlertError = () => {
        setAlertError(null);
    }

    const navegator = useNavigate();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();



        if (formData.phone.length >= 1 && formData.phone.length < 10) {
            setAlertError("El numero telefonico debe tener minimo 10 digitos.");
            return
        }



        if (mode === "user-update") {

            const userUpdate: UpdateProfileRequestDto = {
                userName: formData.userName,
                userImage: formData.userImage,
                phone: formData.phone,
            }

            if (formData.password.length >= 8) {
                userUpdate.password = formData.password
            }

            if (formData.password.length >= 1 && formData.password.length < 8) {
                setAlertError("La contraseña debe tener al menos 8 digitos.")
                return
            }

            const response = await onSubmit(userUpdate);

            if (response.data.idUser) {
                setAlertSuccess("Datos actualizados");
            }
            else {
                setAlertError("Datos no actualizados, error inesperado.")
            }

            return
        }

        if (mode === "admin-update") {
            const userUpdate: UpdateUserDto = {
                userName: formData.userName,

                email: formData.email,
                role: formData.role,
                phone: formData.phone,
            }

            const userUpdated: UpdateUserWithImageDto = {
                user: userUpdate,
                file: imageFile
            }

            if (formData.password.length >= 8) {
                userUpdate.password = formData.password
            }

            if (formData.password.length >= 1 && formData.password.length < 8) {
                setAlertError("La contraseña debe tener al menos 8 digitos.")
                return
            }

            const response = await onSubmit(userUpdated);

            if (response.data.idUser) {
                setAlertSuccess("Datos actualizados");
                setTimeout(() => {
                    navegator("/admin/users-list");
                }, 2000)
            }
            else {
                setAlertError("Datos no actualizados, error inesperado.")
            }

            return

        }

        if (formData.password.length < 8) {
            setAlertError("La password debe tener al menos 8 digitos.");
            return;
        }

        if (formData.role !== "ADMIN" && formData.role !== "CLIENT" && formData.role !== "EMPLOYEE") {
            setAlertError("Seleccione un rol.");
            return;
        }


        const userToCreate: CreateUserDto = {
            userName: formData.userName,
            email: formData.email,
            password: formData.password,
            role: formData.role,
            phone: formData.phone
        }

        const userCreated: CreateUserWithImageDto = {
            user: userToCreate,
            file: imageFile
        }



        const response = await onSubmit(userCreated);







        if (response.data.idUser) {
            setAlertSuccess("Usuario Agregado correctamente");
            setTimeout(() => {
                navegator("/admin/users-list");
            }, 2000)
        } else {
            setAlertError("Error al intenatar agragar este usuario.");
        }


        return


    }



    //GESTION PA LA PICTURE DEL USER

    const [pictureUser, setPictureUser] = useState<string>(
        initialData?.userImage || imgProfile
    );
    const [imageFile, setImageFile] = useState<File | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const onClickInputFile = () => {
        fileInputRef.current?.click();
    }

    const onChangeInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setImageFile(file)
            const pictureUrl = URL.createObjectURL(file);
            setPictureUser(pictureUrl);
        }
    }

    useEffect(() => {
        return () => {
            if (pictureUser.startsWith("blob:")) {
                URL.revokeObjectURL(pictureUser);
            }
        }
    }, [pictureUser]);


    useEffect(() => {
        if (initialData?.userImage) {
            setPictureUser(initialData.userImage);
        }
        else {
            setPictureUser(imgProfile);
        }
    }, [initialData])



    return (
        <form className='userForm__form' action="" onSubmit={handleSubmit}>

            {alertError ? <ErrorAlert mensaje={alertError} onClosed={onCloseAlertError} /> : null}
            {alertSuccess ? <SuccessAlert mensaje={alertSuccess} onClosed={onCloseAlertSucces} /> : null}

            <div className="userForm__container-top">

                <div className="userForm__container-imagen">
                    <div className="userForm__container-img">
                        <img className='userForm__img' src={pictureUser} alt="" />
                    </div>
                    <div className="userForm__container-spam">
                        <h3 className='userForm__h3'>Imagen de perfil</h3>
                        <p className='userForm__p' >Sube una imagen nueva</p>
                    </div>
                </div>

                <div className="userForm__container-button-top">
                    <button className='userForm__button' onClick={onClickInputFile} type='button'>
                        Upload image
                    </button>

                    <input ref={fileInputRef} className='userForm__input-file' type="file" accept='image/*' onChange={onChangeInputFile} />

                </div>
            </div>

            <div className="userForm__container-medium">

                <div className="userForm__container-row">

                    <div className="userForm__container-input">
                        <label className='userForm__label' htmlFor="">User ID</label>
                        <input name='idUser' className='userForm__input' type="text" disabled value={formData.idUser} onChange={onInputChange} />
                    </div>

                    <div className="userForm__container-input">
                        <label className='userForm__label' htmlFor="">Full Name</label>
                        <input name='userName' className='userForm__input' required type="text" value={formData.userName} onChange={onInputChange} />
                    </div>

                </div>

                <div className="userForm__container-row">

                    <div className="userForm__container-input">
                        <label className='userForm__label' htmlFor="">Email Address</label>
                        <input name='email' className='userForm__input' disabled={mode === "user-update"} required type="email" value={formData.email} onChange={onInputChange} />
                    </div>

                    <div className="userForm__container-input">
                        <label className='userForm__label' htmlFor="">Phone Number</label>
                        <input name='phone' className='userForm__input' type="text" value={formData.phone} onChange={onInputChange} />
                    </div>

                </div>

                <div className="userForm__container-row">

                    <div className="userForm__container-input">
                        <label className='userForm__label' htmlFor="">Password</label>
                        <input name='password' className='userForm__input' required={mode === "create"} type="password" value={formData.password} onChange={onInputChange} placeholder='Deja en blanco para dejar la contraseña actual.' />
                    </div>

                    <div className="userForm__container-input">
                        <label className='userForm__label' htmlFor="">Role</label>
                        <select name='role' className='userForm__select' value={formData.role} onChange={onInputChange} disabled={mode === "user-update"}>
                            <option className='userForm__option' value="">Seleccione un rol</option>
                            <option className='userForm__option' value="ADMIN">Administrador</option>
                            <option className='userForm__option' value="EMPLOYEE">Empleado</option>
                            <option className='userForm__option' value="CLIENT">Cliente</option>
                        </select>
                    </div>

                </div>

            </div>

            <div className="userForm__container-buttom">

                <div className="userForm__container-button-buttom">
                    <button className='userForm__button-submit'>{

                        mode === "user-update" ? "Actualizar perfil" :
                            mode === "admin-update" ? "Guardas cambios" :
                                "Crear usuario"

                    }</button>
                </div>

            </div>


        </form>
    )
}
