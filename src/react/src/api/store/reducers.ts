import {combineReducers} from 'redux'
import {UsersState, reducers as userReducers} from '../requests/users'
import {BookState as AdminBookState, reducers as adminBooksReducers} from '../requests/admin/books'
import {BookState as CustomerBookState, reducers as customerBooksReducers} from '../requests/customer/books'
import {ReportState, reducers as adminReportReducers} from '../requests/admin/reports'

export type RootState = {
  users: UsersState
  admin: {
    books: AdminBookState
    reports: ReportState
  }
  customer: {
    books: CustomerBookState
  }
}

export const reducers = combineReducers({
  users: combineReducers({
    ...userReducers,
  }),
  admin: combineReducers({
    books: combineReducers({
      ...adminBooksReducers,
    }),
    reports: combineReducers({
      ...adminReportReducers,
    }),
  }),
  customer: combineReducers({
    books: combineReducers({
      ...customerBooksReducers,
    }),
  }),
})