import { useState } from "react"

export function useAlerts(){

    const [alertError, setAlertError] = useState<null | string>(null);
    const [alertSuccess, setAlertSuccess] = useState<null | string>(null);

    const onClosedAlertError = () => setAlertError(null);
    const onClosedAlertSuccess = () => setAlertSuccess(null);

    return {alertError, setAlertError, alertSuccess, setAlertSuccess, onClosedAlertError, onClosedAlertSuccess};
}