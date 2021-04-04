/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx, css } from '@emotion/react'
import { ColorPallete } from '../styles/colors'
import Enum from '../styles/enum'
import GridCSS from '../styles/grid'
import { useRouter } from 'next/router'

const HeaderCss=css`    
    position: fixed;
    width: 100%;
    background-color: ${ColorPallete.primary};
    padding: ${Enum.lg};
    height: 48pt;
    .title{
        color: white;
        font-size:${Enum.lg};
        font-weight: bold;
        .arrow{
            font-size:${Enum.lg};
            color: white;
            font-weight: bold;
            margin-right:${Enum.lg};
            cursor: pointer;
        }
    }
    z-index: 1;
`
const Header=({name})=>{
    const router = useRouter()
    return (
        <div css={[css`height: 48pt`]}>
              <div css={[HeaderCss, css`position; relative`]}>
                <div css={[GridCSS, css`justify-content: start;`]}>
                    <div className="title">
                        <span className="arrow"
                        onClick={() => router.back()}>&#8592;</span>
                        <span className="title-content">
                            {name}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header