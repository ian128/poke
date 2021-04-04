/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx, css } from '@emotion/react'
import { useState } from "react"

const modal=SeeMoreCSS`
    
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


const SeeMore =({children})=>{
    const [expand, setExpand] = useState(false)

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