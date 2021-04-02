import ls from 'local-storage'

export class PokemonStorageService{
    #key = "pokemonStorageKey"

    getSavedPokemons(){
        return ls.get(this.#key) || {}
    }

    savePokemons(data){
        ls.set(this.#key, data)
    }

    getSavedPokemonsByNickname(nickname){
        let savedPokemonsList = this.getSavedPokemons()
    }

    isPokemonNicknameExists(pokemon_id, nickname){
        try{
            let state = this.getSavedPokemons()
            let cursor = state[pokemon_id]
            return cursor.find(item => item === nickname)
        }catch(e){
            console.warn(e)
            return false
        }
    }

    addSavedPokemons(pokemon_id, nickname){
        console.log(pokemon_id, nickname)
        let state = this.getSavedPokemons()

        console.log(state)
        let cursor = state[pokemon_id]
        if(cursor){
            state[pokemon_id].push(nickname)
        }else{
            state[pokemon_id]=[nickname]
        }

        this.savePokemons(state)
    }
}
