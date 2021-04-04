import { css } from '@emotion/react'
import { ColorPallete } from './colors'
import Enum from './enum'

export const PillCSS={
    pill: css`
        padding: ${Enum.xs} ${Enum.sm} ${Enum.xs} ${Enum.sm};
        border-radius: ${Enum.lg};
        margin-right: ${Enum.xs};
        margin-bottom: ${Enum.xs};
    `,
    primary: css`
        background: ${ColorPallete.primary};
        color: white;
    `,
    danger: css`
        background: ${ColorPallete.danger};
        color: white;
    `
}