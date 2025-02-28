import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import authReducer from './slice/auth.slice'

const persistConfig = {
  key: 'auth',
  storage
}

export const persistedAuthReducer = persistReducer(persistConfig, authReducer)
