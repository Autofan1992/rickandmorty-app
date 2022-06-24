export type CharacterType = {
    id: number
    name: string
    status: CharacterStatusEnum
    species: string
    type: string
    gender: string
    origin: {
        name: string
        url: string
    },
    location: {
        name: string
        url: string
    },
    image: string
    episode: string[]
    url: string
    created: string
    liked: boolean
    disliked: boolean
}

export type FilteredCharacterType = {
    value: string
    id: number
    key: number
}

export enum CharacterStatusEnum {
    Alive = 'Alive',
    Dead = 'Dead',
    Unknown = 'unknown'
}

export enum LikeDislikeEnum {
    Like = 'like',
    Dislike = 'dislike'
}

export type CharactersInfoType = {
    count: number
    pages: number
    next: string | null
    prev: string | null
}