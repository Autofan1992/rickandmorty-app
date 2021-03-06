import { axiosLoginInstance } from './api'
import { AuthInfoType } from '../types/auth-types'

export const authAPI = {
    getAuthInfo: () => axiosLoginInstance
        .get<AuthInfoType>('login/me')
        .then(res => res.data)
}