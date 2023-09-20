import api, { ApiPagination, ApiReset, ApiReturn, apiReducer } from "../.."

export enum Constants {
  GET_BOOKS = "@CUSTOMER/BOOKS/GET_BOOKS",
  GET_BOOK = "@CUSTOMER/BOOKS/GET_BOOK",
  SET_CART = "@CUSTOMER/BOOKS/SET_CART",
  CHECKOUT = "@CUSTOMER/BOOKS/CHECKOUT",
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

export type CartItem = {
  book: Book
  quantity: number
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

export function setCart(data: CartItem[]) {
  return api(Constants.SET_CART, {
    data,
  })
}

export function checkout(data: CartItem[] | ApiReset) {
  return api(Constants.CHECKOUT, {
    url: 'customer/checkout',
    method: 'POST',
    data,
  })
}

export type BookState = {
  getBooks: ApiReturn<ApiPagination<Book>>
  getBook: ApiReturn<Book>
  setCart: ApiReturn<CartItem[]>
  checkout: ApiReturn<CartItem[]>
}

export const reducers = {
  getBooks: apiReducer(Constants.GET_BOOKS),
  getBook: apiReducer(Constants.GET_BOOK),
  setCart: apiReducer(Constants.SET_CART),
  checkout: apiReducer(Constants.CHECKOUT),
}