/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx, css } from '@emotion/react'
import { CardStyles } from "../../styles/cards"

export const Card=({children})=>{
    return (
        <div css={ [CardStyles]}>
            {children}
        </div>
    )
}