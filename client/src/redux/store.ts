import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE, } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import charactersReducer from './slices/characters-slice'
import authReducer from './slices/auth-slice'

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['isAuth', 'authInfo'],
}

const charactersPersistConfig = {
    key: 'characters',
    storage,
    whitelist: ['visitedCharacters', 'currentPage'],
}

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    characters: persistReducer(charactersPersistConfig, charactersReducer),
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch