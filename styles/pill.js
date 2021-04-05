import { css } from '@emotion/react'
import { ColorPallete } from './colors'
import Enum from './enum'

export const PillCSS={
    pill: css`
        padding: ${Enum.xs} ${Enum.sm} ${Enum.xs} ${Enum.sm};
        border-radius: ${Enum.lg};
        margin-right: ${Enum.sm};
        margin-bottom: ${Enum.sm};
    `,
    outline: css`
        border: 1px solid ${ColorPallete.gray};
        color: black;
    `,
    primary: css`
        background: ${ColorPallete.primary};
        color: white;
    `,
    secondary: css`
        background: ${ColorPallete.secondary};
        color: white;
    `,
    success: css`
        background: ${ColorPallete.success};
        color: white;
    `,
    danger: css`
        background: ${ColorPallete.danger};
        color: white;
    `,
    info: css`
        background: ${ColorPallete.info};
        color: white;
    `,
    gray: css`
        background: ${ColorPallete.gray};
        color: white;
    `
}