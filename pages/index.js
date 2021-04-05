/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx, css } from '@emotion/react'

import Head from 'next/head'
import Link from 'next/link'
import ButtonCss from '../styles/button'
import { CenterContainerCss, ContainerCss, ContainerFluidCss} from '../styles/container'
import GridCSS from '../styles/grid'

export default function Home() {
  return (
    <div css={[ContainerCss]}>
      <Head>
        <title>Front</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={[ContainerFluidCss]}>
        <h1>Main Menu</h1>
        <Link href="/discover">
          <button css={[ButtonCss.btn, ButtonCss.primary]}>
            Discover Pokémons
          </button>
        </Link>
        <Link href="/owned">
          <button css={[ButtonCss.btn, ButtonCss.secondary]}>
            My Pokémons
          </button>
        </Link>
      </main>
    </div>
  )
}
