/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx, css } from '@emotion/react'
import { ScreenBreakpoints } from "../styles/screenBreakpoint";

const modalWrapper=css`
    position: absolute;
    background: #6A6A6AA0;
    height: 100vh;
    width: 100vw;
    z-index: 1;
    top: 0;
    left: 0;
    overflow-y: auto;
    padding: 8pt;
    display: flex;
    justify-content: center;
`

const modal=css`
    flex: 0 1 1;
    margin: auto auto auto auto;
    background-color: #FFFFFF;
    border-radius: 4pt;
    padding: 4pt 12pt 4pt 12pt;
    width: 100%;
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

const Modal =({show, closeHandler, children})=>{
    return (
        <div css={[modalWrapper, show ? '': css`display: none`]}>
            <div css={modal}>
                <div>
                    {children}
                </div>
                {closeHandler ? 
                <div>
                    <button onClick={closeHandler}>
                        Dismiss
                    </button>
                </div> : ''}
            </div>
        </div>
    )
}

export default Modal