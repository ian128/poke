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
import { ContainerCss, ContainerFluidCss } from '../../styles/container';

const OwnedPokemons=()=>{
    const ps = new PokemonStorageService()

    const [list, setList]=useState(()=> ps.getSavedPokemons())
    const [releaseModal, setReleaseModal] = useState({open: false, nickname: ''}) 
    const [toast, setToast] = useState({shown: false, message: '', theme: ''}) 

    const promptReleasePokemon=(data)=>{
        setReleaseModal({open: true, nickname: data.nickname})
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
        <div css={[ContainerFluidCss]}>
            <Toast theme={toast.theme}
            show={toast.shown}
            timeout="3000"
            closeHandler={closeToast}>
                <h5>{toast.message}</h5>
            </Toast>
            <Modal show={releaseModal.open}>
                <h3>Do you want to release pokemon with nickname {releaseModal.nickname}?</h3>
                <button css={[ButtonCss.btn]}
                onClick={closeReleasePokemon}>
                        No
                </button>
                <button css={[ButtonCss.btn, ButtonCss.primary]}
                onClick={releasePokemon}>
                        Yes, Release
                </button>
            </Modal>
            <h4>Your Pokémons</h4>
            <div css={[GridCSS]}>
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
        </div>
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
        margin-top: 8pt;
        display: flex;
        flex-direction: row;
        align-items: center;
        .time{
            flex: 1;
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

    useEffect(()=>{
        console.log(data)
    }, [data])
    return (
        <div css={ [PokemonCard]}>
            <div className="header">
                <h2 css={css`margin-bottom: 0`}>{savedData.nickname}</h2>
                <label>{savedData.pokemon_name}</label>
            </div>
            <div className="utility">
                <div className="time">
                    Caught on {savedData.caughtOn}
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