import { css } from '@emotion/react'
import { ColorPallete } from './colors'
import Enum from './enum'

const ButtonCss={
  btn: css`
    margin-right: ${Enum.xs};
    margin-bottom: ${Enum.xs};
    padding: ${Enum.sm} ${Enum.lg} ${Enum.sm} ${Enum.lg};
    margin-bottom: ${Enum.sm};
    border-radius: ${Enum.xs};
    cursor: pointer;
    margin-bottom: ${Enum.sm};
    animation: all 0.3s;
    outline: none;
    border: none;
    &:hover{
      filter: brightness(1.1);
    }
    &:disabled{
      pointer-events: none;
      filter: grayscale(0.8);
    }
  `,
  primary: css`
    color: white;
    background-color: ${ColorPallete.primary};
  `,
  secondary: css`
    color:white;
    background-color: ${ColorPallete.secondary};
  `,
  success: css`
    color:white;
    background-color: ${ColorPallete.success};
  `,
  danger: css`
    color:white;
    background-color: ${ColorPallete.danger};
  `,
  info: css`
    color:white;
    background-color: ${ColorPallete.info};
  `,
  gray: css`
    color:black;
    background-color: ${ColorPallete.gray};
  `
}

export default ButtonCss