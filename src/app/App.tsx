import React, { useEffect } from 'react'
import Router from './Router'
import "./app.css"
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useAuthStore } from '../shared/store/useAuthStore'
import { useCartStore } from '../shared/store/useCartStore'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { Toaster } from 'sonner'

export default function App() {

  const { loadFromStorge } = useAuthStore()
  const { loadCart } = useCartStore()

  useEffect(() => {
    loadFromStorge()
    loadCart()
  }, [])

  return (
    <GoogleOAuthProvider clientId='157248408373-i7kgglkl62u4ijhqct2545r7gb0ri4i9.apps.googleusercontent.com'>
      <GoogleReCaptchaProvider reCaptchaKey="6LfCBG0sAAAAAES2EY4vm1ZYs6EfEr3gDmkTvHE9">
        <Toaster richColors duration={2000} position='top-right'/>
        <Router />
      </GoogleReCaptchaProvider>
    </GoogleOAuthProvider>
  )
}