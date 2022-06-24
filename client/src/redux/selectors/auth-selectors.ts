import { RootState } from '../store'

export const selectIsAuth = (state: RootState) => state.auth.isAuth
export const selectAuthUserName = (state: RootState) => state.auth.authInfo.username
export const selectAuthAvatarUrl = (state: RootState) => state.auth.authInfo.avatarUrl