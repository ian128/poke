import ls from 'local-storage'

export class PokemonStorageService{
    #key = "pokemonStorageKey"

    getSavedPokemons(){
        return ls.get(this.#key) || []
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
            let cursor = state.find(item => item.pokemon_id == pokemon_id)
            return cursor.nicknames.find(item => item === nickname)
        }catch(e){
            console.warn(e)
            return false
        }
    }

    addSavedPokemons(pokemon_id, pokemon_name, nickname){
        console.log(pokemon_id, nickname)
        let state = this.getSavedPokemons()

        console.log(state)
        let cursor = state.findIndex(item => item.pokemon_id == pokemon_id)
        if(cursor !== -1){
            state[cursor].nicknames.push(nickname)
        }else{
            state.push({
                pokemon_id: pokemon_id,
                pokemon_name: pokemon_name,
                nicknames: [nickname]
            })
        }

        this.savePokemons(state)
    }
}
