import { css } from '@emotion/react'
import { ColorPallete } from './colors'

export const PillCSS={
    pill: css`
        padding: 4pt 8pt 4pt 8pt;
        border-radius: 16pt;
        margin-right: 4pt;
        margin-bottom: 4pt;
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