/** @jsxRuntime classic /
/* @jsx jsx */
import { useQuery } from '@apollo/client';
import { jsx, css } from '@emotion/react'
import React, { useEffect } from 'react';
import { useState } from "react"
import GridCSS from '../../styles/grid';

import { PokemonStorageService } from "../../service/pokemon-storage.service"
import {GET_POKEMONS_DETAIL} from "../../schema/pokemon.schema";
import ButtonCss from '../../styles/button';
import Modal from '../../components/modal.component';
import Toast from '../../components/toast.component';
import Link from 'next/link'
import { CardCSS } from '../../styles/cards';
import { ContainerFluidCss, FlexContainerCss } from '../../styles/container';
import Header from '../../components/header.component';
import { convertToStartCase } from '../../functions/text-converter';
import Enum from '../../styles/enum';

const OwnedPokemons=()=>{
    const ps = new PokemonStorageService()

    const [list, setList]=useState(()=> ps.getSavedPokemons())
    const [releaseModal, setReleaseModal] = useState({open: false, pokemon: '', nickname: ''}) 
    const [toast, setToast] = useState({shown: false, message: '', theme: ''}) 

    const promptReleasePokemon=(data)=>{
        setReleaseModal({open: true, pokemon: data.pokemon_name,nickname: data.nickname})
    }

    const releasePokemon=()=>{
        ps.removeSavedPokemons(releaseModal.nickname)
        setToast({shown: true, message: `${releaseModal.nickname} has been released`, theme: 'success'})
        setReleaseModal({...releaseModal, open: false, nickname: ''})
    }

    useEffect(()=>{
        setList(ps.getSavedPokemons())
    },[releaseModal.nickname])

    const closeReleasePokemon=()=>{
        setReleaseModal({...releaseModal, open: false})
    }

    const closeToast=()=>{
        setToast({...toast, shown: false})
    }

    return (
        <>
        <Header name="Your Pokémons"></Header>
        <div css={[ContainerFluidCss]}>
            <Toast theme={toast.theme}
            show={toast.shown}
            timeout="3000"
            closeHandler={closeToast}>
                <h5>{toast.message}</h5>
            </Toast>
            <Modal show={releaseModal.open}>
                <h3>Confirm</h3>
                <div css={css`margin-bottom: ${Enum.md}`}>Do you want to release pokemon { convertToStartCase(releaseModal.pokemon) } with nickname {releaseModal.nickname}?</div>
                <div css={css`text-align: end`}>
                    <button css={[ButtonCss.btn]}
                    onClick={closeReleasePokemon}>
                            No
                    </button>
                    <button css={[ButtonCss.btn, ButtonCss.primary]}
                    onClick={releasePokemon}>
                            Yes, Release
                    </button>
                </div>
            </Modal>
            <div css={GridCSS}>
                        {
                        list.length ?
                        list.map(item=>{
                            return(
                            <MyPokemonCard
                            releaseHandler={promptReleasePokemon} 
                            savedData={item}
                            key={item.caughtOn}>
                            </MyPokemonCard>
                            )
                        }) : 
                        <div css={css`text-align: center`}>
                            <h3>You have no pokemons in here</h3>
                            <Link href={'/discover'}>Click/tap here to discover pokemons</Link>
                        </div>
                        }
                    </div>
            </div>
        </>
    )
}

const PokemonCard=[
    CardCSS,
    css`
    flex-basis: 40%;
    .header{
        min-height: 32pt;
    }
    .image{
        position: absolute;
        top: 0;
        right: 0;
        height: 64pt;
    }

    .utility{
        margin-top: ${Enum.sm};
        display: flex;
        flex-direction: row;
        align-items: center;
        .time{
            flex: 1;
            font-size: 10pt;
        }
        .option{
            text-align: right;
            flex: 1;
        }
    }
`
]

const MyPokemonCard=({savedData, releaseHandler})=>{

    const { loading, error, data, refetch } = useQuery(
        GET_POKEMONS_DETAIL,
        {
            variables: { 
                name: savedData.pokemon_name
            },
        }
    )

    return (
        <div css={ [PokemonCard]}>
            <div className="header">
                <h2 css={css`margin-bottom: ${Enum.xs}`}>{savedData.nickname}</h2>
                <label>{convertToStartCase(savedData.pokemon_name) }</label>
            </div>
            <div className="utility">
                <div className="time">
                    Caught on {generateDate(savedData.caughtOn)}
                </div>
                <div className="option">
                    <button css={[ButtonCss.btn, ButtonCss.primary]}
                    onClick={ ()=>{releaseHandler(savedData)} }>
                        Release
                    </button>
                </div>
            </div>
            {
                data ? <img className="image" src={data.pokemon.sprites.front_default}></img> : ''
            }
        </div>
    )
}

export default OwnedPokemons


const generateDate=(dateStr)=>{
    let mon = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Okt','Nov','Dec']
    let date = new Date(dateStr)
    
    return `${date.getDate()} ${mon[date.getMonth()]} ${date.getFullYear()}, ${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`
}