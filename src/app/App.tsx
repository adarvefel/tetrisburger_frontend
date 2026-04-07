import React, { useEffect } from 'react'
import Router from './Router'
import "./app.css"
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useAuthStore } from '../shared/store/useAuthStore'
import { useCartStore } from '../shared/store/useCartStore'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { Toaster } from 'sonner'

export default function App() {

  const GOOGLE_AUTH_KEY = import.meta.env.VITE_GOOGLE_AUTH_KEY;
  const REPCACHAT_KEY = import.meta.env.VITE_REPCACHAT_KEY;

  const { loadFromStorge } = useAuthStore()
  const { loadCart } = useCartStore()

  useEffect(() => {
    loadFromStorge()
    loadCart()
  }, [])

  return (
    <GoogleOAuthProvider clientId={GOOGLE_AUTH_KEY}>
      <GoogleReCaptchaProvider reCaptchaKey={REPCACHAT_KEY}>
        <Toaster richColors duration={2000} position='top-right'/>
        <Router />
      </GoogleReCaptchaProvider>
    </GoogleOAuthProvider>
  )
}