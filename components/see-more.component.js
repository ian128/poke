/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx, css } from '@emotion/react'
import { useState } from "react"

const SeeMoreCSSContainer= css`
    width: 100%;
    margin-bottom: 4pt;
`

const SeeMore =({minHeight, children})=>{
    const [expand, setExpand] = useState(false)

    return (
        <div css={css`margin-bottom: 8pt;`}>
            <div css={[SeeMoreCSSContainer, 
            expand? 
            css`height: fit-content;` : css`height: ${minHeight}; overflow-y: hidden`
            ]}>
                {children}
            </div>
            <div
            css={css`margin-bottom: 8pt; cursor: pointer`} 
            onClick={()=> setExpand(!expand)}>
                {expand ? 'See Less': 'See More'}
            </div>
        </div>
    )
}

export default SeeMore