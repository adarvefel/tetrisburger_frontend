import React from 'react'
import "./updateProfile.css"
import { useGetProfile } from '../hooks/useGetProfile'
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import UserForm from '../../../../shared/components/formsCruds/userForm/UserForm';
import LoadingSpinner from '../../../../shared/components/loadings/loadingSpinner/LoadingSpinner';
import { useAuthStore } from '../../../../shared/store/useAuthStore';
import { Link } from 'react-router-dom';
import ButtonLogout from '../../../../shared/components/buttonLogout/ButtonLogout';
import { GrUserAdmin } from "react-icons/gr";

export default function UpdateProfile() {

    const { error: getError, loading: getLoading, profile, handleGetProfile } = useGetProfile();
    const { error: updateError, loading: updateLoading, handleUpdateProfile } = useUpdateProfile();

    const { isAdmin, isEmployee } = useAuthStore();

    if (getLoading) {
        return <LoadingSpinner />
    }

    return (
        <div className="updateProfile__container-global">
            <UserForm mode='user-update' onSubmit={handleUpdateProfile} initialData={profile ? profile : undefined} loading={updateLoading} />
            <div className="updateProfile__container-buttons">
                <ButtonLogout />
                {
                    isAdmin ? <Link className='updateProfile__link' to={"/admin/users-list"}><GrUserAdmin size={27} /> Dashboard Administrador</Link> : null
                }
                {
                    isEmployee ? <Link className='updateProfile__link2' to={"/employee/orders-list"}><GrUserAdmin size={27} /> Dashboard  Empleado</Link> : null
                }
            </div>
        </div>

    )
}
