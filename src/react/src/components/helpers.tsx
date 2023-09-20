import React from 'react'
import {ApiReturn} from '../api'
import {hasError} from '../api/helpers'

export function renderValidationFeedback<T>(reduxState: ApiReturn<T>, field: string) {
  if (hasError(reduxState, field)) {
    // @ts-ignore
    return reduxState.error.data[field].map((error: string, index: number) => (
      <div key={index} className="invalid-feedback">
        {error}
      </div>
    ))
  }
  return null
}

export function InputValidation<T>({reduxState, field, isTextarea = false, ...props}: {
  reduxState: ApiReturn<T>;
  field: string;
  isTextarea?: boolean;
  [key: string]: string | boolean | ApiReturn<T> | undefined | any;
}) {
  const hasErr = hasError(reduxState, field)
  const isValid = !hasErr
    && reduxState.failed
    && reduxState.error?.data
    && !(reduxState.error && field in reduxState.error.data)
  let className = 'form-control'

  if (hasErr) {
    className += ' is-invalid'
  } else if (isValid) {
    className += ' is-valid'
  }

  return (
    <React.Fragment>
      {isTextarea
        ? <textarea {...props} className={className} />
        : <input {...props} className={className} />
      }
      {renderValidationFeedback(reduxState, field)}
    </React.Fragment>
  )
}