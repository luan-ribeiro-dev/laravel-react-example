import { combineReducers } from 'redux'
import { reducers as userReducers } from './users'

export const reducers = combineReducers({
  users: combineReducers({
    ...userReducers
  })
})