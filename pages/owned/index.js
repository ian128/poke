/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx, css } from '@emotion/react'
import React from 'react';

import { useState } from "react"
import { PokemonStorageService } from "../../service/pokemon-storage.service"
import { GridStyles } from "../../styles/cards"
import { Card } from "./cards"

const OwnedPokemons=()=>{
    const ps = new PokemonStorageService()
    const [list, setList]=useState(()=> ps.getSavedPokemons())
    

    console.log(list)
    return (
            <div className="container">
                    <h4>Your Pokémons</h4>
                    <div css={GridStyles}>
                        {
                        list.map(item=>{
                            return(
                            <Card key={item.pokemon_id}>
                                <h3>{item.pokemon_name}</h3>
                                <div>Caught: {item.nicknames.length} </div>
                            </Card>
                            )
                        })
                        }
                    </div>
            </div>
    )
}

export default OwnedPokemons