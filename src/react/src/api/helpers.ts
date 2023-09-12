import { AxiosError } from "axios";
import { APIErrors, ApiReturn } from ".";

export function handleError(error: Error) {
  if (error instanceof AxiosError) {
    const { response } = error
    if (response) {
      if (response.status === 422 && response.data?.type === APIErrors.VALIDATION) {
        return {
          type: APIErrors.VALIDATION,
          data: response.data.errors
        }
      }
    }
  }
  return error
}

export function hasError(reduxState: ApiReturn<any>, field: string) {
  return reduxState.failed 
  && reduxState.error
  && "data" in reduxState.error
  && "type" in reduxState.error
  && reduxState.error.data
  && reduxState.error.type === APIErrors.VALIDATION
  && field in reduxState.error.data
}

export function isNull(value: any) {
  return !value || value == null || value == undefined || value == "" || Number.isNaN(value) || value == 0
}