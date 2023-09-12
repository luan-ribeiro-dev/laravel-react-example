import { combineReducers } from 'redux'
import { reducers as userReducers } from './users'
import { reducers as adminBooksReducers } from './admin/books'

export const reducers = combineReducers({
  users: combineReducers({
    ...userReducers
  }),
  admin: combineReducers({
    books: combineReducers({
      ...adminBooksReducers
    })
  }),
})