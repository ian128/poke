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
import { CenterContainerCss, ContainerCss, FlexContainerCss, CurvedCss} from '../../../styles/container';
import { PillCSS } from '../../../styles/pill';
import ButtonCss from '../../../styles/button';
import Header from '../../../components/header.component';
import Head from 'next/head';
import { convertToStartCase } from '../../../functions/text-converter';
import Enum from '../../../styles/enum';
import { InputCSS } from '../../../styles/input';
import { PokemonTypeColors } from '../../../styles/colors';

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
    height: 144pt;
    animation: ${bounceKeyframe} 3.0s ease infinite;
`
const pokeballAnimationContainer=css`
  height: 154pt;
  width: 154pt;
  margin-right: auto;
  margin-left: auto;
  margin-top: ${Enum.xl};
  margin-bottom: ${Enum.xl};
  position: relative;
  .top{
    height: 100%;
    position: absolute
  }
  .bottom{
    height: 100%;
    position: absolute
  }
  .top.animate{
    transform: rotate(180deg);
  }
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

    const [catchAnimationModal, setAnimationModal] = useState(true) 
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
                theme: 'success'
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
        <Head>
            <title>Pokémon Detail</title>
        </Head>
        <Header name="Pokémon Details"></Header>
        
        {/*
         <Modal show={catchAnimationModal}>
            <div css={pokeballAnimationContainer}>
                <img className="top animate" src="/assets/images/pokeball/pokeball_top.svg"></img>
                <img className="bottom" src="/assets/images/pokeball/pokeball.svg"></img>
            </div>
        </Modal>
        */}
 

        <Modal
            show={catchModal}>
                <h3>You have caught this pokemon!</h3>
                <label>Let's give it a nice nickname</label>
                <div>
                    <input
                    css={[InputCSS]}
                    value={form.name}
                    placeholder="Type nickname here..."
                    onChange={onChangeNickname}></input>
                </div>
                <button css={[ButtonCss.btn, ButtonCss.gray]} onClick={closeCatchModalHandler}>
                    Never mind, release it
                </button>
                <button css={[ButtonCss.btn, ButtonCss.primary]} disabled={!form.name}
                onClick={submitPokemon}>Save it!</button>
        </Modal>
        <Toast theme={toast.theme}
            show={toast.shown}
            timeout="3000"
            closeHandler={closeToast}>
                <h5>{toast.message}</h5>
        </Toast>
        <div css={[CurvedCss]}></div>
        <div css={[ContainerCss, css`margin-top: -84pt`]}>
            {
                loading ?
                <div css={CenterContainerCss}>
                    <LoadingSpinner color="white"></LoadingSpinner>
                </div>: ''
            }
            {
                error ? 
                <div css={CenterContainerCss}>
                    <ErrorComponent title="Sorry!"
                    message="There is error(s) while gathering the data. Please try again"></ErrorComponent>
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
                        <h1 css={css`text-align:center; margin-top: 0`}>{ convertToStartCase(data.pokemon.name) }</h1>
                        <div css={css`margin-bottom: ${Enum.xl}`}>
                            <h3>Moves ({data.pokemon.moves.length})</h3>
                            <SeeMore
                            minHeight="2em">
                                <div css={FlexContainerCss}>
                                {
                                    data.pokemon.moves.map((item, index)=>{
                                        return <div key={index} css={[PillCSS.pill, PillCSS.outline]}>{
                                            convertToStartCase(item.move.name)
                                        }</div>
                                    })
                                }      
                                </div>           
                            </SeeMore>
                        </div>
                        <div css={css`margin-bottom: ${Enum.xl}`}>
                            <h3>Types</h3>
                            <SeeMore
                            minHeight="2em">
                                <div css={FlexContainerCss}>
                                {
                                    data.pokemon.types.map((item, index)=>{
                                        return <div key={index} css={[PillCSS.pill, css`font-weight: 500; background: ${PokemonTypeColors[item.type.name]+'A0'}`]}>{
                                            convertToStartCase(item.type.name)
                                        }</div>
                                    })
                                }      
                                </div>           
                            </SeeMore>
                        </div>
                        <button
                        css={[ButtonCss.btn, ButtonCss.primary, css`padding: 12pt 32pt 12pt 32pt; width: 100%; font-size: 12pt`]}
                        onClick={catchPokemons}>
                            Catch!
                        </button>
                    </div>
                    :
                    <div css={[CenterContainerCss, css`flex-direction: column`]}>
                        <ErrorComponent
                            color="white"
                            title="Uh Oh!"
                            message="We can't find pokemon what you are looking for">     
                        </ErrorComponent>
                        <button css={[ButtonCss.btn, ButtonCss.info, css`margin-top: ${Enum.sm}`]}
                        onClick={()=>{router.replace('/discover')}}>
                            Click Here to return to Pokemon list
                        </button>
                    </div>
                :''
            }
        </div>
        </>
    )
}

export default Detail


