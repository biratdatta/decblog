import { toast } from 'react-hot-toast'

export const errorHandler = (message: string) => {
  toast.error(message)
}
