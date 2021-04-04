/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx, css } from '@emotion/react'
import { useState } from "react"
import { ColorPallete } from '../styles/colors'

const SeeMoreCSSContainer= css`
    width: 100%;
    margin-bottom: 4pt;
`

const SeeMore =({minHeight, children})=>{
    const [expand, setExpand] = useState(false)

    return (
        <div css={css`margin-bottom: 8pt;`}>
            <div 
            className="content"
            css={[SeeMoreCSSContainer, 
            expand? 
            css`height: fit-content;` : css`height: ${minHeight}; overflow-y: hidden`
            ]}>
                {children}
            </div>
            <a
            className="toggle-button"
            css={css`margin-bottom: 8pt; cursor: pointer; color: ${ColorPallete.secondary}`} 
            onClick={()=> setExpand(!expand)}>
                {expand ? 'See Less': 'See More'}
            </a>
        </div>
    )
}

export default SeeMore