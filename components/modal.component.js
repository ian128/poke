/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx, css } from '@emotion/react'
import { useEffect } from 'react';
import Enum from '../styles/enum';
import { ScreenBreakpoints } from "../styles/screenBreakpoint";

const modalWrapper=css`
    position: fixed;
    background: #6A6A6AA0;
    height: 100%;
    width: 100%;
    z-index: 1;
    top: 0;
    left: 0;
    overflow-y: auto;
    padding: ${Enum.md};
    display: flex;
    justify-content: center;
`

const modal=css`
    flex: 0 1 1;
    margin: auto auto auto auto;
    background-color: #FFFFFF;
    border-radius: ${Enum.sm};
    padding: ${Enum.sm} ${Enum.lg} ${Enum.sm} ${Enum.lg};
    min-width: 25%;
    max-width: 100%;
    ${ScreenBreakpoints.sm}{
        maxwidth: 100%
    }
    ${ScreenBreakpoints.md}{
        max-width: 75%
    }
    ${ScreenBreakpoints.lg}{
        max-width: 50%
    }

`

const Modal =({show, closeHandler, children})=>{
    
    useEffect(()=>{
        let res = document.getElementsByTagName('body')[0]
        if(show){
            res.style.overflowY="hidden"
        }else{
            res.style.overflowY="auto"
        }
    },[show])
    
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