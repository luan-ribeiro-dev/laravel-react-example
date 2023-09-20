import api, { ApiReturn, apiReducer } from "../.."

export enum Constants {
  GET_USER = "@USERS/GET_USER",
  STORE_USER = "@USERS/STORE_USER",
  LOGOUT_USER = "@USERS/LOGOUT_USER",
  LOGIN_USER = "@USERS/LOGIN_USER",
  QUICK_REGISTER_CUSTOMER = "@USERS/QUICK_REGISTER_CUSTOMER",
  QUICK_REGISTER_ADMIN = "@USERS/QUICK_REGISTER_ADMIN",

  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

export type User = {
  name: string
  email: string
  role: Constants.ADMIN | Constants.CUSTOMER
}

export function getUser() {
  return api(Constants.GET_USER, {
    url: 'users',
    method: 'GET'
  })
}

export function storeUser(name: string, email: string, password: string) {
  return api(Constants.STORE_USER, {
    url: 'users/register',
    method: 'POST',
    data: {name, email, password},
    enableToast: true
  })
}

export function loginUser(email: string, password: string) {
  return api(Constants.LOGIN_USER, {
    url: 'users/login',
    method: 'POST',
    data: {email, password},
  })
}


export function logoutUser() {
  return api(Constants.LOGOUT_USER, {
    url: 'users/logout',
    method: 'POST',
  })
}

export function quickRegisterCustomer() {
  return api(Constants.QUICK_REGISTER_CUSTOMER, {
    url: 'users/quick_register_customer',
    method: 'POST',
  })
}

export function quickRegisterAdmin() {
  return api(Constants.QUICK_REGISTER_ADMIN, {
    url: 'users/quick_register_admin',
    method: 'POST',
  })
}

export type UsersState = {
  getUser: ApiReturn<User>
  storeUser: ApiReturn<any>
  logoutUser: ApiReturn<any>
  loginUser: ApiReturn<any>
  quickRegisterCustomer: ApiReturn<any>
  quickRegisterAdmin: ApiReturn<any>
}

export const reducers = {
  getUser: apiReducer(Constants.GET_USER),
  storeUser: apiReducer(Constants.STORE_USER),
  logoutUser: apiReducer(Constants.LOGOUT_USER),
  loginUser: apiReducer(Constants.LOGIN_USER),
  quickRegisterCustomer: apiReducer(Constants.QUICK_REGISTER_CUSTOMER),
  quickRegisterAdmin: apiReducer(Constants.QUICK_REGISTER_ADMIN),
}