import React from 'react'
import ResetPasswordForm from '../../../features/auth/ui/resetPasswordForm/ResetPasswordForm'
import "./resetPasswordPage.css"

export default function ResetPasswordPage() {
  return (
    <div className="resetPasswordPage">
        <div className="resetPasswordPage__container">
          <ResetPasswordForm/>
        </div>
    </div>
  )
}
