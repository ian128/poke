import { css } from '@emotion/react'
export const ButtonStyle=css`
    padding: 8pt 8pt 8pt 8pt;
    margin-bottom: 8pt;
    border-radius: 4pt;
    cursor: pointer;
    border: 1px solid #6A6A6AA0;
    margin-bottom: 8pt;
    animation: all 0.3s;
    outline: none;
    &.primary{
      color: white;
      background-color: $primary;
    }
    &:hover{
      filter: brightness(1.2);
    }
    &:disabled{
      pointer-events: none;
      filter: grayscale(0.8);
    }
`
