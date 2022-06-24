import { RootState } from '../store'
import { createSelector } from '@reduxjs/toolkit'

export const selectCharacters = (state: RootState) => state.characters.results
export const selectVisitedCharacters = (state: RootState) => state.characters.visitedCharacters
export const selectFilteredCharacters = (state: RootState) => state.characters.searchResults
export const selectPagesCount = (state: RootState) => state.characters.info.pages
export const selectCurrentPage = (state: RootState) => state.characters.currentPage
export const selectIsFetchingCharacters = (state: RootState) => state.characters.isFetching

export const selectCharacter = createSelector(
    [
        selectVisitedCharacters,
        (state: RootState, id: number) => id
    ],
    (characters, id) => characters.find(char => char.id === id)
)

export const selectLikedCharacters = createSelector(
    selectVisitedCharacters,
    characters => characters.filter(char => char.liked === true)
)