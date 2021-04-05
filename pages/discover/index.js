
/** @jsxRuntime classic /
/* @jsx jsx */
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { jsx, css } from '@emotion/react'

import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from '../../schema/pokemon.schema';
import { LoadingSpinner } from '../../components/loading.component';
import {PokemonStorageService} from '../../service/pokemon-storage.service';
import GridCSS from "../../styles/grid";
import { CardCSS } from "../../styles/cards";
import { CenterContainerCss, ContainerFluidCss } from "../../styles/container";
import ButtonCss from "../../styles/button";
import Header from "../../components/header.component";
import Footer, { FooterSpacer } from "../../components/footer.component";
import Head from "next/head";
import { convertToStartCase } from "../../functions/text-converter";
import { ErrorComponent } from "../../components/error.component";

const Pokemons=(props)=>{
    const ps = new PokemonStorageService()

    const [page, setPage]=useState(1)
    const [list, setList]=useState([])
    const [totalPokemons, setTotalPokemons]=useState(null)
    
    const { loading, error, data, refetch } = useQuery(
        GET_POKEMONS,
        {
            variables: { 
                limit: 24,
                offset: (page-1)*24
            },
        }
    )

    useEffect(()=>{
        refetch()
    },[page])

    useEffect(()=>{
        if(data){
            let {results} = data.pokemons
            setList(list => list.concat(results))

            setTotalPokemons(data.pokemons.count)
        }
    },[data])

    return (
        <>
        <Head>
            <title>Discover Pokémons</title>
        </Head>
        <Header name="Discover Pokémons"></Header>
        {
            error ?  <div css={CenterContainerCss}>
            <ErrorComponent title="Sorry!"
                message="There is error(s) while gathering the data. Please try again"></ErrorComponent>
            </div>
            :
            <>
              <div css={[ContainerFluidCss]}>
                <div css={[GridCSS]}>
                    {
                        list.map(item =>
                            <PokemonCard
                            key={Math.random()}
                            pokemonData={item}>
                            </PokemonCard>
                        )
                    }
                </div>
                <div css={[CenterContainerCss]}>
                    {
                        loading ?
                        <div css={CenterContainerCss}>
                        <LoadingSpinner color="black"></LoadingSpinner>
                        </div> : 
                        <button
                            css={[ButtonCss.btn, ButtonCss.primary]}
                            onClick={()=>{
                                    setPage(page+1)
                                }
                                }>
                                Load More
                        </button>
                    }
                </div>
            </div>
            {
                totalPokemons ? 
                <>
                    <FooterSpacer></FooterSpacer>
                    <Footer>
                        <div css={[css`color: white`]}>You own {ps.getCaughtPokemonTypes().length} out of {totalPokemons} Pokémons</div>
                    </Footer>   
                </>:''
            }
            </>
        }
        </>
    )
}

export default Pokemons


const PokemonCardCss=[
    CardCSS,
    css`
    flex-basis: 40%;
    cursor: pointer;
    min-height: 64pt;
    .header{
        min-height: 32pt;
        margin: 0;
        width: calc(100% - 64pt);
        .title{
            margin-top: 0;
            margin-bottom: 4pt;
        }
        .in-inventory{
            line-height: 1.0;
            font-size: 10pt;
        }
    }
    .image{
        position: absolute;
        top: 4pt;
        right: 0;
        height: 54pt;
    }
`]

const PokemonCard=({pokemonData}) => {
    const ps = new PokemonStorageService()
    const [caughtList, setCaughtList] = useState([]) 
    
    useEffect(()=>{
        pokemonData ?
        setCaughtList(ps.getSavedPokemonsByID(pokemonData.id)) : null

    }, [pokemonData]
    )

    return (
        pokemonData ? 
        <Link 
        href={`/discover/detail/${pokemonData.name}`}>
            <div css={ [PokemonCardCss]}>
                <div className="header">
                    <h2 className="title">{convertToStartCase(pokemonData.name)}</h2>
                    {
                        caughtList.length ? <label className="in-inventory">You have {caughtList.length} in your pokemons</label> : ''
                    }
                </div>
                <img className="image" 
                alt={pokemonData.name}
                src={pokemonData.image}></img>
            </div>
        </Link> : ''
    )
}