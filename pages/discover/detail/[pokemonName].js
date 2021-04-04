/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx, css, keyframes } from '@emotion/react'
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { LoadingSpinner } from '../../../components/loading.component'
import { GET_POKEMONS_DETAIL } from '../../../schema/pokemon.schema'
import { ErrorComponent } from '../../../components/error.component';
import Modal from '../../../components/modal.component';
import Toast from '../../../components/toast.component';
import { PokemonStorageService } from '../../../service/pokemon-storage.service';
import SeeMore from '../../../components/see-more.component';
import { CenterContainerCss, ContainerCss, FlexContainerCss } from '../../../styles/container';
import { PillCSS } from '../../../styles/pill';

const bounceKeyframe = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, 4pt, 0);
  }

  70% {
    transform: translate3d(0, -4pt, 0);
  }

  90% {
    transform: translate3d(0,-2pt,0);
  }
`
const bounceSprite = css`
    height: 128pt;
    animation: ${bounceKeyframe} 3.0s ease infinite;
`

const Detail=()=>{
    const router = useRouter()
    const ps = new PokemonStorageService()

    const { loading, error, data, refetch } = useQuery(
        GET_POKEMONS_DETAIL,
        {
            variables: { 
                name: router.query.pokemonName,
            },
        }
    )

    const [catchModal, setCatchModal] = useState(false) 
    const [toast, setToast] = useState({shown: false, message: '', theme: ''}) 
    const [form, setForm] = useState({name: ''}) 

    const closeCatchModalHandler=()=>{
        setCatchModal(false)
    }

    const closeToast=()=>{
        setToast({...toast, shown: false})
    }

    const submitPokemon=()=>{
        console.log("HAHAHAHA")
        if(ps.isPokemonNicknameExists(data.pokemon.id, form.name)){
            setToast(
                {message:`Pokemon with nickname "${form.name}" is exists in this pokemon type! please choose other nickname`,
                shown: true, 
                theme: 'danger'
            })
        }else{
            ps.addSavedPokemons(
                data.pokemon.id, data.pokemon.name, form.name
            )
            setCatchModal(false)
            setForm({name: ''})
            setToast({
                shown: true, 
                message: `Nice nickname! Pokemon with nickname '${form.name}' has been saved successfully!`,
                theme: 'primary'
            })
        }
    }

    useEffect(()=>{
        console.log(error)
    },[error])

    useEffect(()=>{
        console.log(data)
    },[data])

    useEffect(()=>{
        //when catch modal is not launch, empty the form
        if(catchModal == false)   setForm({name: ''})
    },[catchModal])

    const onChangeNickname=(event)=>{
        setForm({...form, name: event.target.value})
    }

    const catchPokemons=()=>{
        let probability = Math.random()
        if(probability >= 0.50){
            console.log("Catch success!")
            setCatchModal(true)
        }else{
            console.log("Catch fails!")
            setToast({
                message:'Oops! We cannot catch your pokemon this time. Please try again',
                shown: true,
                theme: 'danger'
            })
        }
    }

    return (
        <>
        <h4 css={css`text-align: center`}>Pokémon Details</h4>
        <div css={[ContainerCss]}>
            <Modal
            show={catchModal}>
                <h3>You've caught this pokemon!</h3>
                <label>Let's give it a nice nickname</label>
                <div>
                    <input value={form.name}
                    placeholder="Type nickname here..."
                    onChange={onChangeNickname}></input>
                </div>
                <button className="secondary" onClick={closeCatchModalHandler}>
                    Never mind, release it
                </button>
                <button className="primary" disabled={!form.name}
                onClick={submitPokemon}>Save it!</button>
            </Modal>
            <Toast theme={toast.theme}
            show={toast.shown}
            timeout="3000"
            closeHandler={closeToast}>
                <h5>{toast.message}</h5>
            </Toast>
            {
                loading ?
                <div css={CenterContainerCss}>
                    <LoadingSpinner></LoadingSpinner>
                </div>: ''
            }
            {
                error ? 
                <div css={CenterContainerCss}>
                    <ErrorComponent title="Sorry!" message="There is error(s) while gathering the data. Please try again"></ErrorComponent>
                </div>
                : ''
            }
            {
                data ?
                    data.pokemon.id ?
                    <div>
                        <div css={CenterContainerCss}>
                            <img src={data.pokemon.sprites.front_default}
                            css={[bounceSprite]}/>
                        </div>
                        <h3 className="text-center">{data.pokemon.name}</h3>
                        <div>
                            <h3>Moves</h3>
                            <SeeMore
                            minHeight="3em">
                                <div css={FlexContainerCss}>
                                {
                                    data.pokemon.moves.map(item=>{
                                        return <div css={[PillCSS.pill, PillCSS.primary]}>{item.move.name}</div>
                                    })
                                }      
                                </div>           
                            </SeeMore>
                        </div>
                        <div>
                            <h3>Types</h3>
                            <SeeMore
                            minHeight="3em">
                                <div css={FlexContainerCss}>
                                {
                                    data.pokemon.types.map(item=>{
                                        return <div css={[PillCSS.pill, PillCSS.primary]}>{item.type.name}</div>
                                    })
                                }      
                                </div>           
                            </SeeMore>
                        </div>
                        <button onClick={catchPokemons}>
                            Catch!
                        </button>
                    </div>
                    :
                    <div css={CenterContainerCss}>
                        <ErrorComponent
                            title="Uh Oh!"
                            message="We can't find pokemon what you are looking for">     
                        </ErrorComponent>
                    </div>
                :''
            }
        </div>
        </>
    )
}

export default Detail


