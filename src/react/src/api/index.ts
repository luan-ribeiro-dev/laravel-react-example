import { AxiosRequestConfig } from "axios"
import { Action, ActionCreator, Dispatch } from "redux"
import { handleError } from "./helpers"
import axios from "../axios"
import { toast } from "react-toastify"

export enum APIConstants {
  UNSTARTED = "UNSTARTED",
  STARTED = "STARTED",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
}

export enum APIErrors {
  VALIDATION = "VALIDATION",
  UNKNOWN = "UNKNOWN",
}

type ApiOptions = {
  url: string,
  method: string,
  enableToast?: boolean,
  data?: Object
}

export type ApiReturn<T> = {
  status: APIConstants
  data?: T,
  error?: {
    type: APIErrors,
    data?: {
      [key: string]: string[]
    } | Error
  },
}

export type ApiAction = Action & {
  status: APIConstants
  data?: any
  error?: Error
}

export function apiReducer<T>(type?: string): ActionCreator<ApiReturn<T>> {
  return (state = {status: APIConstants.UNSTARTED}, action: ApiAction) => {
    if (action.type === type) {
      switch (action.status) {
        case APIConstants.UNSTARTED:
          return {status: APIConstants.UNSTARTED}
        case APIConstants.STARTED:
          return {status: APIConstants.STARTED}
        case APIConstants.SUCCEEDED:
          return {
            status: APIConstants.SUCCEEDED,
            data: action.data
          }
        case APIConstants.FAILED:
          return {
            status: APIConstants.FAILED,
            error: action.error ? handleError(action.error) : new Error("Unknown error")
          }
        default:
          return state
      }
    } 
    return state
  }
}

export default function api(type:string, {url, method, enableToast = false, ...options}: ApiOptions) {
  return async (dispatch: Dispatch) => {
    const toastId = enableToast ? toast("Please wait...", {isLoading: true}) : null

    dispatch({
      type,
      status: APIConstants.STARTED
    })
    
    const AxiosOptions: AxiosRequestConfig = {url,method}

    if (options.data) {
      AxiosOptions.data = options.data
    }

    await axios.get("sanctum/csrf-cookie")

    axios(AxiosOptions).then((res) => {
      console.log("api response: ", res)

      if (toastId) {
        toast.update(toastId, {render: "Success!", type: "success", isLoading: false, autoClose: 5000})
      }

      dispatch({
        type,
        status: APIConstants.SUCCEEDED,
        data: res.data
      })
    }).catch(error => {
      if (toastId) {
        const err = handleError(error)
        const isValidationError = "type" in err && err.type === APIErrors.VALIDATION
        const message = isValidationError ? "Validation Error!" : "Error!"
        
        toast.update(toastId, {render: message, type: "error", isLoading: false, autoClose: 5000})
      }
      dispatch({
        type,
        status: APIConstants.FAILED,
        error
      })
    })
  }
}