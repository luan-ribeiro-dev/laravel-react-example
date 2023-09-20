import {AxiosRequestConfig} from 'axios'
import {Action, ActionCreator, Dispatch} from 'redux'
import {handleError} from './helpers'
import axios from '../axios'
import {toast} from 'react-toastify'

enum APIConstants {
  UNSTARTED = 'UNSTARTED',
  STARTED = 'STARTED',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  CONSTANT = 'CONSTANT',
}

export enum APIErrors {
  VALIDATION = 'VALIDATION',
  UNKNOWN = 'UNKNOWN',
}

type ApiOptions<T> = {
  url?: string,
  method?: string,
  enableToast?: boolean,
  data?: T | ApiReset,
}

export type ApiReset = {reset?: boolean}

export type ApiReturn<T> = {
  status: APIConstants
  unstarted: boolean
  started: boolean
  succeeded: boolean
  failed: boolean
  constant: boolean
  data?: T,
  error?: {
    type: APIErrors,
    data?: {
      [key: string]: string[]
    } | Error
  },
}

type ApiAction<T> = Action & {
  status: APIConstants
  data?: T
  error?: Error
}

export type ApiPagination<T> = {
  list: T[]
  meta: {
    current_page: number
    last_page: number
    from: number
    to: number
    total: number
  }
}

export function apiReducer<T>(type?: string): ActionCreator<ApiReturn<T>> {
  return (state = {status: APIConstants.UNSTARTED, unstarted: true}, action: ApiAction<T>) => {
    if (action.type === type) {
      const apiStatus = {
        status: action.status,
        unstarted: action.status === APIConstants.UNSTARTED,
        started: action.status === APIConstants.STARTED,
        succeeded: action.status === APIConstants.SUCCEEDED,
        failed: action.status === APIConstants.FAILED,
        constant: action.status === APIConstants.CONSTANT,
      }
      switch (action.status) {
      case APIConstants.UNSTARTED:
      case APIConstants.STARTED:
        return apiStatus
      case APIConstants.CONSTANT:
      case APIConstants.SUCCEEDED:
        return {
          ...apiStatus,
          data: action.data,
        }
      case APIConstants.FAILED:
        return {
          ...apiStatus,
          error: action.error ? handleError(action.error) : new Error('Unknown error'),
        }
      default:
        return state
      }
    }
    return state
  }
}

export default function api<T>(type:string, {url = '', method = '', enableToast = false, ...options}: ApiOptions<T>) {
  return async (dispatch: Dispatch) => {
    if (
      options.data
      && typeof options.data == 'object'
      && 'reset' in options.data
      && options.data.reset
    ) {
      dispatch({
        type,
        status: APIConstants.UNSTARTED,
      })
      return Promise.resolve()
    }

    const toastId = enableToast ? toast('Please wait...', {isLoading: true}) : null

    dispatch({
      type,
      status: APIConstants.STARTED,
    })

    if (!url && !method) {
      dispatch({
        type,
        status: APIConstants.CONSTANT,
        data: options.data,
      })
      return Promise.resolve()
    }

    const AxiosOptions: AxiosRequestConfig = {url, method}

    if (options.data) {
      AxiosOptions.data = options.data
    }

    await axios.get('sanctum/csrf-cookie')

    axios(AxiosOptions).then((res) => {
      console.log('api response: ', res)

      if (toastId) {
        toast.update(toastId, {render: 'Success!', type: 'success', isLoading: false, autoClose: 5000})
      }

      dispatch({
        type,
        status: APIConstants.SUCCEEDED,
        data: res.data,
      })
    }).catch(error => {
      if (toastId) {
        const err = handleError(error)
        const isValidationError = 'type' in err && err.type === APIErrors.VALIDATION
        const message = isValidationError ? 'Validation Error!' : 'Error!'

        toast.update(toastId, {render: message, type: 'error', isLoading: false, autoClose: 5000})
      }
      dispatch({
        type,
        status: APIConstants.FAILED,
        error,
      })
    })
  }
}