import { styled, css } from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

interface StartCountdownButtonProps {
  variant?: 'start' | 'interrupt'
}

export const StartCountdownButton = styled.button<StartCountdownButtonProps>`
  inline-size: 100%;
  border: none;
  border-radius: 8px;
  display: flex;
  padding: 1rem;

  justify-content: center;
  align-items: center;

  gap: 0.5rem;
  font-weight: bold;

  cursor: pointer;
  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme['gray-100']};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-700']};
  }

  ${(props) =>
    props.variant === 'interrupt' &&
    css`
      background: ${props.theme['red-500']};

      &:not(:disabled):hover {
        background: ${props.theme['red-700']};
      }
    `}
`
