import { css } from '@emotion/react';
import { ColorPallete } from './colors';
import Enum from './enum';

export const InputCSS= css`
    font-size: ${Enum.sm};
    padding: ${Enum.sm} ${Enum.sm} ${Enum.sm} ${Enum.sm};
    border: 1px solid ${ColorPallete.gray};
    border-radius: ${Enum.xs};
    width: 100%;
    margin-top: ${Enum.sm};
    margin-bottom: ${Enum.sm};
    transition: all 0.3s;
    &:focus{
        outline: none;
        border: 1px solid ${ColorPallete.primary};
        box-shadow: 0pt 0pt ${Enum.xs} ${ColorPallete.primary};
    }
`