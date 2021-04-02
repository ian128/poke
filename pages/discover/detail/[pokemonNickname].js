import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { LoadingSpinner } from '../../../components/loading.component'
import { GET_POKEMONS_DETAIL } from '../../../schema/pokemon.schema'
import { ErrorComponent } from '../../../components/error.component';
import Modal from '../../../components/modal.component';
import { css, keyframes } from '@emotion/css'
import Toast from '../../../components/toast.component';
import { PokemonStorageService } from '../../../service/pokemon-storage.service';

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
                name: router.query.pokemonNickname,
            },
        }
    )

    const [catchModal, setCatchModal] = useState(false) 
    const [failToast, setFailToast] = useState({shown: false, message: ''}) 
    const [successToast, setSuccessToast] = useState({shown: false, message: ''}) 
    const [form, setForm] = useState({name: ''}) 

    const closeCatchModalHandler=()=>{
        setCatchModal(false)
    }

    const closeSuccessToastHandler=()=>{
        setSuccessToast({...successToast, shown: false})
    }

    const closeFailToastHandler=()=>{
        setFailToast({...failToast, shown: false})
    }

    const submitPokemon=()=>{
        console.log("HAHAHAHA")
        if(ps.isPokemonNicknameExists(data.pokemon.id, form.name)){
            setFailToast({message:`Pokemon with nickname "${form.name}" is exists in this pokemon type! please choose other nickname`, shown: true})
        }else{
            ps.addSavedPokemons(
                data.pokemon.id, form.name
            )
            setCatchModal(false)
            setForm({name: ''})
            setSuccessToast({shown: true, message: 'Pokemon has been saved successfully!'})
        }
    }

    useEffect(()=>{
        console.log(data)  
    },[data])

    const onChangeNickname=(event)=>{
        setForm({...form, name: event.target.value})
    }

    const catchPokemons=()=>{
        let probability = Math.random()
        if(probability >= 0.5){
            console.log("Catch success!")
            setCatchModal(true)
        }else{
            console.log("Catch fails!")
            setFailToast({message:'Your pokemon has run away! Please try again later', shown: true})
        }
    }

    return (
        <div className="container">
            <h4>Pokémon Details</h4>
            <Modal
            show={catchModal}
            closeHandler={closeCatchModalHandler}>
                <h3>You've caught this pokemon!</h3>
                <label>Let's give it a nice nickname</label>
                <div>
                    <input value={form.name} onChange={onChangeNickname}></input>
                </div>
                <button class="primary" disabled={!form.name}
                onClick={submitPokemon}>Submit</button>
            </Modal>
            <Toast theme="success"
            show={successToast.shown}
            timeout="3000"
            closeHandler={closeSuccessToastHandler}>
                <h5>{successToast.message}</h5>
            </Toast>
            <Toast theme="danger"
            show={failToast.shown}
            timeout="3000"
            closeHandler={closeFailToastHandler}>
                <h5>{failToast.message}</h5>
            </Toast>
            {
                loading ? <LoadingSpinner></LoadingSpinner>: ''
            }
            {
                error ? <ErrorComponent title="Sorry!" message="We can't find pokemon what you are looking for"></ErrorComponent>: ''
            }
            {
                data ?
                <div>
                    <img src={data.pokemon.sprites.front_default}
                    className={[bounceSprite]}/>
                    <h3 className="text-center">{data.pokemon.name}</h3>
                    <button onClick={catchPokemons}>
                        Catch!
                    </button>
                </div>
                : ''
            }
        </div>
    )
}

export default Detail


