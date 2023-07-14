import { ButtonContainer } from './Button.styles'

type ButtonProps = {
  variant?: 'primary' | 'secundary' | 'danger' | 'success' | 'warning'
}

export function Button({ variant = 'primary' }: ButtonProps) {
  return <ButtonContainer variant={variant}> Enviar</ButtonContainer>
}
