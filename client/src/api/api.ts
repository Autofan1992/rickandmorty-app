import axios from 'axios'

export type AxiosResponseErrorType = {
    response: {
        data: {
            error: string
        }
    }
}

export const axiosLoginInstance = axios.create({
    baseURL: 'http://localhost:5000',
})
export const axiosCharactersInstance = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
})
