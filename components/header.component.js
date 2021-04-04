/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx, css } from '@emotion/react'
import { ColorPallete } from '../styles/colors'
import Enum from '../styles/enum'
import GridCSS from '../styles/grid'
import { useRouter } from 'next/router'

const HeaderCss=css`    
    background-color: ${ColorPallete.primary};
    padding: ${Enum.lg};
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
`
const Header=({name})=>{
    const router = useRouter()
    console.log(router)
    return (
    <div css={[HeaderCss]}>
        <div css={[GridCSS, css`justify-content: start;`]}>
            <div className="title">
                <span className="arrow"
                onClick={() => router.back()}>&#8592;</span>
                {name}
            </div>
        </div>
    </div>
    )
}

export default Header