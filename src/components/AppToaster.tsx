import { Toaster } from 'react-hot-toast'
import { toastConfig } from '../utils/toast'

export default function AppToaster() {
  return (
    <Toaster
      position={toastConfig.position}
      toastOptions={{
        style: toastConfig.style,
        success: toastConfig.success,
        error: toastConfig.error,
        loading: toastConfig.loading,
      }}
    />
  )
}
