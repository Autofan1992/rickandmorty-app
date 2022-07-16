import { axiosCharactersInstance } from './api'
import { CharactersInfoType, CharacterType } from '../types/character-types'
import { EpisodeType } from '../types/episode-types'

export type CharactersResponseType = {
    info: CharactersInfoType,
    results: CharacterType[]
}

export const charactersAPI = {
    getCharacters: (pageNumber: number) => axiosCharactersInstance
        .get<CharactersResponseType>(`character?page=${pageNumber}`)
        .then(res => res.data),
    getFilteredCharacters: (name: string) => axiosCharactersInstance
        .get<CharactersResponseType>(`character?name=${name}`)
        .then(res => res.data),
    getCharacter: (id: number) => axiosCharactersInstance
        .get<CharacterType>(`character/${id}`)
        .then(res => res.data),
    getCharacterEpisodes: (episodes: number[]) => axiosCharactersInstance
        .get<EpisodeType | EpisodeType[]>(`episode/${episodes}`)
        .then(res => res.data),
}