/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx, css } from '@emotion/react'
import { ColorPallete } from '../styles/colors'
import Enum from '../styles/enum'
import GridCSS from '../styles/grid'

const FooterCss=css`    
    position: fixed;
    width: 100%;
    background-color: ${ColorPallete.secondary};
    padding: ${Enum.lg};
    height: 48pt;
    z-index: 1;
    bottom: 0;
`
const Footer=({children})=>{
    return (
        <div css={[FooterCss]}>
            <div css={[GridCSS]} className="content">
                {children}
            </div>
        </div>
    )
}

export default Footer

export const FooterSpacer=()=>{
    return (<div css={css`height: 48pt`}></div>)
}