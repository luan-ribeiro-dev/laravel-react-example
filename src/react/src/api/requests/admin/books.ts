import api, {ApiPagination, ApiReset, ApiReturn, apiReducer} from '../..'

export enum Constants {
  STORE_BOOK = '@ADMIN/BOOKS/STORE_BOOK',
  GET_BOOKS = '@ADMIN/BOOKS/GET_BOOKS',
  GET_BOOK = '@ADMIN/BOOKS/GET_BOOK',
  DELETE_BOOK = '@ADMIN/BOOKS/DELETE_BOOK',
  UPDATE_BOOK = '@ADMIN/BOOKS/UPDATE_BOOK',
}

export type Book = {
  id?: number
  title?: string
  description?: string
  author?: string
  publisher?: string
  published_at?: string
  isbn?: string
  genre?: string
  language?: string
  format?: string
  pages?: number
  price?: number
  stock?: number
}

export function storeBook(data: Book | ApiReset) {
  return api(Constants.STORE_BOOK, {
    url: 'admin/books',
    method: 'POST',
    data,
    enableToast: true,
  })
}

export function getBooks(data?: ApiReset) {
  return api(Constants.GET_BOOKS, {
    url: 'books',
    method: 'GET',
    data,
  })
}

export function getBook(data: {id: number} | ApiReset) {
  return api(Constants.GET_BOOK, {
    url: `books/${'id' in data && data?.id}`,
    method: 'GET',
    data,
  })
}

export function deleteBook(id: number) {
  return api(Constants.DELETE_BOOK, {
    url: `admin/books/${id}`,
    method: 'DELETE',
    enableToast: true,
  })
}

export function updateBook(data: Book | ApiReset) {
  return api(Constants.UPDATE_BOOK, {
    url: `admin/books/${'id' in data && data?.id}`,
    method: 'PUT',
    data,
    enableToast: true,
  })
}

export type BookState = {
  storeBook: ApiReturn<boolean>
  getBooks: ApiReturn<ApiPagination<Book>>
  getBook: ApiReturn<Book>
  deleteBook: ApiReturn<boolean>
  updateBook: ApiReturn<boolean>
}

export const reducers = {
  storeBook: apiReducer(Constants.STORE_BOOK),
  getBooks: apiReducer(Constants.GET_BOOKS),
  getBook: apiReducer(Constants.GET_BOOK),
  deleteBook: apiReducer(Constants.DELETE_BOOK),
  updateBook: apiReducer(Constants.UPDATE_BOOK),
}