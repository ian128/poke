/** @jsxRuntime classic /
/* @jsx jsx */
import { css } from '@emotion/react';
import { ColorPallete } from './colors';
import Enum from './enum';
import { ScreenBreakpoints } from './screenBreakpoint';

export const CurvedCss= css`
    background-image: linear-gradient(to bottom right, ${ColorPallete.primary}, ${ColorPallete.secondary});
    ${ScreenBreakpoints.xs}{
        height: 144pt;
        border-bottom-left-radius: 50% 40%;
        border-bottom-right-radius: 50% 40%;
    }
    ${ScreenBreakpoints.sm}{
        height: 144pt;
        border-bottom-left-radius: 50% 35%;
        border-bottom-right-radius: 50% 35%;
    }
    ${ScreenBreakpoints.md}{
        height: 144pt;
        border-bottom-left-radius: 50% 40%;
        border-bottom-right-radius: 50% 40%;
    }
    ${ScreenBreakpoints.lg}{
        height: 144pt;
        border-bottom-left-radius: 50% 40%;
        border-bottom-right-radius: 50% 40%;
    }
    ${ScreenBreakpoints.xl}{
        height: 144pt;
        border-bottom-left-radius: 50% 40%;
        border-bottom-right-radius: 50% 40%;
    }
`
export const ContainerFluidCss=css`
    margin-top: ${Enum.md};
    margin-bottom: ${Enum.md};
    min-height: 50vh;
    padding: 0 0.5rem;
    display: flex;
    flex-direction: column;
`

export const ContainerCss=css`
    ${ContainerFluidCss}
    margin-left: auto;
    margin-right: auto;
    ${ScreenBreakpoints.xs}{
        width: 100%
    }
    ${ScreenBreakpoints.sm}{
        width: 90%
    }
    ${ScreenBreakpoints.md}{
        width: 75%
    }
    ${ScreenBreakpoints.lg}{
        width: 50%
    }
    ${ScreenBreakpoints.lg}{
        width: 50%
    }
`

export const CenterContainerCss=css`
    display: flex;
    flex: flex-column;
    align-items: center;
    justify-content: center;
`

export const FlexContainerCss=css`
    display: flex;
    flex-wrap: wrap
`