/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx, css } from '@emotion/react'
import { ScreenBreakpoints } from "../styles/screenBreakpoint";
import '../styles/colors.js';
import { ColorPallete } from "../styles/colors.js";
import { useEffect } from 'react';

const toastWrapper=css`
    position: fixed;
    height: fit-content;
    width: 100vw;
    z-index: 1;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    padding: 8pt;
    display: flex;
`

const toast=css`
    margin: auto auto 4pt auto;
    background-color: #FFFFFF;
    border-radius: 4pt;
    padding: 4pt 12pt 4pt 12pt;
    ${ScreenBreakpoints.sm}{
        width: 100%
    }
    ${ScreenBreakpoints.md}{
        width: 75%
    }
    ${ScreenBreakpoints.lg}{
        width: 50%
    }
`

const toastTheme={
    primary: css`
        background-color: ${ColorPallete.primary};
        color: white;
    `,
    secondary: css`
        background-color: ${ColorPallete.secondary};
        color: white;
    `,
    success: css`
        background-color: ${ColorPallete.success};
        color: white;
    `,
    danger: css`
        background-color: ${ColorPallete.danger};
        color: white;
    `
}

const Toast =({show, theme, timeout, closeHandler, children})=>{
    var timeoutFn=null

    useEffect(()=>{
        timeoutFn ? clearTimeout(timeoutFn): null
        if(show){
            timeoutFn=setTimeout(() =>{
                closeHandler()
            }, timeout || 3000)
        }
    },[show])
   
    const dismiss=()=>{
        timeoutFn ? clearTimeout(timeoutFn): null
        closeHandler()
    }

    return (
        <div css={[toastWrapper, show ? '': css`display: none`]}>
            <div css={[toast, theme ? toastTheme[theme] : '', css`cursor: pointer`]}
                onClick={dismiss}>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Toast