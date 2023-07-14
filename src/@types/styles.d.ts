import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

// This is  default theme to use in project
type ThemeType = typeof defaultTheme

// This create a defaltTheme module
declare module 'styled-components' {
  export interface DefaultTheme = ThemeType {}
}
