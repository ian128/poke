/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx,css } from '@emotion/react';

export const ErrorComponent=({title, message, color})=>{
    return(
        <div>
            <h3 css={css`text-align: center; color: ${color ? color: 'inherit'}`}>{title}</h3>
            <div css={css`text-align: center; color: ${color ? color: 'inherit'}`}>{message}</div>
        </div>
    )
}