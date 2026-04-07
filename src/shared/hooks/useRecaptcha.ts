// hooks/useRecaptcha.ts
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useCallback } from 'react'

export const useRecaptcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha()

  const getToken = useCallback(async (action: string): Promise<string> => {
    if (!executeRecaptcha) throw new Error('reCAPTCHA no está listo')
    return await executeRecaptcha(action)
  }, [executeRecaptcha])

  return { getToken }
}