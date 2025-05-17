import type { ToastText } from '@/utils/type'
t'

const Toast = ({text}:ToastText) => {
  return (
    <div>
      <h2>{text}</h2>
    </div>
  )
}

export default Toast
