/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx, css, keyframes } from '@emotion/react'
import { ColorPallete } from '../styles/colors'
const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, 8pt, 0);
  }

  70% {
    transform: translate3d(0, -4pt, 0);
  }

  90% {
    transform: translate3d(0,-2pt,0);
  }
`

export const LoadingSpinner=({color})=>{
    return(
        <div
            css={css`
            margin-top: 12pt;
            margin-bottom: 12pt;
            font-size: 14pt;
            font-weight: bold;
            animation: ${bounce} 0.8s ease infinite;
            color: ${color ? color : 'white'};
            `}>
            Loading
        </div>
    )
}