import React from 'react'
import "./updateProfile.css"
import { useGetProfile } from '../hooks/useGetProfile'
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import UserForm from '../../../../shared/components/userForm/UserForm';

export default function UpdateProfile() {

    const {error: getError, loading: getLoading, profile, handleGetProfile} = useGetProfile();
    const {error: updateError, loading: updateLoading, handleUpdateProfile} = useUpdateProfile();

    return (
        <div className="updateProfile__container-global">
            <UserForm mode='user-update'  onSubmit={handleUpdateProfile} initialData={profile ? profile : undefined}/>
        </div>
    )
}
