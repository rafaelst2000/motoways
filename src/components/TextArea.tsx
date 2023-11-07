import { TextAreaContainer } from '@/styles/components/TextArea'
import { CSS } from '@stitches/react'
import { TextareaHTMLAttributes } from 'react'

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  maxLength?: number
  css?: CSS
}

export const TextArea = ({ maxLength, css, ...props }: TextAreaProps) => {
  const valueLength = String(props.value)?.length ?? 0

  return (
    <TextAreaContainer css={css}>
      <textarea {...props} maxLength={maxLength} />
      {maxLength && (
        <span>
          {valueLength}/{maxLength}
        </span>
      )}
    </TextAreaContainer>
  )
}
