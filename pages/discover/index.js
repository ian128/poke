import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from '../../schema/pokemon.schema';
import { LoadingSpinner } from '../../components/loading.component';
import Link from 'next/link'

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
            {
                list.map(item=> {
                    return(
                        <Link 
                        key={Math.random()}
                        href={`/discover/detail/${item.name}`}>
                            <li>{item.name}</li>
                        </Link>
                    )
                })
            }
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