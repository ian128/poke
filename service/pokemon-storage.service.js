import ls from 'local-storage'

export class PokemonStorageService{
    #key = "pokemonStorageKey"

    getSavedPokemons(){
        return ls.get(this.#key) || []
    }

    savePokemons(data){
        ls.set(this.#key, data)
    }

    removeSavedPokemons(nickname){
        let state = this.getSavedPokemons()
        state = state.filter(item => item.nickname !== nickname)
        this.savePokemons(state)
    }

    isPokemonNicknameExists(pokemon_id, nickname){
        try{
            let state = this.getSavedPokemons()
            let cursor = state.find(item => item.nickname == nickname)
            return cursor
        }catch(e){
            console.warn(e)
            return false
        }
    }

    addSavedPokemons(pokemon_id, pokemon_name, nickname){
        console.log(pokemon_id, nickname)
        let state = this.getSavedPokemons()
        state.push({
            pokemon_id: pokemon_id,
            pokemon_name: pokemon_name,
            nickname: nickname,
            caughtOn: new Date().getTime()
        })
        this.savePokemons(state)
    }
}
