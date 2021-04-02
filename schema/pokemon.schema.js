import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
    query AllPokemons($limit: Int!, $offset: Int!){
        pokemons(limit: $limit, offset: $offset){
            count
            next
            previous
            params
            results{
                id
                name
                url
                name
                image
            }
        }
    }
`

export const GET_POKEMONS_DETAIL= gql`
    query PokemonDetails($name: String!) {
        pokemon(name: $name) {
            id
            name
            sprites {
                front_default
            }
            moves {
                move {
                name
                }
            }
            types {
                type {
                name
                }
            }
        }
    }
`