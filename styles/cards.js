import { css } from '@emotion/react'
import {ScreenBreakpoints} from './screenBreakpoint';

export const GridStyles=css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 800px;
    margin-top: 3rem;
    ${ScreenBreakpoints.md}{
        max-width: 100%;
        flex-direction: column;
    }
    ${ScreenBreakpoints.lg}{
        flex-direction: row;
    }
`

export const CardStyles=css`
    margin: 4pt;
    padding: 1.5rem;
    text-align: left;
    text-decoration: none;
    border: 1px solid #eaeaea;
    border-radius: 10px;
    transition: color 0.15s ease, border-color 0.15s ease;
`