import api, { APIConstants, APIReset, ApiReturn, apiReducer } from "../../.."

export enum Constants {
  STORE_BOOK = "@BOOKS/ADMIN/STORE_BOOK",
  GET_BOOKS = "@BOOKS/ADMIN/GET_BOOKS",
}

export type Book = {
  id?: number
  title: string
  description?: string
  author?: string
  publisher?: string
  published_at?: string
  isbn?: string
  genre?: string
  language?: string
  format?: string
  pages?: number
  price: number
  stock?: number
}

export function storeBook(data: Book | APIReset) {
  return api(Constants.STORE_BOOK, {
    url: 'admin/books',
    method: 'POST',
    data,
    enableToast: true
  })
}

export function getBooks() {
  return api(Constants.GET_BOOKS, {
    url: 'admin/books',
    method: 'GET',
  })
}

export type BookState = {
  storeBook: ApiReturn<any>
  getBooks: ApiReturn<any>
}

export const reducers = {
  storeBook: apiReducer(Constants.STORE_BOOK),
  getBooks: apiReducer(Constants.GET_BOOKS),
}