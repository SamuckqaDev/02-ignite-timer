/* eslint-disable @typescript-eslint/restrict-template-expressions */
import styled from 'styled-components'

export type ButtonVariant =
  | 'primary'
  | 'secundary'
  | 'danger'
  | 'success'
  | 'warning'

type ButtonContainerProps = {
  variant: ButtonVariant
}

const buttonVariants = {
  primary: 'purple',
  sencodary: 'orange',
  danger: 'red',
  success: 'green',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  inline-size: 100px;
  block-size: 40px;
  border: none;
  border-radius: 0.5rem;
  margin: 1rem;

  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
`
