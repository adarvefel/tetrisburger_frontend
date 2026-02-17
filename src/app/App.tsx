import React, { useEffect } from 'react'
import Router from './Router'
import "./app.css"
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useAuthStore } from '../shared/store/useAuthStore'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

export default function App() {

  const {loadFromStorge} = useAuthStore();

  useEffect(()=>{
    loadFromStorge();
  },[])

  return (
    <GoogleOAuthProvider clientId='157248408373-i7kgglkl62u4ijhqct2545r7gb0ri4i9.apps.googleusercontent.com'>
      <GoogleReCaptchaProvider reCaptchaKey="6LfCBG0sAAAAAES2EY4vm1ZYs6EfEr3gDmkTvHE9">
        <Router />
      </GoogleReCaptchaProvider>
    </GoogleOAuthProvider>

  )
}
