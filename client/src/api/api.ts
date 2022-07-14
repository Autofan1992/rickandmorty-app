import axios from 'axios'

export type AxiosResponseErrorType = {
    response: {
        data: {
            error: string
        }
    }
}

export const axiosLoginInstance = axios.create({
    baseURL: 'https://rickandmorty-linkedin.herokuapp.com',
})
export const axiosCharactersInstance = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
})
