/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx, css, keyframes } from '@emotion/react'
import { ColorPallete } from '../styles/colors'
import Enum from '../styles/enum'

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0) rotate(0);
  }

  40%, 43% {
    transform: translate3d(0, 8pt, 0) rotate(90deg);
  }

  70% {
    transform: translate3d(0, -4pt, 0) rotate(-90deg);
  }

  90% {
    transform: translate3d(0,-2pt,0);
  }
`

export const LoadingSpinner=({color})=>{
    return(
        <div
        css={css`width: 100%`}>
            <img 
            css={css`
            margin-top: 12pt;
            margin-bottom: 12pt;
            font-size: 14pt;
            font-weight: bold;
            margin-left: auto;
            display: block;
            margin-right: auto;
            height: ${Enum.xl};
            width: ${Enum.xl};
            animation: ${bounce} 0.8s ease infinite;
            `}
            src="/assets/images/pokeball/pokeball-full.png"></img>
  
        </div>
    )
}