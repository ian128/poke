import { css } from '@emotion/react'
import { ScreenBreakpoints } from './screenBreakpoint'
const GridCSS=css`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 75%;    
    ${ScreenBreakpoints.xs}{
        width: 100%;
        flex-direction: column;
    }
    ${ScreenBreakpoints.sm}{
        width: 100%;
        flex-direction: row;
    }
    ${ScreenBreakpoints.md}{
        width: 75%;
        flex-direction: row;
    }
`

export default GridCSS