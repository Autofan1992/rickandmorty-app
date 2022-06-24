import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CharactersInfoType, CharacterType, FilteredCharacterType, LikeDislikeEnum } from '../../types/character-types'
import { charactersAPI, CharactersResponseType } from '../../api/characters-api'
import { RootState } from '../store'
import { showNotification } from '../helpers/showNotification'
import { AxiosResponseErrorType } from '../../api/api'

const initialState = {
    isFetching: false,
    currentPage: 1,
    info: {} as CharactersInfoType,
    searchResults: [] as FilteredCharacterType[],
    results: [] as CharacterType[],
    visitedCharacters: [] as CharacterType[]
}

export const fetchCharacters = createAsyncThunk<CharactersResponseType, number, { rejectValue: string }>(
    'fetchCharacters',
    async (pageNumber, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setCurrentPage(pageNumber))
            return await charactersAPI.getCharacters(pageNumber)
        } catch (e) {
            return rejectWithValue((e as AxiosResponseErrorType).response.data.error)
        }
    }
)

export const fetchCharacter = createAsyncThunk<CharacterType, number, { rejectValue: string, state: RootState }>(
    'fetchCharacter',
    async (id: number, { rejectWithValue, getState }) => {
        const { characters: { visitedCharacters } } = getState()
        const visitedCharacter = visitedCharacters.find(char => char.id === id)

        if (visitedCharacter) {
            return visitedCharacter
        }

        try {
            const character = await charactersAPI.getCharacter(id)
            const episodesId = character.episode.map(eps => +eps.replace(/\D+/, ``))
            const episodes = await charactersAPI.getCharacterEpisodes(episodesId)

            if (Array.isArray(episodes)) {
                character.episode = episodes.map(eps => eps.name)
            } else {
                character.episode = [episodes.name]
            }

            return character

        } catch (e) {
            return rejectWithValue((e as AxiosResponseErrorType).response.data.error)
        }
    }
)

export const fetchFilteredCharacters = createAsyncThunk<CharacterType[], string, { rejectValue: string }>(
    'fetchFilteredCharacters',
    async (name: string, { rejectWithValue }) => {
        try {
            const { results } = await charactersAPI.getFilteredCharacters(name)

            return results
        } catch (e) {
            return rejectWithValue((e as AxiosResponseErrorType).response.data.error)
        }
    }
)

export const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        setCurrentPage: (state, { payload }: PayloadAction<number>) => {
            state.currentPage = payload
        },
        setLikeOrDislike: (state, { payload }: PayloadAction<{ method: LikeDislikeEnum, id: number }>) => {
            state.visitedCharacters.forEach(char => {
                if (char.id === payload.id) {
                    if (payload.method === LikeDislikeEnum.Like) {
                        char.disliked = false
                        if (!char.liked) {
                            char.liked = true
                            return
                        }
                        char.liked = false
                    }
                    if (payload.method === LikeDislikeEnum.Dislike) {
                        char.liked = false
                        if (!char.disliked) {
                            char.disliked = true
                            return
                        }
                        char.disliked = false
                    }
                }
            })
        },
        setCharacterAvatar: (state, { payload }: PayloadAction<{ url: string, id: number }>) => {
            state.visitedCharacters.forEach(char => {
                if (char.id === payload.id) {
                    char.image = payload.url
                }
            })
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCharacters.pending, (state) => {
                state.isFetching = true
            })
            .addCase(fetchCharacters.fulfilled, (state, { payload }) => {
                state.isFetching = false
                state.info = payload.info
                state.results = payload.results
            })
            .addCase(fetchCharacters.rejected, (state, { payload }) => {
                state.isFetching = false
                if (payload) showNotification({ type: 'error', title: payload })
            })
            .addCase(fetchFilteredCharacters.fulfilled, (state, { payload }) => {
                state.searchResults = payload.map(char => (
                    {
                        value: char.name,
                        id: char.id,
                        key: char.id
                    } as FilteredCharacterType
                ))
            })
            .addCase(fetchFilteredCharacters.rejected, (state, { payload }) => {
                if (payload) showNotification({ type: 'error', title: payload })
            })
            .addCase(fetchCharacter.pending, (state) => {
                state.isFetching = true
            })
            .addCase(fetchCharacter.fulfilled, (state, { payload }) => {
                state.isFetching = false
                if (!state.visitedCharacters.some(char => char.id === payload.id)) {
                    state.visitedCharacters.push(payload)
                }
            })
            .addCase(fetchCharacter.rejected, (state, { payload }) => {
                state.isFetching = false
                if (payload) showNotification({ type: 'error', title: payload })
            })
    }
})

export const { setCurrentPage, setLikeOrDislike, setCharacterAvatar } = charactersSlice.actions

export default charactersSlice.reducer