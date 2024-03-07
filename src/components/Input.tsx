import { InputContainer } from '@/styles/components/Input'
import { CSS } from '@stitches/react'
import { InputHTMLAttributes, ReactNode } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode
  css: CSS
}

export const Input = ({ icon, css, className, ...props }: InputProps) => {
  return (
    <InputContainer css={css} className={className}>
      <input {...props} />
      {icon}
    </InputContainer>
  )
}
