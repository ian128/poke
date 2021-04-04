import { PokemonStorageService } from "./pokemon-storage.service"

describe("Pokemon Storage Service",()=>{
    const ps = new PokemonStorageService()
    it('When empty, must be empty array',()=>{
        let res = ps.getSavedPokemons()
        expect(res).toEqual([])
        expect(res.length).toEqual(0)
    })
    it('Try to addSavedPokemons',()=>{
        ps.addSavedPokemons(1322, "aaa","123")
        
        let state = ps.getSavedPokemons()
        expect(state.length).toEqual(1)
        expect(state[0].pokemon_id).toEqual(1322)
    })
    it('Try to add anotherPokemons',()=>{
        ps.addSavedPokemons(1322, "aaa","ABC")
        let state = ps.getSavedPokemons()
        expect(state.length).toEqual(2)
        expect(state[1].pokemon_id).toEqual(1322)
    })
    it('Try to match existing pokemon nickname',()=>{
        let res = ps.isPokemonNicknameExists(123,"ABC")
        expect(res).toBeTruthy()
    })
    it('Try to get saved pokemon by id',()=>{
        let res = ps.getSavedPokemonsByID(1322)
        expect(res.length).toEqual(2)
        
        res = ps.getSavedPokemonsByID(0)
        expect(res.length).toEqual(0)
    })
})