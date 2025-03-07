import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import authReducer from './slice/auth.slice'
import filterReducer from './slice/filter.slice'
import sortReducer from './slice/sort.slice'

const persistConfig = {
  key: 'auth',
  storage
}

export const persistedAuthReducer = persistReducer(persistConfig, authReducer)

// filter
const filterPersistConfig = {
  key: 'filter',
  storage
}
export const persistedFilterReducer = persistReducer(filterPersistConfig, filterReducer)

//sort
const sortPersistConfig = {
  key: 'sort',
  storage
}
export const persistedSortReducer = persistReducer(sortPersistConfig, sortReducer)
