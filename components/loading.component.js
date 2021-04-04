import { css, keyframes } from '@emotion/css'
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

export function LoadingSpinner(){
    return(
        <div
            className={css`
            margin-top: 12pt;
            margin-bottom: 12pt;
            animation: ${bounce} 0.8s ease infinite;
            `}>
            Loading
        </div>
    )
}