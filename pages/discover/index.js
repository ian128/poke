
/** @jsxRuntime classic /
/* @jsx jsx */
import Link from "next/link";
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';
import { jsx, css } from '@emotion/react'

import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from '../../schema/pokemon.schema';
import { LoadingSpinner } from '../../components/loading.component';
import { ScreenBreakpoints } from '../../styles/screenBreakpoint';

const Pokemons=(props)=>{
    const [page, setPage]=useState(1)
    const [list, setList]=useState([])
    
    const { loading, error, data, refetch } = useQuery(
        GET_POKEMONS,
        {
            variables: { 
                limit: 12,
                offset: (page-1)*12
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
        }
    },[data])

    return (
        <div className="container">
            <h4>Discover Pokémons</h4>
            <div css={PokemonCardGridCss}>
                {
                    list.map(item =>{
                        return (
                            <PokemonCard
                            key={Math.random()}
                            pokemonData={item}></PokemonCard>
                        )
                    })
                }
            </div>
            {
                loading ? <LoadingSpinner></LoadingSpinner>: ''
            }
            <button onClick={()=>{
                    setPage(page+1)
                }
            }>
                Load More
            </button>
        </div>
    )
}

export default Pokemons

const PokemonCardGridCss=css`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 75%;    
    ${ScreenBreakpoints.xs}{
        width: 100%;
        flex-direction: column;
    }
    ${ScreenBreakpoints.sm}{
        width: 100%;
        flex-direction: row;
    }
    ${ScreenBreakpoints.md}{
        width: 75%;
        flex-direction: row;
    }
`

const PokemonCardCss=css`
    margin: 4pt;
    padding: 8pt;
    text-align: left;
    text-decoration: none;
    border: 1px solid #eaeaea;
    border-radius: 10px;
    position: relative;
    flex-basis: 40%;
    cursor: pointer;
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

const PokemonCard=React.forwardRef((props, ref) => {
    const {pokemonData} = props 
    useEffect(()=>{
        console.log(pokemonData)
    }, [pokemonData])
    return (
        <Link 
        href={`/discover/detail/${pokemonData.name}`}>
            <div css={ [PokemonCardCss]}>
                <div className="header">
                    <h2 css={css`margin-bottom: 0`}>{pokemonData.name}</h2>
                </div>
                {
                    pokemonData ? <img className="image" src={pokemonData.image}></img> : ''
                }
            </div>
        </Link>
    )
})