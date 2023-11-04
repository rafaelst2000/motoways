import { TextAreaContainer } from '@/styles/components/TextArea'
import { TextareaHTMLAttributes } from 'react'

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  maxLength?: number
}

export const TextArea = ({ maxLength, ...props }: TextAreaProps) => {
  const valueLength = String(props.value)?.length ?? 0

  return (
    <TextAreaContainer>
      <textarea {...props} maxLength={maxLength} />
      {maxLength && (
        <span>
          {valueLength}/{maxLength}
        </span>
      )}
    </TextAreaContainer>
  )
}
