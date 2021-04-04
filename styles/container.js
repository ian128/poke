/** @jsxRuntime classic /
/* @jsx jsx */
import { css } from '@emotion/react';
import { ScreenBreakpoints } from './screenBreakpoint';

export const ContainerCss=css`
    min-height: 100vh;
    padding: 0 0.5rem;
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    ${ScreenBreakpoints.xs}{
        width: 100%
    }
    ${ScreenBreakpoints.sm}{
        width: 100%
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